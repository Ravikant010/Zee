"use server"
import { db } from "@/lib/db";

export default async function GetUser(email: string) {
  if (!email) return;
  const existing_user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
if(existing_user)
  return existing_user
return null;
}
