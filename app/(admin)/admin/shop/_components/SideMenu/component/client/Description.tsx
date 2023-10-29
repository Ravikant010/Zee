"use client";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {};

const MenuOptions = [
  "Edit Shop",
  "Products",
  "Add Product",
  "Dashboard",
  "Contact Us",
  "Exit"
];

export default function Description({}: Props) {
  const router = useRouter();
const path = usePathname()
console.log(path)
  function Navigate(path: string) {
    return router.push(`/${path.toLowerCase()}`);
  }

  return <main className="w-full my-6">
    {MenuOptions.map((options) => {
      if(options === "Home" && path == "/")
      return "";
      return (

        <div
          className="w-full p-2 px-4 text-lg text-start hover:text-gray-500 hover:font-bold"
          onClick={() => {
            if(options === "Exit")
            return Navigate("shop")
          if(options.toLowerCase().replace(/\s/g, '')==="addproduct")
          return Navigate("admin/shop/" +options.toLowerCase().replace(/\s/g, ''))
            console.log(options.toLowerCase().replace(/\s/g, ''))
return Navigate("admin/" +options.toLowerCase().replace(/\s/g, ''))
          }}
          key={options}
        >
         
          <div className="flex">  {options === "Exit" && <LogOut size={32} strokeWidth={1} className="mr-2 dark:text-gray-300"/>} {options}</div>
        </div>
      )}
    )
        }
  </main>
}
