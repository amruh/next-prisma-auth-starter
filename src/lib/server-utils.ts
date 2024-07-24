import "server-only";

import { Session } from "next-auth";
import { UserRole } from "@prisma/client";

export function checkRole(session: Session | null, role: UserRole) {
  if (session) {
    if (session.user.role !== role) {
      return false;
    }
    return true;
  }
  return false;
}
