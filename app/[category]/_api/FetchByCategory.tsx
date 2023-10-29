"use server";
import { db } from "@/lib/db";
import React from "react";

type Props = {
  category: string;
};

export default async function FetchByCategory( category :string) {
  if (category) {
    const products = await db.product.findMany({
      where: {
        category: category,
      },
    });
    return { data: products, status: 200 };
  }
  if (!category) return { data: null, status: 500 };
}
