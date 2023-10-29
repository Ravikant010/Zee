"use server";

import { db } from "@/lib/db";

export async function getOrder(productId: string) {
    console.log(productId)
  if (productId) {
    const order = await db.order.findMany({
      where: {
        productId: productId,
      },
      include:{
        product: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(order)
    return { data: order, status: 200 };
  }
  return { data: null, status: 400 };
}
