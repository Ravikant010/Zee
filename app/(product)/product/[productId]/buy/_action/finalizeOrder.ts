"use server";
import { db } from "@/lib/db";
type Props = {
  Address: string;
  city: string;
  zip: number;
  productId: string
  email: string;
  // navigate: (path:string)=>void
};

export async function finalizeOrder({
  Address,
  city,
  zip,
  email,
  productId,
}: Props) {
  try {
    const userId = await db.user.findUnique({
        where:{
            email: email
        }
    })
    if (Address && city && zip && productId && userId) {
      const order = await db.order.create({
        data: {
          Address: Address,
          city: city,
          zip: zip,
          productId: productId,
          buyerId: userId?.id,
          status: "Ordered",
        },
      });
      return { data: order, status: 200 };
    }
    return { data: null, status: 400 };
  } catch {
    return { data: null, status: 500 };
  }
}
