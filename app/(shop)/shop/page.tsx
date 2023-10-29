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
  const [Mens_clothing, setMensClothing] = useState<Array<Product>>([]);
  const [Womens_clothing, setWoMensClothing] = useState<Array<Product>>([]);
  const [Kids, setKidsClothing] = useState<Array<Product>>([]);
  const [Footwear, setFootwear] = useState<Array<Product>>([]);
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
    const mens = await GetProductByCategory("Men's Clothing");
    const womens = await GetProductByCategory("Women's Clothing");
    const Footwear = await GetProductByCategory("Footwear");
    //@ts-ignore
    setMensClothing([...mens]);
    //@ts-ignore
    setWoMensClothing([...womens]);
    //@ts-ignore
    setKidsClothing([...kids]);
    //@ts-ignore
    setFootwear([...Footwear]);
    console.log(womens);
  }

  useEffect(() => {
    GetProductsBYCategory();
  }, []);

  useEffect(() => {
    Products();
  }, [user]);
  if (!isLoading && !products?.length)
    return (
     <div className="absolute -translate-x-1/2 top-1/2 left-1/2"><Loader /></div>
    );
  if (products?.length && !isLoading) {
    return <main className="w-full h-auto">
      <div>
      <h1 className="p-4 text-xl font-semibold md:text-2xl lg:text-3xl font-[ApfelFett] tracking-wide">Mens Collection</h1>
      <section className="flex justify-start w-full space-x-0 overflow-x-scroll gap-x-0 md:space-x-6">
      
     
      {Mens_clothing &&
  Mens_clothing.map((pr, index) => {
    return (
      <ProductCard
        key={index}
        id={pr?.id}
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
      <h1 className="p-4 text-xl font-semibold md:text-2xl lg:text-3xl font-[ApfelFett] tracking-wide">Women Collection</h1>
      <section className="flex justify-start w-full space-x-0 overflow-x-scroll gap-x-0 md:space-x-6">
      
     
      {Mens_clothing &&
  Womens_clothing.map((pr, index) => {
    return (
      <ProductCard
        key={index}
        id={pr?.id}
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
      <h1 className="p-4 text-xl font-semibold md:text-2xl lg:text-3xl font-[ApfelFett] tracking-wide">Kids Collection</h1>
      <section className="flex justify-start w-full space-x-0 overflow-x-scroll gap-x-0 md:space-x-6">
      
     
      {Womens_clothing &&
  Kids.map((pr, index) => {
    return (
      <ProductCard
        key={index}
        id={pr?.id}
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
      <h1 className="p-4 text-xl font-semibold md:text-2xl lg:text-3xl font-[ApfelFett] tracking-wide">Footwear Collection</h1>
      <section className="flex justify-start w-full space-x-0 overflow-x-scroll gap-x-0 md:space-x-6">
      
     
      {Footwear &&
  Footwear.map((pr, index) => {
    return (
      <ProductCard
        key={index}
        id={pr?.id}
        name={pr.name}
        image={pr.images[0]?.slice(8)}
        price={pr.price.toString()}
        description={pr.description}
      />
    );
  })}
      </section>
      </div>
      


      
    </main>
  }

}




// {Mens_clothing &&
//   Mens_clothing.map((pr, index) => {
//     return (
//       <ProductCard
//         key={index}
//         id={pr?.id}
//         name={pr.name}
//         image={pr.images[0]?.slice(8)}
//         price={pr.price.toString()}
//         description={pr.description}
//       />
//     );
//   })}