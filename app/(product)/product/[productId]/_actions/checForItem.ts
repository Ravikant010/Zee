"use server"
import { db } from "@/lib/db";

export async function ChckForItem({
  email,
  productId,
}: {
  email: string;
  productId: string;
}) {
  const user = await db.user.findUnique({
    where: {
      email: email
    },
  });
  if (user) {
    const cartItem = await db.wishlist.findFirst({
      where: {
        productId: productId,
        userId: user?.id,
      },
    });
console.log(cartItem)
    if (cartItem) {
      return { data: "already in bag", status: 409 };
    }
    return { data: "does not exist in bag", status: 200 };
  }
  return { data: null, status: 404 };
}
