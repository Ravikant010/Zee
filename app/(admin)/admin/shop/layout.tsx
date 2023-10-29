"use client";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import SideMenu from "./_components/SideMenu/component/server/SideMenu";
import { createContext } from "react";
import getUserShop from "./products/actions/getShop";
interface ShopInterface {
  id: string;
  shop_name: string;
  shop_description: string | null;
  shop_address: string | null;
  shop_city: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ShopInterfaceContext = {
  shop: ShopInterface | null;
  handleSetShop: (shop: ShopInterface) => void;
};
export const ShopContext = createContext<ShopInterfaceContext | null>(null);

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [shop, setShop] = useState<ShopInterface | null>(null);
  async function handleSetShop() {
    const { data, status } = await getUserShop();
    if (status == 200 && data?.length) {
      console.log(data[0]);
      //@ts-ignore
      setShop(data[0]);
    }
  }
  useEffect(() => {
    handleSetShop();
  }, []);
  return (
    <ShopContext.Provider value={{ shop, handleSetShop }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShopContextFunction(): ShopInterfaceContext | null {
  const context = useContext(ShopContext);
  if (context) return context;
  return null;
}

// const [shop, setShop] = useState<ShopInterface>({});
// async function handleGetShop() {
//   const { data, status } = await getUserShop();
//   if (status == 200 && data?.length) {
//       console.log(data[0])
//       //@ts-ignore
//     setShop(data[0]);
//   }
// }
// useEffect(() => {
//   handleGetShop();
// }, []);
