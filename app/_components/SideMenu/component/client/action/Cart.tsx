"use client"
import { ShoppingCart } from 'lucide-react'
import React from 'react'

type Props = {}

export default function Cart({}: Props) {
  return <>
    { window.innerWidth < 500 && <div className='flex items-center justify-start my-5 mr-10'><ShoppingCart
            size={32}
            className="text-gray-200 hover:text-gray-600"
            strokeWidth={1}
          /></div>
          }
  </>
}