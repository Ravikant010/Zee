"use client";
import { ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {};

const MenuOptions = [
  "Home",

  "Men's Collection",
  "Women's Collection",
  "Kids' Collection",
  "shop",
  "Dashboard",
  "Contact Us",
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

            if (options == "Dashboard") return Navigate("order/history");
            if (options === "shop") return Navigate("shop");
            Navigate(
              options === "Home"
                ? "/"
                : options.toLocaleLowerCase()
            );
          }}
          key={options}
        >
          <div>{options}</div>
        </div>
      )}
    )
        }
  </main>
}
