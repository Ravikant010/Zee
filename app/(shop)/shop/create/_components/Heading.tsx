"use server"
import Loader from '@/components/loader';
import { currentUser } from '@clerk/nextjs';
import { Store } from 'lucide-react';
import React from 'react'

type Props = {}

export default async function Heading({}: Props) {
    const user = await currentUser();
  
    if (user) {
      console.log(user);
    }
    if (!user) return <Loader />;
    const email = user?.emailAddresses[0]?.emailAddress;
    const fullName = user?.firstName + " " + user?.lastName;

  return <section className="p-4 text-4xl font-semibold font-[ApfelFett]">
  <h1>
    Welcome, <span className="dark:text-purple-500">{fullName}</span>!
    Let's build your shop
    <span className="inline gap-x-2 justify-start items-center">
      <Store strokeWidth={1} className="dark:text-purple-400" size={32} />
    </span>
  </h1>
</section>
}