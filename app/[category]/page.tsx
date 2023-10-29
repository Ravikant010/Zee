"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Mens from "./_components/Mens";
import Womens from "./_components/Women";
import Kids from "./_components/kids";
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
  return <Mens />
}
if(url === "women's collection")
return <Womens />

if(url === "kids' collection")
return <Kids />
  return <main className="w-full h-fit">

{url}

  </main>
    
}
