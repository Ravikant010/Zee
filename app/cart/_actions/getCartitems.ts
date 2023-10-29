"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs"

export  default async function getCartItem(){
const user = await currentUser()
const email = user?.emailAddresses[0]?.emailAddress
const cart = await db.user?.findUnique({
    where:{
        email: email
    },

    include:{
        wishlists: {

            include:{
                product: true
            }
        }
    }
})

const products = cart?.wishlists
console.log(products)
if(products)
return {data: products , status: 200}
return {data: null , status: 404}
} 