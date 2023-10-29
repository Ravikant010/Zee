import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    image_url :string
    name: string
}

export default function ProductCard({image_url, name}: Props) {
  return  <div className={cn("flex flex-col w-full max-w-xs my-10 overflow-hidden bg-white border border-gray-100 shadow-md group", "dark:bg-gray-800 dark:bg-opacity-20 rounded-md dark:text-zinc-200")}>
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
