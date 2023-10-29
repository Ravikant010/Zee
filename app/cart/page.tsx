"use client"
import React, { useEffect, useState } from 'react'
import getCartItem from './_actions/getCartitems'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Loader from '@/components/loader'



export default function page() {
    const [product, setProduct] = useState()
   async  function handleSetFunction(){
        const {data, status} = await getCartItem()
        console.log(data)
        if(status === 200){
          //@ts-ignore
            setProduct([...data])
        }
    }
    useEffect(()=>{
        handleSetFunction()
    }, [])

useEffect(()=>{
console.log(product)
}, [product])   
if(!product?.length) 
return <div className='absolute -translate-x-1/2 top-1/2 left-1/2'>
    <Loader/>
    </div>
  return (
    <div>
        <h1 className='p-4 text-2xl font-bold dark:text-purple-500'>Your Cart Item </h1>
        <div className='grid w-full lg:grid-cols-2 lg:max-w-7xl place-items-center'>
        {
            product && product?.map(pr=>{
                return <ProductCard image_url = {pr?.product?.images[0]} name = {pr?.product?.name}/>
            })
        }
        </div>
    </div>
  )
}


type Props = {
    image_url :string
    name: string
}

export  function ProductCard({image_url, name}: Props) {
  return  <div className={cn("flex flex-col w-full max-w-xs my-10 overflow-hidden bg-white border border-gray-100 shadow-md group", "dark:bg-gray-800 dark:bg-opacity-20 rounded-md dark:text-zinc-200 ")}>
  <a className="relative flex overflow-hidden h-60">
    <Image className="absolute top-0 right-0 object-cover w-full h-full" src={image_url?.slice(8)} alt="product image"  width={500} height={500 }/>
  </a>
  <div className="px-5 pb-5 mt-4">
    <a href="#">
      <h5 className="text-xl tracking-tight "> {name}</h5>
    </a>
  </div>
</div>
}
