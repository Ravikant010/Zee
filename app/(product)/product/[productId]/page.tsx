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
import Image from "next/image";

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
      setAlreadyinBag(200);
    }
    if (status === 200) {
      setAlreadyinBag(404);
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
    <div className="mx-auto bg-white dark:bg-transparent dark:text-gray-200 lg:grid lg:grid-cols-2 lg:max-w-7xl">
      <Toaster />

      {product ? (
        <>
          <div className="max-w-md p-4 mx-auto space-y-4">
            <Image
              src={product.images[0].slice(8)}
              alt={product.name}
              className="object-contain w-full h-82 dark:bg-gray-800 dark:bg-opacity-30"
              width={500}
              height={500}
              alt=""
            />
          </div>
          <div className="max-w-md p-4 mx-auto space-y-4">
            <h1 className="mt-4 text-xl font-bold">{product.name}</h1>
            <p className="mt-2 text-gray-300">{product.description}</p>
            <p className="mt-2 text-2xl font-bold">&#8377; {product.price}</p>
            <div>
              <Button
                onClick={(e) => handleCart(e)}
                className="w-full mt-4"
                disabled={
                  addTocartStatus === 200
                    ? true
                    : alredyinBagStatus === 200
                    ? true
                    : false
                }
              >
                {addTocartStatus ? "Added to Bag" : "Add to Bag"}
              </Button>
              <Button
                onClick={() => router.push(`/product/${productId}/buy`)}
                className="w-full mt-2"
              >
                Buy
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      )}
    </div>
  );
}
