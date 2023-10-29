"use server";
import { db } from "@/lib/db";
import React from "react";

export default async function CreateShop({email,
    shop_name,
    shop_address,
    shop_description,
    shop_city}:{
  email: string,
  shop_name: string,
  shop_address: string,
  shop_description: string,
  shop_city: string
}) {
  "use server";
  console.log(shop_name,
    email,
    shop_address,
    shop_description,
    shop_city)
  const existing_user = await db.user.findUnique({
    where: {
      email: email,
    },
    include: {
      shop: true,
    },
  });
  const user_id = existing_user?.id;
  const existing_user_shop = existing_user?.shop;
  console.log(user_id, existing_user)
  
  if (existing_user_shop?.length) {
    console.log(existing_user_shop);
    return 0;
  }

  
  if (user_id){
    try{
       const created_shop =  await db.shop.create({
            data: {
              shop_name: shop_name,
              shop_description: shop_description,
              shop_address: shop_address,
              shop_city: shop_city,
              ownerId: user_id,
            },
            select:{
                shop_name: true,
                id:true
            }
          });
          if(created_shop)
          await db.user.update({
        where:{
          email: email
        },
      data:{
        role: "BUYER"
      }})
          return {data  : created_shop, status: 200}

    }
    catch(err){
        console.log(err)
        return  {data  : null, status: 500}
    }
    
}
return  {data  : "user not found", status: 404}
}
