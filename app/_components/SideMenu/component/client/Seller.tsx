"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import GetUserRole from "./action/getUserrole";

type Props = {};

export default function Seller({}: Props) {
  const { user } = useUser();
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    if (user) setUserEmail(user.emailAddresses[0].emailAddress);
  }, []);

  const [role, setRole] = useState("");

  const router = useRouter();
  function Seller() {
    return router.push("/admin/shop");
  }

  async function handleGetRole(email: string) {
    const { role } = (await GetUserRole(email)) as {
      role: string;
    };
    console.log(role);
    setRole(role);
  }
  useEffect(() => {
    if (user) {
      const email = user?.emailAddresses[0]?.emailAddress;
      handleGetRole(email);
    }
  }, [user]);
  if (role === "SELLER")
    return (
      <Button type="submit" onClick={Seller}>
        Your Shop
      </Button>
    );
  return (
    <Button type="submit" onClick={Seller}>
      Become a Seller
    </Button>
  );
}
