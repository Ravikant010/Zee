"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export default async function getInventory() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const array_of_product_id_of_shop_products = await db.user.findUnique({
    where: {
      email: email,
    },
    include: {
      shop: {
        include: {
          products: {
            select: {
                id:true
            }
          }
          
        },

      },
    },
  });
//   const productIds = inventory?.shop[0]?.products.map(product => product.id);
if(array_of_product_id_of_shop_products){
  const result = await calculateRemainingInventoryPercentagesForProducts([...array_of_product_id_of_shop_products?.shop[0]?.products!])
}

//   console.log(array_of_product_id_of_shop_products?.shop[0]?.products);
  const res = await calculateRemainingInventoryPercentagesForProductsall([...array_of_product_id_of_shop_products?.shop[0]?.products!])


  return res;

}


async function calculateRemainingInventoryPercentagesForProducts(productIds:Array<{id:string}>) {
    const results = [];
  
    for (const productId of productIds) {
      const product = await db.product.findUnique({
        where: { id: productId?.id },
      });
  
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
  
      // Calculate the total quantity of orders for the product
      const totalOrderedCount = await db.order.count({
        where: {
          productId: productId?.id,
        },
      });
  
      const totalOrderedQuantity = totalOrderedCount 
  
      const remainingInventory = product.inventory -totalOrderedQuantity
      const remainingPercentage = (remainingInventory / product.inventory) * 100;
  
      results.push({
        productId: product.id,
        remainingPercentage: remainingPercentage,
      });
    }
  
    return results;
  }


  async function calculateRemainingInventoryPercentagesForProductsall(productIds:Array<{id:string}>) {
//     let totalInventory = 0;
//   let totalOrders = 0;

//   for (const productId of productIds) {
//     const product = await db.product.findUnique({
//       where: { id: productId?.id },
//     });

//     if (!product) {
//       throw new Error(`Product with ID ${productId} not found`);
//     }

//     totalInventory += product.inventory;

//     // Calculate the total count of orders for the product
//     const totalOrderedCount = await db.order.count({
//       where: {
//         productId: productId?.id,
//       },
//     });

//     totalOrders += totalOrderedCount;
//   }

//   // Calculate the percentage of total orders out of total inventory
//   const totalPercentage = (totalOrders / totalInventory) * 100;

//   return {
//     totalInventory: totalInventory,
//     totalOrders: totalOrders,
//     totalPercentage: totalPercentage,
//   };


let totalInventory = 0;
let totalOrders = 0;

for (const productId of productIds) {
  const product = await db.product.findUnique({
    where: { id: productId?.id },
  });

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  totalInventory += product.inventory;

  // Calculate the total count of orders for the product
  const totalOrderedCount = await db.order.count({
    where: {
      productId: productId?.id,
    },
  });

  totalOrders += totalOrderedCount;
}

// Calculate the percentage of total orders out of total inventory
const totalPercentage = (totalOrders / totalInventory) * 100;

return {
  totalInventory: totalInventory,
  totalOrders: totalOrders,
  totalPercentage: totalPercentage,
};

}

  

