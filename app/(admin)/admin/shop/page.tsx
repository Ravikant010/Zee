"use client";
import React, { useEffect, useState } from "react";
import getUserShop from "./products/actions/getShop";
import moment from "moment";
import Icon from "@/app/_components/Icon";
import { Store } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";

type Props = {};
interface ShopInterface {
  createdAt: string; // Assuming a string representation of a date
  id: string;
  ownerId: string;
  shop_address: string;
  shop_city: string;
  shop_description: string;
  shop_name: string;
  updatedAt: string; // Assuming a string representation of a date
}

export default function Products({}: Props) {
  const [shop, setShop] = useState<ShopInterface>();
  async function handleGetShop() {
    const { data, status } = await getUserShop();
    if (status == 200 && data?.length) {
      console.log(data[0]);
      //@ts-ignore
      setShop(data[0]);
    }
  }
  useEffect(() => {
    handleGetShop();
  }, []);
  if(!shop)
  return <div className="absolute top-1/2 left-1/2 -translate-1/2"><Loader/></div>
  return (
    <div className="p-2 space-y-2">
      <Icon Icon={Store} size={32} />
      <div className="text-2xl font-[ApfelFett] capitalize">
        Your Shop{" "}
        <span className="font-semibold dark:text-purple-500">
          {shop?.shop_name}
        </span>
      </div>
      <p>{shop?.shop_description}</p>
      <address>{shop?.shop_city}</address>

      <address>{shop?.shop_address}</address>

      <p>{moment(shop?.createdAt).format("MMMM DD, YYYY")}</p>
      <div className="h-5"></div>
      <Separator />
      <div className="flex h-10 space-x-2">
        <Button variant={"link"}>Products</Button>
        <Separator
          orientation="vertical"
          className="dark:text-purple-500"
          color="#603173"
        />
        <Button variant={"link"}>Recent Orders</Button>
        <Separator
          orientation="vertical"
          className="dark:text-purple-500"
          color="#603173"
        />
      </div>
    </div>
  );
}
