"use server";
import { db } from "@/lib/db";
import React from "react";

export default async function GetShopUser(
  email: string,
) {
  "use server";
  const isUser = await db.user.findUnique({
    where: {
      email: email,
    },
  })
  if(isUser)
   return { data: isUser, status: 200 };
return   { data: null, status: 404 };
}