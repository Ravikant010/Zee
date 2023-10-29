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
import AvatarCP from "./avatar";
import SideMenu from "./SideMenu/component/server/SideMenu";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";
import { Menu } from "lucide-react";
import Icon from "./Icon";
export default function TopNav() {
  return (
    <main className="">
      <ul className="flex w-full p-2 text-lg bg-opacity-0 sm:p-8">
        <div className="flex-1 font-[Apfel] dark:text-purple-400 text-4xl bg-transparent">Zee</div>
        <div className="flex sm:hidden">
          <SideMenu />
        </div>
        <div className="hidden space-x-8 sm:flex ">
          <ShoppingCart
            size={32}
            className="text-gray-800 hover:text-gray-600"
            strokeWidth={1}
          />
          <User
            size={32}
            className="text-gray-800 hover:text-gray-600"
            strokeWidth={1}
          />

          {}
        </div>
      </ul>
      
    </main>
  );
}
