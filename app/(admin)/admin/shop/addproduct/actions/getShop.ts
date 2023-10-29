"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs"
export default async function getUserShop(){
const user = await currentUser()
if(user)
{
    const email = user?.emailAddresses[0]?.emailAddress
    if(email)
    {
        const shop = await db.user.findUnique({
            where :{
                email: email
            },
            include: {
                shop: true
            }
        })
        if(shop?.shop?.length)
        return {data: shop.shop, status: 200}
    }
}
return {data: null, status: 400}
}