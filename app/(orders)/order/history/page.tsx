"use client";
import React, { useEffect, useState } from "react";
import getOrders from "./_actions/getOders";
import Loader from "@/components/loader";
import ProductCard from "./_components/productCard";

type Props = {};

export default function page({}: Props) {
  const [orderHistory, setOrderHistory] = useState([]);
  async function handleOrderhistory() {
    const { data, status } = await getOrders();
    console.log(data);
    if (status == 200 && data) {
      //@ts-ignore
      setOrderHistory([...data?.orders]);
    }
  }
  useEffect(() => {
    handleOrderhistory();
  }, []);
  useEffect(() => {
    console.log(orderHistory);
  }, [orderHistory]);
  if (!orderHistory.length)
    return (
      <div className="absolute -translate-1/2 top-1/2 left-1/2">
        <Loader />
      </div>
    );
  return (
    <div className="grid justify-center w-full grid-cols-1 place-items-center ">
        <div className="w-full text-3xl font-semibold capitalize text-start dark:text-purple-500 font-[ApfelFett] p-4 md:text-4xl md:border-b-2 border-purple-800">Your order history</div>

        <div className="grid justify-center w-full grid-cols-1 mx-auto md:grid-cols-2 place-items-center "> {orderHistory.map((orders) => {
        return (
            //@ts-ignore
          <ProductCard
            image_url={orders?.product?.images[0]}
            name={orders?.product?.name}
          />
        );
      })}
 </div>
     
    </div>
  );
}
