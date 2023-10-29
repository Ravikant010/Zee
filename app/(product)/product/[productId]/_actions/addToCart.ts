"use server"
import { db } from "@/lib/db";

export default async function AddToCart({
  email,
  productId,
}: {
  email: string;
  productId: string;
}) {
  if (email && productId) {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (user && product) {
      try {
        await db.wishlist.create({
          data: {
            userId: user?.id,
            productId: product?.id,
          },
        });
        return { status: 200 };
      } catch (err) {
        console.log(err);
        return { data: null, status: 500 };
      }
    }
  }
  return { status: 400 };
}
