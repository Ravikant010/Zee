"use client"
import { useParams } from 'next/navigation';
import React, { Component, ReactNode, useContext, useState } from 'react'
import { createContext } from 'react';

export type ShopIdContextType = {
  shopId: string;
  product_id: string;
  handleSetProductId: (id: string) => void;
  image_upload_status: number
  handleSetimageuplaodStatus: (status:number) => void
};

export const ShopIdContext = createContext<ShopIdContextType | null>(null);

type Props = {
    children: ReactNode
}

export default function Layout({children}: Props) {
  const [product_id, setProductId] = useState('')
  const [image_upload_status, set_image_upload_status] = useState(0)
  function handleSetProductId(id: string) {
    setProductId(id);
  }
  function handleSetimageuplaodStatus(status:number){
    set_image_upload_status(status)
  }

  const { shopId } = useParams<{ shopId: string }>();
  return <ShopIdContext.Provider value={{shopId, handleSetProductId, product_id , handleSetimageuplaodStatus, image_upload_status}}>
  {children}
  </ShopIdContext.Provider>
}


export function useContextFunction():ShopIdContextType | null{
  const context = useContext(ShopIdContext)
  if(context)
  return context
return null;
}