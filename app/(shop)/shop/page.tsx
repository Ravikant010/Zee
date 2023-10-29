"use client";
import ProductCard from "./_components/products";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import GetProducts from "./action/getProducts";
import GetProductByCategory from "./action/getPrbyCat";
import Loader from "@/components/loader";

type Props = {};
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  shopId: string;
  category: string;
  sizes: string[];
  inventory: number;
  images: string[];
  soldCount: number;
  rating: number | null; // Assuming rating is a number or null
  createdAt: Date;
  active: boolean;
}

export default function page({}: Props) {
  const [products, setProducts] = useState<Array<Product> | null>([]);
  const [isLoading, setLoading] = useState(true);
  const [Mens_clothing, setMensClothing] = useState<Array<Product>>([])
  const [Womens_clothing, setWoMensClothing] = useState<Array<Product>>([])
  const [Kids, setKidsClothing] = useState<Array<Product>>([])
  const [Footwear, setFootwear] = useState<Array<Product>>([])
  const { user } = useUser();

  // State to track whether the full description is visible
  // const [showFullDescription, setShowFullDescription] = useState(false);



  async function Products() {
    const email = user?.emailAddresses[0]?.emailAddress;
    if (email) {
      //@ts-ignore
      const { data, status } = (await GetProducts(email)) as {
        data: Array<Product>;
        status: number;
      };
      if (status === 200) {
        setLoading(false);
        return setProducts([...data]);
      }
      setLoading(false);
      return setProducts(null);
    }
    setLoading(false);
  }

  async function GetProductsBYCategory() {
    const kids = await GetProductByCategory("Kids' Clothing");
    const mens= await GetProductByCategory("Men's Clothing");
    const womens = await GetProductByCategory("Women's Clothing");
    const Footwear = await GetProductByCategory("Footwear");
    //@ts-ignore
    setMensClothing([...mens])
     //@ts-ignore
    setWoMensClothing([...womens])
     //@ts-ignore
    setKidsClothing([...kids])
      //@ts-ignore
    setFootwear([...Footwear])
    console.log(womens)
   
  }

  useEffect(() => {
    GetProductsBYCategory();
  }, []); 
  
  useEffect(() => {
    Products();
  }, [user]);
  if(!isLoading && !products?.length)
  return <div className="flex items-center justify-center w-full h-screen overflow-hidden">No Products Yet</div>;
  if (products?.length && !isLoading) {
    return (
      <div className="grid grid-cols-1 py-6 space-y-4">
        <div>
         <h1 className="text-lg font-semibold font-[PoppinsBold] capitalize">Mens Clothing</h1>
         <section className="flex overflow-x-scroll text-xl bg-white dark:bg-slate-800 dark:bg-opacity-25 dark:text-white sm:py-16 lg:py-20 shrink-0">
           
        {Mens_clothing && Mens_clothing.map((pr, index) => {
          return (
           
              <ProductCard
                key={index}
                id = {pr?.id}
                name={pr.name}
                image={pr.images[0]?.slice(8)}
                price={pr.price.toString()}
                description={pr.description}
              />
           
          );
        })}
         </section>
         </div>
         <div>
         <h1 className="text-lg font-semibold font-[PoppinsBold] capitalize">women's Clothing</h1>
         <section className="flex overflow-x-scroll text-xl bg-white dark:bg-slate-800 dark:bg-opacity-25 dark:text-white sm:py-16 lg:py-20 shrink-0">
         
        {Womens_clothing && Womens_clothing.map((pr, index) => {
          return (
           
              <ProductCard
              id = {pr?.id}
                key={index}
                name={pr.name}
                image={pr.images[0]?.slice(8)}
                price={pr.price.toString()}
                description={pr.description}
              />
           
          );
        })}
         </section>

         </div>
         <div>
         <h1 className="text-lg font-semibold font-[PoppinsBold] capitalize">Kids Clothing</h1>
         <section className="flex space-x-2 overflow-x-scroll text-xl bg-white dark:bg-slate-800 dark:bg-opacity-25 dark:text-white shrink-0">
           
           
        {Kids && Kids.map((pr, index) => {
          return (
           
              <ProductCard
              id = {pr?.id}
                key={index}
                name={pr.name}
                image={pr.images[0]?.slice(8)}
                price={pr.price.toString()}
                description={pr.description}
              />
           
          );
        })}
         </section>
         </div>
         <div>
         <h1 className="text-lg font-semib`old font-[PoppinsBold] capitalize">Footwear</h1>
         <section className="flex space-x-2 overflow-x-scroll text-xl bg-white dark:bg-slate-800 dark:bg-opacity-25 dark:text-white shrink-0">
           
           
        {Footwear && Footwear.map((pr, index) => {
          return (
           
              <ProductCard
                id = {pr?.id}
                key={index}
                name={pr.name}
                image={pr.images[0]?.slice(8)}
                price={pr.price.toString()}
                description={pr.description}
              />
           
          );
        })}
         </section>
         </div>


         <div>
         <h1 className="text-lg font-semibold font-[PoppinsBold] capitalize">Trending Fashion</h1>
         <section className="flex space-x-2 overflow-x-scroll text-xl bg-white dark:bg-slate-800 dark:bg-opacity-25 dark:text-white shrink-0">
           
           
        {Footwear && Footwear.map((pr, index) => {
          return (
           
              <ProductCard
                key={index}
                id = {pr?.id}
                name={pr.name}
                image={pr.images[0]?.slice(8)}
                price={pr.price.toString()}
                description={pr.description}
              />
           
          );
        })}
         </section>
         </div>

         <div>
         <h1 className="text-lg font-semibold font-[PoppinsBold] capitalize">
         New Arrivals</h1>
         <section className="flex space-x-2 overflow-x-scroll text-xl bg-white dark:bg-slate-800 dark:bg-opacity-25 dark:text-white shrink-0">
           
           
        {Footwear && Footwear.map((pr, index) => {
          return (
           
              <ProductCard
              id = {pr?.id}
                key={index}
                name={pr.name}
                image={pr.images[0]?.slice(8)}
                price={pr.price.toString()}
                description={pr.description}
              />
           
          );
        })}
         </section>
         </div>

      </div>
    );
  }
  return <div className="flex items-center justify-center w-full h-screen"><Loader/></div>;
}
