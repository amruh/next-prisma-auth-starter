"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { LoginSchema, SignUpSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signUp = async (values: unknown) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  const checkExistingUser = await getUserByEmail(email);

  if (checkExistingUser) {
    return { error: "Email already exist" };
  }

  try {
    const hashedPassword = await hash(password, 12);
    await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }

  revalidatePath("/");
  redirect("/login");
};

export async function logIn(_: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid form data.",
    };
  }

  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = LoginSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            error: "Invalid credentials.",
          };
        }
        default: {
          return {
            error: "Could not login.",
          };
        }
      }
    }
    throw error;
  } finally {
    redirect("/app/dashboard");
  }
}
