"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MoveUpRight } from 'lucide-react'
import Icon from '@/app/_components/Icon'
import type { Product } from '@prisma/client'
import FetchByCategory from '../_api/FetchByCategory'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import kid_skateboard from "../_images/kid_skateboard.jpg"
import kid_skateboard_2 from "../_images/kid_skateboard_2.jpg"
type Props = {}

export default function Kids({}: Props) {
  const [product, setProduct] = useState<Array<Product>>([])
  const router = useRouter()
  async function handleGetProduct() {
   const {data, status} =  await FetchByCategory("Kids' Clothing")
  //  console.log(data, status)
   if(status === 200)
   return setProduct([...data])
  }
useEffect(()=>{
  handleGetProduct()
}, [])
  useEffect(()=>{
    console.log(product)
  }, [product])

  function navigate(productId:string){
    return router.push(`/product/${productId}`)
  }
if(!product)
return <div className='absolute -translate-1/2 top-1/2 left-1/2'><Loader /></div>

  
  return  <>
  
  <div className="capitalize font-[ApfelFett]">
    <h1 className="p-2 my-10 text-xl font-bold text-gray-200">
    Kid's Clothing Collection
    </h1>
    <div className='grid w-full grid-cols-2'>
        <Image src = {kid_skateboard_2} alt ="" width={500} height={500} className='object-cover w-full h-full dark:grayscale'/>
        <Image src = {kid_skateboard_2} alt ="" width={500} height={500} className='object-cover w-full h-full dark:grayscale'/>

    </div>
  

    {/* <ShopCategory  heading={"men's T-Shirts: Your Style, Your Way"} imgUrl={"/Mens/t-shirt.jpg"}/> */}
  </div>

  <div className='p-4 my-10 text-xl font-semibold text-center '>
Explore Our Extensive Range of Kid's Clothing
<br/>


</div>
<div className='grid w-full h-full grid-cols-1 mb-2 gap-y-2'>
{
  product.map(pr=>{
    return <div className='grid grid-cols-2 h-52 ' onClick={()=>navigate(pr?.id as string)}>
      <div className='h-52'>
        <Image src = {pr?.images[0]?.slice(8)} width={500} height={500} alt="" className='object-cover w-full h-full overflow-hidden'/>
      </div>
   <div className='flex flex-col px-4'> 
    <h1 className='text-lg font-semibold font-[ApfelFett] tracking-wide'>{pr?.name}</h1>
    <p className='mt-4 line-clamp-3'>{pr?.description}</p>
    </div>
    
  </div>
  })

}

</div>
  </>
}




function ShopCategory({heading, imgUrl}: {heading: string, imgUrl:string}){
    return <div className='grid grid-cols-2 my-6 text-gray-300 bg-gray-800 bg-opacity-25'>
   
    <div className='flex flex-col justify-between p-2 py-4 text-2xl'>
   {heading}
    <Button className={cn('w-fit h-fit px-6 py-2 rounded-full flex items-center')}>See all 
    {/* <Icon size={16} Icon={MoveUpRight} /> */}
    </Button>
    </div>
    <Image src  = {imgUrl} className = "object-cover w-full h-full " width={500} height={500} alt=''/>
   

   <div className='grid w-full grid-cols-1'>
    
    
   </div>
</div>
}




function ItemCardContainer({children}: {
    children :string
}){
    return <div className='grid w-full h-32 grid-cols-1 overflow-y-auto dark:bg-gray-800 dark:bg-opacity-25'>
        {children}
    </div>
}


