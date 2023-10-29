"use server"
import { db } from "@/lib/db";

export default async function GetUserRole(email: string) {
  if (!email) return;
  const role = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      role: true,
    },
  });
  console.log(role)
  return role
}
