"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import {
  CreateUserSchema,
  LoginSchema,
  SignUpSchema,
  UpdateUserSchema,
} from "@/schemas";
import { Prisma, User } from "@prisma/client";
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

export const logIn = async (
  callbackUrl: string,
  _: unknown,
  formData: unknown,
) => {
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
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/app/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default: {
          return { error: "Could not login." };
        }
      }
    }
    throw error;
  }
};

export const createUser = async (values: unknown) => {
  const validatedFields = CreateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password, role } = validatedFields.data;

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
        role,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }

  revalidatePath("/app", "layout");
};

export const updateUser = async (values: unknown, userId: User["id"]) => {
  const validatedFields = UpdateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { name, email, password, role } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  let hashedPassword;

  if (password) {
    hashedPassword = await hash(password, 12);
  }

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        role,
        email,
        hashedPassword: hashedPassword ?? existingUser?.hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }

  revalidatePath("/app", "layout");
};

export const deleteUser = async (userId: User["id"]) => {
  try {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Fail to delete data",
    };
  }

  revalidatePath("/app", "layout");
};
