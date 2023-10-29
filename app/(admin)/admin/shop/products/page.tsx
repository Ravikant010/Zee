import React from "react";
import { currentUser } from "@clerk/nextjs";
import GetProducts from "./actions/getProducts";
import ProductCard from "./_components/ProductCard";
import Loader from "@/components/loader";
type Props = {};

export default async function Products({}: Props) {
  const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress

  if (user) {
    return <div> <ProductCard email={email!}/></div>;
  }
  return <><Loader/></>;
}
