"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ExistingShop } from "./action/ExistingShop";
import Loader from "@/components/loader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();
  async function CheckForShop() {
    console.log(user?.emailAddresses[0]?.emailAddress);
    if (user) {
      const email = user?.emailAddresses[0]?.emailAddress;
      const { data, status } = await ExistingShop(email);
      console.log(data);
      if (status == 409 && data) return router.push(`/shop/${data}`);
      else setLoading(false);
    }
  }
  useEffect(() => {
    CheckForShop();
  }, [user]);
  if (isLoading || !user) return <Loader />;
  return <div>{children}</div>;
}
