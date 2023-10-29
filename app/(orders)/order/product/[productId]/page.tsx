"use client";
import React, { useEffect, useState } from "react";
import { getOrder } from "./_action/getOrder";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/loader";

type Props = {};

export default function page({}: Props) {
  const { productId } = useParams();
  const router = useRouter()
  console.log(productId)
  const [order, setOrder] = useState<any>();
  async function handleOrder() {
    if (productId) {
      const { data, status } = await getOrder(productId as string);
      if (status == 200) {
        //@ts-ignore
        setOrder(data[0]);
      }
    }
  }
  useEffect(() => {
    handleOrder()
  }, []);

  useEffect(()=>{
    console.log(order)
  }, [order])

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  

if(!order)
return <div className="absolute top-1/2 left-1/2 -translate-1/2"><Loader /></div>
  return   <section className="h-screen py-12 bg-gray-100 sm:py-16 lg:py-20 dark:bg-gray-800 dark:bg-opacity-20 dark:text-white">
  <div className="px-4 mx-auto sm:px-6 lg:px-8">
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-green-500">Your Order is Placed</h1>
    </div>
    <div className="max-w-md mx-auto mt-8 md:mt-12">
      <div className="bg-white shadow-lg dark:bg-gray-800 rounded-xl">
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <div className="flow-root">
            <ul className="-my-8">
              <li className="flex flex-col py-6 space-y-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                <div className="relative shrink-0">
              
                  <Image className="object-cover w-24 h-24 max-w-full rounded-lg" src={order?.product?.images[0]?.slice(8)} alt="" width={200} height={200} />
                </div>
                <div className="relative flex flex-col justify-between flex-1">
                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                    <div className="pr-8 sm:pr-5">
                      <p className="text-base font-semibold ">{order?.product?.name}</p>
                      <p className="mx-0 mt-1 mb-0 text-sm "></p>
                    </div>
                    <div className="flex items-end justify-between mt-4 sm:mt-0 sm:items-start sm:justify-end">
                      <p className="w-20 text-base font-semibold shrink-0 sm:order-2 sm:ml-8 sm:text-right">&#8377; {order?.product?.price}</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                    <button type="button" className="flex p-2 text-center transition-all duration-200 ease-in-out rounded focus:shadow hover:text-gray-900">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            
            </ul>
          </div>
          
          <div className="py-8 mt-6 space-y-3 border-t border-b">
            <div className="flex items-center justify-between">
              <p className="">Subtotal</p>
              <p className="text-lg font-semibold ">$2399.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Shipping</p>
              <p className="text-lg font-semibold ">&#8377; 250</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm font-medium ">Total</p>
            <p className="text-2xl font-semibold "><span className="text-xs font-normal ">INR</span>  &#8377; {order?.product?.price +250}</p>
          </div>
          <div className="mt-6 text-center">
            <button type="button" className="inline-flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out bg-orange-500 rounded-md group focus:shadow hover:bg-gray-800" onClick={()=>{
              return router.push("/order/history")
            }}>
             View In Order history
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-4 transition-all group-hover:ml-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
}



