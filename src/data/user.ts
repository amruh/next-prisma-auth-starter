import "server-only";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function getUserByEmail(email: User["email"]) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export const getUserData = async () => {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch 'users data'.");
  }
};
