import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
type Props = {}

export default function Category({}: Props) {
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
         
  return  <Accordion type="single" collapsible className="w-full ">
  <AccordionItem value="item-1">
    <AccordionTrigger>Select Category</AccordionTrigger>
    <AccordionContent className='overflow-y-auto h-72 '>
     {
        fashionCategories.map(options=><ul>
            <li><Button variant={"link"}>{options}</Button></li>
            </ul>)
     }
    </AccordionContent>
  </AccordionItem>
</Accordion>
}