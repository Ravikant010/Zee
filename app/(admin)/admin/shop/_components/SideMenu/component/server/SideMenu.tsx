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
import Profile from "@/app/_components/Profile";
// import { useRouter } from "next/navigation";
// import server from "@/lib/API";
// import { useUser } from "@clerk/nextjs";
import Description from "../client/Description";
import Seller from "../client/Seller";
import Category from "./category";
type Props = {};

export  default function SideMenu({}: Props) {
  // const router = useRouter();

  // const { user } = useUser();
  // const [isSeller, setSeller] = useState(false);
  // useEffect(() => {
  //   getUserRole();
  // }, [user]);


  // async function getUserRole() {
  //   if (user) {
  //     const api = await server.get(
  //       `/user/?email=${user.emailAddresses[0]?.emailAddress}`
  //     );
  //     console.log(api.data);
  //     if (api.data) {
  //       const { role } = api.data;
  //       if (role == "SELLER") {
  //         console.log(role);
  //         setSeller(true);
  //       }
  //     }
  //   }
  // }


  return (
    <Sheet>
      <SheetTrigger asChild className="p-0 bg-transparent border-0">
        <Button variant="outline" className="hover:bg-transparent">
          <Menu size={46} strokeWidth={1}  className="opacity-0"/>
        </Button>
      </SheetTrigger>
      <SheetContent className={cn("bg-opacity-20 bg-gray-800 blur-mg")}>
        <SheetHeader>
          <SheetTitle>
            <Profile />
          </SheetTitle>
        </SheetHeader>

        <Description/>
 
        <SheetFooter>
          <SheetClose asChild>
          
              {/* <Seller /> */}
        
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
