"use server"
import { db } from "@/lib/db";

export default async function GetProductByCategory(category: string) {
  return await db.product.findMany({
    where: {
      category: category,
    },
  });
}
