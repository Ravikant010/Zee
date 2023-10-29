"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export default async function total_sales() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const products = await db.user.findUnique({
    where: {
      email: email,
    },
    include: {
      shop: {
        include: {
          products: true,
        },
      },
    },
  });
  //@ts-ignore
  const { order_price, product_price } =
    await calculateSalesPercentageForProducts(
      [...products?.shop[0]?.products!]
    );
  const category = products?.shop[0]?.products.map(
    (product) => product?.category
  );
  const uniqueCategories = new Set(category);

// Convert the Set back to an array (if needed)
const uniqueCategoriesArray = Array.from(uniqueCategories);


  const total_products = products?.shop[0]?.products?.length;
  const percentage = (order_price / product_price) * 100;
  const orders_ = await   getAllOrdes()
  if (order_price && product_price)
    return { order_price, product_price, percentage, total_products, category:uniqueCategoriesArray, orders_ };
}

async function calculateSalesPercentageForProducts(
  productIds: Array<{ id: string }>
) {
  let order_price = 0;
  let product_price = 0;

  for (const productId of productIds) {
    const order = await db.order.findFirst({
      where: { productId: productId?.id },
      include: {
        product: {
          select: {
            price: true,
          },
        },
      },
    });

    const product = await db.product.findFirst({
      where: { id: productId?.id },
      select: {
        price: true,
      },
    });

    if (order) order_price += order?.product.price;
    if (product) product_price += product?.price;
  }

  return { order_price, product_price };
}


async function getAllOrdes(){
    const orders = await db.order.findMany({
        include:{
            product: {
                select:{
                    price:true
                }
            }
        }
    })

  return orders;
}