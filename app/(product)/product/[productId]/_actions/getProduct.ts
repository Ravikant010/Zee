"use server"
import { db } from '@/lib/db';


type Props = {}

export default async function GetProduct(productId: string) {
  if(productId){
    const product = await db.product.findUnique({
      where: {
          id: productId
          }
      })
return {data: product, status: 200}
  }
  return {data: null, status: 400}
}