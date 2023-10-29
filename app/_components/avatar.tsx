import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    imageUrl: string,
    firstName:string
    fullName:string
}

export default function AvatarCP({imageUrl, firstName, fullName}: Props) {
 
  return (
    <Avatar>
    <AvatarImage src= {imageUrl}/>
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  )
}