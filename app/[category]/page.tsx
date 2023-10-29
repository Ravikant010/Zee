"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Mens from "./_components/Mens";
import Womens from "./_components/Women";
import Kids from "./_components/kids";
import bigboard_image from "./_images/big_board_model.jpg"
type Props = {};

export default function Page({}: Props) {
  const [url, setUrl] = useState("");
  function handleSetUrl(path: string) {
    setUrl(path);
  }
  const { category } = useParams();

  useEffect(() => {
    handleSetUrl(decodeURIComponent(category as string));
    console.log(url)
  }, [url]);
if(url === "men's collection"){
  return <>
  <BigBoardImage />
  <Mens />
  </>
}
if(url === "women's collection")
return <Womens />

if(url === "kids' collection")
return <Kids />
  return <main className="w-full h-fit">

{url}

  </main>
    
}


function BigBoardImage(){
  return <div className="hidden w-full grid-cols-2 h-82 md:flex lg:grid ">
    <Image src = {bigboard_image} width={500} height={500} alt='' className="object-cover w-full h-full aspect-auto"/>
    <div className="text-4xl font-[ApfelFett] tracking-wide text-start w-full dark:bg-gray-800 dark:bg-opacity-20 p-2" >
     <h1 className="w-10/12">
      We Have Best For Your Fashion </h1>
    </div>
    </div>
}