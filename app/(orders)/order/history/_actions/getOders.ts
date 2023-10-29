"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export default async function getOrders() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (email) {
    const orders = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            product: true,
          },
        },
      },
    });
    if (orders) {
      return { data: orders, status: 200 };
    }
    return { data: null, status: 500 };
  }
  return { data: null, status: 400 };
}
