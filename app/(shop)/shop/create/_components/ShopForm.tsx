"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CreateShopUser from "../action/CreateShopUser";
import { useRouter } from "next/navigation";
import GetShopUser from "../action/getShopUser";
import Loader from "@/components/loader";
import { CitySelect } from "./CitySelect";
import { Textarea } from "@/components/ui/textarea";
import CreateShop from "../action/CreateShop";
type Props = {
  full_name: string;
  email: string;
};
export default function ShopForm({ full_name, email }: Props) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [loader, setLoader] = useState(true);
  const [value, setValue] = React.useState("");
  useEffect(() => {
    CheckForExistingUser();
  }, []);
  useEffect(() => {
    console.log(userName);
  }, [userName]);
  async function CheckForExistingUser() {
    const { data, status } = await GetShopUser(email);
    if (status == 200 && data) {
      setUserName(data?.username);
      setLoader(false);
    } else setLoader(false);
  }
  const ShopUserCreateSchema = z.object({
    full_name: z.string().min(2, {
      message: "fullname must be at least 4 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    user_name: z.string().min(2, {
      message: "username must be at least 4 characters.",
    }),
  });
  const form = useForm<z.infer<typeof ShopUserCreateSchema>>({
    resolver: zodResolver(ShopUserCreateSchema),
    defaultValues: {
      full_name: full_name || "",
      email: email || "",
      user_name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof ShopUserCreateSchema>) {
    //@ts-ignore
    const { status, data } = await CreateShopUser(
      email,
      values?.user_name,
      full_name
    );
    if (status == 200) {
      form.setValue("full_name", "");
      form.setValue("email", "");
      form.setValue("user_name", "");
      setUserName(data?.username);
    }
  }
  const ShopFormSchema = z.object({
    shop_name: z.string().min(2, {
      message: "Shop name must be at least 2 characters long",
    }),
    shop_description: z.string().min(4, {
      message: "Shop description must be at least 4 characters long.",
    }),
    shop_address: z.string().min(10, {
      message: "Shop Address must be at least 10 characters long.",
    }),
  });
  const ShopForm = useForm<z.infer<typeof ShopFormSchema>>({
    resolver: zodResolver(ShopFormSchema),
    defaultValues: {
      shop_name: "", 
      shop_description: "",
      shop_address: "", 
    },
  });
  if (loader)
    return (
      <div className="w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  async function onSubmit_(values: z.infer<typeof ShopFormSchema>) {
    setLoader(true);
 const payload = {...values, shop_city: value, email: email}
 //@ts-ignore
    const { data, status } = await CreateShop(payload);
    if (status == 200 && data) {
      setUserName(data);
    return   router.push(`/product/add/${data?.id}/?name=${data?.shop_name}`)
      
 
    } else setLoader(false);
  }
  if (userName) {
    return (
      <Form {...ShopForm}>
        <form
          onSubmit={ShopForm.handleSubmit(onSubmit_)}
          className="space-y-4 md:w-[300px] max-w-[360px] mx-auto font-[PoppinsMedium] text-gray-300"
        >
          <FormField
            control={ShopForm.control}
            name="shop_name" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className={cn(
                      "py-6 rounded-lg text-base focus-visible:ring-purple-400"
                    )}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ShopForm.control}
            name="shop_description" 
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full">City</FormLabel>
                <br />
                <FormControl>
                  <CitySelect setValue={setValue} value = {value}/>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ShopForm.control}
            name="shop_description" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    {...field}
                    className={cn(
                      "py-2 rounded-lg h-32 text-base focus-visible:ring-purple-400"
                    )}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ShopForm.control}
            name="shop_address" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    {...field}
                    className={cn(
                      "py-2 rounded-lg h-auto text-base focus-visible:ring-purple-400 max-h-16"
                    )}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn(
              "w-full py-6 font-bold font-[ApfelFett] leading-normal tracking-normal text-base"
            )}
          >
            Submit
          </Button>
        </form>
      </Form>
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:w-[300px] max-w-[360px] mx-auto font-[PoppinsMedium] text-gray-300"
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FullName</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  defaultValue={form.getValues("full_name")}
                  className={cn(
                    "py-6 rounded-lg text-base focus-visible:ring-purple-400"
                  )}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  defaultValue={form.getValues("email")}
                  className={cn(
                    "py-6 rounded-lg text-base focus-visible:ring-purple-400"
                  )}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className={cn(
                    "py-6 rounded-lg text-base focus-visible:ring-purple-400"
                  )}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn(
            "w-full py-6 font-bold font-[ApfelFett] leading-normal tracking-norma text-base"
          )}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
