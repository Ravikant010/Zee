"use server";
import { db } from "@/lib/db";
import React from "react";

export default async function CreateShopUser(
  email: string,
  user_name: string,
  full_name: string
) {
  "use server";
  const isUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isUser && user_name) {
    try {
      const new_user = await db.user.create({
        data: {
          email: email,
          username: user_name,
          fullname: full_name,
        },
      });
     
      return { data: new_user, status: 200 };
    } catch (err) {
      console.log(err);
      return  { data: null, status: 404 };;
    }
  }

  return isUser;
}
