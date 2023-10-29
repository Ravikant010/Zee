"use server"
import { db } from '@/lib/db';
import React from 'react'
import { writeFile } from "fs";

import { mkdirSync } from "fs";
import { currentUser } from '@clerk/nextjs';
interface Product {
  product_name: string;
  product_description: string;
  product_category: string;
  product_price: number;
  product_inventory: number;
  product_sizes: string[]
  shop_id: string
}


export default async  function DBProduct({product_name, product_description, product_category, product_price, product_inventory, product_sizes, shop_id}:Product) {
console.log(product_name, product_description, product_category, product_price, product_inventory, product_sizes, shop_id)
  if (
    product_name &&
    product_description &&
    product_category &&
    product_price &&
    product_inventory &&
    shop_id &&
    product_sizes
  )
  {
    try{
    const product = await db.product.create({
      data:{
        name: product_name,
        description: product_description,
        category: product_category,
        price: Number(product_price),
        inventory: Number(product_inventory),
        sizes: [...product_sizes],
        shopId: shop_id
      }
    })

    return {data: product, status: 200}
  }
  catch(error){
    console.log(error)
    return {data: null, status: 500}
  }
  }
  return  {data: null, status: 404}
}


export  async  function DBProductImages(Images: File[], product_id:string){
  console.log(Images)
//   const user = await currentUser()
//   const email = user?.emailAddresses[0]?.emailAddress
//   console.log(email)
//   if(email){
//     const user = await db.user.findUnique({
//       where: {
//         email: email,
//       },
//       select: {
//         id: true,
//         shop: {
//           select: {
//             id: true,
//             },
//           },
//         },
//       })
    
//     console.log(user?.id, "--", user?.shop[0]?.id,"---", "--",product_id)

 
  
// console.log("iamge",Images)
// const uploadDir = `./public/${user?.id}/${user?.shop[0]?.id}/${product_id}`;

// try {
//   for (let i = 0; i < Images.length; i++) {
//     const image: File = Images[i] as File;
//     if (!image) continue;
//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     mkdirSync(uploadDir, { recursive: true });
//   await  db.product.update({
//       where:{
//           id : product_id as string
//       },
//       data:{
//           images:{
//               push: `${uploadDir}/${image?.name}`
//           }
//       }
//    })
//    writeFile(`${uploadDir}/${image?.name}`, buffer, () => {});
//   }
//   return {data: "image uploaded",  status: 200 };
// } 
// catch (err) {
//   console.log(err);
//   return {data: null , status: 500} 
// }
  // }
}


