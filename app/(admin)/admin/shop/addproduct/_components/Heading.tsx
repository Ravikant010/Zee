"use client"
import Icon from '@/app/_components/Icon'
import Loader from '@/components/loader'
import { ListTodo } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  shop_name:string
}

export default function Heading({shop_name}: Props) {
if(!shop_name)
return <Loader/>
  return <main>
   <section className='text-3xl break-words  p-4 font-semibold  font-[ApfelFett] tracking-wide dark:text-gray-200'>
   <h1>
    Your Shop <br/>
    <span className='font-semibold dark:text-purple-500'>{shop_name}</span> <br/>has created<br/>
   Create a New Product Listing     
   <Icon Icon={ListTodo} size={32} classname='dark:text-purple-400'/>
    </h1>

   </section>
  </main>
}