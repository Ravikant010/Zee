"use client"
import { useParams } from 'next/navigation'
import React, { ReactNode } from 'react'
import { createContext, useContext } from 'react'
type Props = {
    children: ReactNode,
}
const Context = createContext<{productId:string} | null>(null)
export default function Layout({children}: Props) {
    const {productId} = useParams()

  return (
    <Context.Provider value={{productId: productId as string}}>
<div>{children}</div>
    </Context.Provider>
    
  )
}

export function useContextFunction():{productId:string} | null {
    const context = useContext(Context)
    if(context)
    return context
return null;
}