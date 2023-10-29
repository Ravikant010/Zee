"use client"
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function Cart({}: Props) {
  const router = useRouter()
  return <>
    { window.innerWidth < 500 && <div className='flex items-center justify-start my-5 mr-10'><ShoppingCart
            size={32}
            className="text-gray-200 hover:text-gray-600"
            strokeWidth={1}
            onClick={()=>{
              return  router.push("/cart")
            }}
            
          /></div>
          }
  </>
}