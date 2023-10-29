import React, { ReactNode } from "react";
import SideMenu from "./shop/_components/SideMenu/component/server/SideMenu";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {

  return <div className="z-30 ">
    <div className="absolute top-0 w-32 mt-8 ml-6 -translate-x-full left-full">
    <SideMenu/>
    
        </div>
    {children}
    </div>;
}
