import { db } from "@/lib/db";
import { User } from "@prisma/client";
import "server-only";

export async function getUserByEmail(email: User["email"]) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
