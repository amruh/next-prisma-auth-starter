import NextAuth, { type DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";
import { UserRole } from "@prisma/client";
import { getUserByEmail } from "./data/user";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }

  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      // runs on login
      async authorize(credentials) {
        // validate the object
        const validatedAuthData = LoginSchema.safeParse(credentials);
        if (!validatedAuthData.success) {
          return null;
        }
        const { email, password } = validatedAuthData.data;

        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password as string,
          user.hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // runs on every request with middleware
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (isTryingToAccessApp) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      return true;
    },

    // modify the token while login (server token)
    jwt: ({ token, user }) => {
      if (user) {
        // on login
        token.userId = user.id!;
        token.role = user.role;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
