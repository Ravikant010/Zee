"use client";
import Loader from "@/components/loader";
import { useParams } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";
import GetProduct from "./_actions/getProduct";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import AddToCart from "./_actions/addToCart";
import toast, { Toaster } from "react-hot-toast";
import { ChckForItem } from "./_actions/checForItem";
import { useRouter } from "next/navigation";

interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;

  shopId: string;
  category: string;
  sizes: string[];
  reviews: object[];
  inventory: number;
  Wishlist: string[];
  images: string[];
  soldCount: number;
  rating?: number | null;
  createdAt: Date;
  active?: boolean | null;
  Order: object[];
}

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useUser();
  const [product, setProduct] = useState<any>(null);
  const [addTocartStatus, setAddTOCartStatus] = useState(0);
  const [alredyinBagStatus, setAlreadyinBag] = useState(0);

  async function handleCart(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const { status } = await AddToCart({
      email: user?.emailAddresses[0]?.emailAddress!,
      productId: productId as string,
    });
    if (status === 200) {
      setAddTOCartStatus(200);
      toast.success("Item Successfully Added into Bag!");
    }
  }

  async function handleGetProduct() {
    const { data, status } = await GetProduct(productId as string);

    if (status === 200 && data) {
      return setProduct(data);
    }
  }

  async function handleCheckIteminBag() {
    const { status } = await ChckForItem({
      email: user?.emailAddresses[0]?.emailAddress!,
      productId: productId as string,
    });
    if (status === 409) {
      setAlreadyinBag(409);
    }
    if (status === 200) {
      setAlreadyinBag(200);
    }
  }

  useEffect(() => {
    if (user) handleCheckIteminBag();
  }, [user]);
  useEffect(() => {
    handleGetProduct();
  }, [productId]);

  useEffect(() => {
    console.log(product);
  }, [product]);
  const router = useRouter();
  if (!product)
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <Loader />
      </div>
    );
  return (
    <div className="bg-white dark:bg-transparent dark:text-gray-200">
      <Toaster />
      <div className="pt-6">
        <div className="max-w-2xl mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product?.images[0].slice(8)}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {product?.name}
            </h1>
          </div>
          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight ">&#8377; {product?.price}</p>
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
            </div>
            <form className="mt-10">
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium ">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>
                <fieldset className="mt-4"></fieldset>
              </div>
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base font-medium">
                    {product?.description}
                  </p>
                </div>
              </div>
              {alredyinBagStatus !== 409 ? (
                <Button
                  type="submit"
                  className="float-right my-5 rounded-full"
                  onClick={(e) => handleCart(e)}
                >
                  {addTocartStatus ? "Added to Bag" : "Add to bag"}
                </Button>
              ) : (
                <div className="h-10 "></div>
              )}
              <button
                type="submit"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault()
                  return router.push(`${productId}/buy`);
                }}
              >
                Buy
              </button>
            </form>
          </div>
          <div className="py-0 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"></div>
        </div>
      </div>
    </div>
  );
}
