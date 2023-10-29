// "use client"
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
// import AvatarCP from "../../../avatar";
import Profile from "../../../Profile";
// import { useRouter } from "next/navigation";
// import server from "@/lib/API";
// import { useUser } from "@clerk/nextjs";
import Description from "../client/Description";
import Seller from "../client/Seller";
import Category from "./category";
import Cart from "../client/action/Cart";
type Props = {};

export  default function SideMenu({}: Props) {

  return (
    <Sheet>
      <SheetTrigger asChild className="p-0 bg-transparent border-0">
        <Button variant="outline" className="hover:bg-transparent">
          <Menu size={40} strokeWidth={1} />
        </Button>
      </SheetTrigger>
      <SheetContent className={cn("bg-opacity-20 bg-gray-800 blur-mg")}>
        <SheetHeader>
          <SheetTitle>
            <Profile />
          </SheetTitle>
        </SheetHeader>
        <Cart />
        <Category />
        <Description/>
        <SheetFooter>
          <SheetClose asChild>
              <Seller />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
