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
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useContextFunction } from "../layout";
import GetUser from "./_action/getUser";
import { useUser } from "@clerk/nextjs";
import city from "@/assests/city.json";
import { finalizeOrder } from "./_action/finalizeOrder";
import { loadStripe } from "@stripe/stripe-js";
import server from "@/lib/API";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckOutPage() {
  const { user } = useUser();
    const router  = useRouter()
  const [selectCity, setSelectCity] = useState("");
  const { productId } = useContextFunction();
  function countrySelect(value: string) {
    setSelectCity(value);
  }

  const formSchema = z.object({
    Address: z.string().min(10, {
      message: "Address must be at least 10 characters.",
    }),
    zip: z.coerce.number().min(2, {
      message: "Zip code must be valid",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Address: "",
      zip: 0,
    },
  });

  async function OnSubmit(values: z.infer<typeof formSchema>) {
    const form = {
      ...values,
      productId: productId,
      city: selectCity,
      email: user?.emailAddresses[0]?.emailAddress as string,
    };
    console.log(form);
    if (form) {
        const data = await server.post("/checkout_session", form)
        router.push(data.data?.url)
    //   const { data, status } = await finalizeOrder(form);
    //   console.log(status);
    //   if (status === 200) console.log(data);
    }
  }

  return (
    <div className="p-4">
      <div className="text-3xl text-semibold dark:text-purple-500 font-[ApfelFett] w-full ">
        Finalize your Order
      </div>
      <section>
        <p>Fill Below Form</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(OnSubmit)}
            className="mt-2 space-y-2"
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
      </section>
    </div>
  );
}
