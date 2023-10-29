"use client"
import Loader from '@/components/loader';
import { currentUser } from '@clerk/nextjs';
import { Store } from 'lucide-react';
import React from 'react'

type Props = {}

export default async function Heading({}: Props) {

  return <section className="p-4 text-4xl font-semibold font-[ApfelFett] my-4 dark:text-purple-400">
  <h1>
  Finalize Your Order
   
  </h1>
</section>
}