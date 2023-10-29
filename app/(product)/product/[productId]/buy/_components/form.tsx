"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import city from "@/assests/city.json";
import { SubmitForm } from "./submitform";
import server from "@/lib/API";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContextFunction } from "../../layout";
import GetProduct from "../_action/getProduct";
import { finalizeOrder } from "../_action/finalizeOrder";
import GetUser from "../_action/getUser";
type Props = {
  id: string;
};

export default function BUYFORM({ id }: Props) {
  const {user} = useUser()
  const router = useRouter();
  const formSchema = z.object({
    Address: z.string().min(10, {
      message: "Address must be at least 10 characters.",
    }),
    zip: z.coerce.number().min(2, {
      message: "Zip code must be valid",
    }),
  });
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Address: "",
      zip: 0,
    },
  });
  function navigate(path:string) {
    router.push(path);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const form = {
      ...values,
      productId: id,
      amount: price,
      city: selectCity,
      id: userId,
      navigate: navigate,
    };
    console.log(form);
    if (form) 
    {
      const {data, status}  = await finalizeOrder(form)
      if(status === 200 )
      console.log(data)
    }
  }

  const [selectCity, setSelectCity] = useState("");
  const {productId} = useContextFunction()
  function countrySelect(value: string) {
    setSelectCity(value);
  }
  
async function  handleGetuser(){
  if(user){
    const user_db = await GetUser(user?.emailAddresses[0]?.emailAddress)
    if(user_db)
    setUserId(user_db?.id)
     }
}
  useEffect(()=>{
    handleGetuser()
  }, [user])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 mt-2 space-y-2"
      >
        <FormField
          control={form.control}
          name="Address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Address" {...field} required />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>city</div>
        <Select onValueChange={countrySelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent className="overflow-y-auto h-44">
            <SelectGroup>
              <SelectLabel>country</SelectLabel>
              {city.map((city) => (
                <SelectItem value={city} key={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip</FormLabel>
              <FormControl>
                <Input
                  placeholder="zip code"
                  {...field}
                  required
                  type="number"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
