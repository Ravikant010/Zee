
import server from '@/lib/API'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
Address: string
city:string
zip: number
productId: string
amount:number,
id:string
navigate: (path:string)=>void
}

export  async function SubmitForm({Address, city, zip,id, productId,amount, navigate}: Props) {
    if(Address &&  city && zip && productId && amount && id)
    {    console.log(Address, city, zip, productId,amount)

        const api = await server.post("/home/shop/product/buy", {
            Address, city, zip, productId,amount,id
        })
        console.log(api.status)
        if(api.status==200){
            console.log("statue", api.status)
         return navigate(`/home/shop/payment/${api.data?.id}`)
        }
    }
  return 0;
}