"use server";
import { db } from "@/lib/db";



export async function ExistingShop(email:string){

if(email){
    const existing_user_shop = await db.user.findUnique({
        where: {
          email: email,
        },
        include: {
          shop: true,
        },
      });

      if (existing_user_shop?.shop?.length) {
        
        return {data: existing_user_shop?.shop[0]?.id, status: 409}
      }
      else{
        return {data: "NO Shop already exists", status: 200}
      }

      
}
return {data: "Email not received", status: 400}
}

