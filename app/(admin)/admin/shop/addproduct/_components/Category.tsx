import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectLabel,
    SelectValue,
  } from "@/components/ui/select"

type Props = {
    handleSetCategory: (category:string)=>void
}
const fashionCategories = [
    "Men's Clothing",
    "Women's Clothing",
    "Kids' Clothing",
    "Footwear",
    "Accessories",
    "Lingerie and Intimates",
    "Activewear",
    "Outerwear",
    "Maternity Clothing",
    "Plus Size Clothing",
    "Formal Wear",
    "Vintage and Retro",
    "Workwear",
    "Cultural and Ethnic Clothing",
    "Seasonal Collections",
    "Trending Fashion",
    "Sustainable and Eco-Friendly",
    "Custom and Personalized",
    "Sale and Clearance",
    "New Arrivals"
  ];

  
export default function Category({handleSetCategory}: Props) {
  return <main className='space-y-2'>
       <div>Category</div>
       <Select onValueChange={handleSetCategory}>
      <SelectTrigger className="min-w-[180px] max-w-auto focus-visible:ring-purple-400 mt-0">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
   
      <SelectContent className='focus-visible:ring-purple-400'>
 
        <SelectGroup className='h-52 overflow-y-auto focus-visible:ring-purple-400'>
          <SelectLabel>Select Category</SelectLabel>
        {
         fashionCategories.map(options=><SelectItem value={options} className='focus-visible:ring-purple-400 w-auto' key={options}>{options}</SelectItem>)   
        }
      
        </SelectGroup>
      </SelectContent>
    </Select>
  </main>
}