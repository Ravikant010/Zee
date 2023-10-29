"use server"
import { db } from "@/lib/db";

export default async function GetProducts(email: string) {
  if (!email) return { data: null, status: 400 };
  const { shop } = (await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      shop: {
        select: {
          products: true,
        },
      },
    },
  })) as {
    shop: Array<any>;
  };
  if (shop[0]?.products?.length) {
    const products = shop[0]?.products;
    return { data: [...products], status: 200 };
  }
  return { data: "No Products", status: 404 };
}
