
import React, { useEffect } from "react";
import { currentUser } from "@clerk/nextjs";
import Loader from "@/components/loader";
import { Store } from "lucide-react";
import Icon from "@/app/_components/Icon";
import ShopForm from "./_components/ShopForm";

type Props = {};

export default async function Page() {
  const user = await currentUser();

  if (!user) return <Loader />;
  const email = user?.emailAddresses[0]?.emailAddress;
  const fullName = user?.firstName + " " + user?.lastName;

  

  return (
    <main className="w-full h-fit break-words capitalize dark:text-gray-200">
      <section className="p-4 text-4xl font-semibold font-[ApfelFett]">
        <h1>
          Welcome, <span className="dark:text-purple-500">{fullName}</span>!
          Let's build your shop
          <span className="inline gap-x-2 justify-start items-center">
            <Store strokeWidth={1} className="dark:text-purple-400" size={32} />
          </span>
        </h1>
      </section>

      <section className="p-4 ">
        <ShopForm full_name={fullName} email={email}/>
      </section>
    </main>
  );
}
