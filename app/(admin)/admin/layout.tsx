import React, { ReactNode } from "react";
import SideMenu from "./shop/_components/SideMenu/component/server/SideMenu";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {

  return <div>
    <div className="absolute top-0 mt-2 -translate-x-full opacity-0 left-full">
    <SideMenu/>
        </div>
    {children}</div>;
}
