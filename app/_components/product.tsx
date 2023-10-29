import React from 'react'
import women_jacket from "@/app/_components/image/women_jacket.jpg"
import hoodie from "@/app/_components/image/hoodie.jpg"
import slimpant from "@/app/_components/image/slim_pant_men.jpg"
import jacket_model from "@/app/_components/image/men_jacket.jpg"
import style_tshirt from "@/app/_components/image/style_tshirt.jpg"
import style_oversize from "@/app/_components/image/oversize_style.jpg"
import Image  from 'next/image'
type Props = {
    title: string
}

export default function Product({title}: Props) {
  
if(title === "BestSeller")
return <BestSeller /> 
if(title === "NewArrival")
return <NewArrival />
if(title === "Style")
return <Style />
return <>404</>
}

const BestSeller = ()=>{
      
    return (
    <main className='grid h-auto grid-cols-1 py-6 sm:grid-cols-2 sm:h-52 gap-y-4'>
       <div className='relative'>
       <h1 className='font-[ApfelFett] tracking-wide text-2xl absolute top-0 z-20 dark:text-zin-900 text-center w-full h-full flex justify-center items-center'>
       Women's Classic Leather Jacket
       </h1>
       <div className='absolute top-0 z-10 w-full h-full dark:bg-gray-800 dark:opacity-70'></div>
        <Image width={500} height={500} alt = "" src = {women_jacket} className='object-cover h-64 dark:grayscale -z-10'/>
       </div>

       <div className='relative'>
       <h1 className='font-[ApfelFett] tracking-wide text-2xl absolute top-0 z-20 dark:text-zin-900 text-center w-full h-full flex justify-center items-center'>
       Men's Hoodie
       </h1>
       <div className='absolute top-0 z-10 w-full h-full dark:bg-gray-800 dark:opacity-70'></div>
        <Image width={500} height={500} alt = "" src = {hoodie} className='object-cover h-64 dark:grayscale -z-10'/>
       </div>
    </main>
)
    }


    const NewArrival = ()=>{
      
        return (
        <main className='grid h-auto grid-cols-1 py-6 sm:grid-cols-2 sm:h-52 gap-y-4'>
           <div className='relative'>
           <h1 className='font-[ApfelFett] tracking-wide text-2xl absolute top-0 z-20 dark:text-zin-900 text-center w-full h-full flex justify-center items-center'>
           {/* Men's Classic Leather Jacket */}
           </h1>
           <div className='absolute top-0 z-10 w-full h-full dark:bg-gray-800 dark:opacity-70'></div>
            <Image width={500} height={500} alt = "" src = {style_tshirt} className='object-cover h-64 dark:grayscale -z-10 '/>
           </div>
    
           <div className='relative'>
           <h1 className='font-[ApfelFett] tracking-wide text-2xl absolute top-0 z-20 dark:text-zin-900 text-center w-full h-full flex justify-center items-center'>
           Men's Slim Pant
           </h1>
           <div className='absolute top-0 z-10 w-full h-full dark:bg-gray-800 dark:opacity-70'></div>
            <Image width={500} height={500} alt = "" src = {slimpant} className='object-cover h-64 dark:grayscale -z-10'/>
           </div>
        </main>
    )
        }

        

        const Style = ()=>{
      
            return (
            <main className='grid h-auto grid-cols-1 py-6 sm:grid-cols-2 sm:h-52 gap-y-4'>
               <div className='relative'>
               <h1 className='font-[ApfelFett] tracking-wide text-2xl absolute top-0 z-20 dark:text-zin-900 text-center w-full h-full flex justify-center items-center'>
               Men's Classic Leather Jacket
               </h1>
               <div className='absolute top-0 z-10 w-full h-full dark:bg-gray-800 dark:opacity-70'></div>
                <Image width={500} height={500} alt = "" src = {style_tshirt} className='object-cover h-64 dark:grayscale -z-10 '/>
               </div>
        
               <div className='relative'>
               <h1 className='font-[ApfelFett] tracking-wide text-2xl absolute top-0 z-20 dark:text-zin-900 text-center w-full h-full flex justify-center items-center'>
               Men's Slim Pant
               </h1>
               <div className='absolute top-0 z-10 w-full h-full dark:bg-gray-800 dark:opacity-70'></div>
                <Image width={500} height={500} alt = "" src = {style_oversize} className='object-cover h-64 dark:grayscale -z-10'/>
               </div>
            </main>
        )
            }
    