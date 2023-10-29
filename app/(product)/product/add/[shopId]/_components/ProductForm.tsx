"use client";
import React, { ChangeEvent, EventHandler, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Category from "./Category";
import Heading from "./Heading";
import { cn } from "@/lib/utils";
import ImageUploder from "./ImageUploder";
import DBProduct, { DBProductImages } from "../_actions/product";
import { useContext } from "react";
import { ShopIdContext, ShopIdContextType, useContextFunction } from "../layout";
import { useRouter } from "next/navigation";
function ProductForm() {
  const [category, setCategory] = useState("");
  const [formPhase, setFormPhase] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const {shopId, handleSetProductId, product_id, image_upload_status} = useContextFunction() as ShopIdContextType
 
  const router = useRouter()

  const ProductFormSchemaOne = z.object({
    product_name: z.string().min(4, {
      message: "Product name must be at least 4 characters.",
    }),
    product_description: z.string().refine(
      (value) => {
        const words = value.split(/\s+/).filter((word) => word !== "");
        return words.length >= 10;
      },
      {
        message: "Description must contain a minimum of 10 words.",
      }
    ),
  });
  const ProductFormSchemaTwo = z.object({
    product_price: z.coerce.number().positive().gte(10, {
      message: "Price must be greater then 10",
    }),
    product_inventory: z.coerce.number().positive().gte(50, {
      message: "inventory Must Contain a Minimum of 50 Items.",
    }),
  });
  const productFormOne = useForm<z.infer<typeof ProductFormSchemaOne>>({
    resolver: zodResolver(ProductFormSchemaOne),
    defaultValues: {
    product_name: "",
    product_description: "",
    },
  });
  const productFormTwo = useForm<z.infer<typeof ProductFormSchemaTwo>>({
    resolver: zodResolver(ProductFormSchemaTwo),
    defaultValues: {},
  });


  function handleSetCategory(category_: string) {
    setCategory(category_);
  }
  function onSubmit(values: z.infer<typeof ProductFormSchemaOne>) {
    const data = { ...values, category: category };
    console.log(data);
    setFormPhase(2);
  }

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };




 async function onFinalSubmit(){
    const form_one = productFormOne.getValues()
    const from_two = productFormTwo.getValues()
    const payload = {...form_one, ...from_two, product_sizes: [...selectedSizes], shop_id: shopId!, product_category:category}
  const {data, status} = await DBProduct(payload)
  if(data && status ==200)
  {handleSetProductId(data?.id)
    
    console.log(product_id)
    if(image_upload_status === 200)
    return router.push(`/dashboard/shop/products`)
  }
}




  if (formPhase === 2) {
    return (
      <div>
        <div className="text-3xl break-words  p-4 font-semibold  font-[ApfelFett] tracking-wide dark:text-gray-200">
          Few More Details About Your Product
          <span className="font-semibold border-b-2 border-purple-800 dark:text-purple-500">
            {" " + productFormOne.getValues("product_name") && productFormOne.getValues("product_name") }
          </span>
        </div>
        <ImageUploder/>
        <div className="mt-3 font-[PoppinsBold] p-2 space-y-2">
          <h1 className="font-semibold">Available Sizes</h1>
          {selectedSizes &&
            ["S", "M", "L", "XL"].map((size) => (
              <Button
                key={size}
                className={cn(
                  `w-8 h-8 mr-3 rounded-full size-button`,
                  selectedSizes.includes(size) && "bg-gray-400"
                )}
                data-size={size}
                onClick={() => toggleSize(size)}
              >
                {size}
              </Button>
            ))}
        </div>

        <Form {...productFormTwo}>
          <form
            onSubmit={productFormTwo.handleSubmit(onFinalSubmit)}
            className="md:w-[300px] max-w-[360px] mx-auto mt-2 p-2 font-[PoppinsBold] dark:text-gray-200 space-y-6"
          >
            <FormField
              control={productFormTwo.control}
              name="product_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="₹50"
                      {...field}
                      type="number"
                      className="py-6 focus-visible:ring-purple-400"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productFormTwo.control}
              name="product_inventory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inventory </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100"
                      {...field}
                      type="number"
                      className="py-6 focus-visible:ring-purple-400"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              submit
            </Button>
          </form>
        </Form>
      </div>
    );
  }
  return (
    <main>
      <Heading />
      <Form {...productFormOne}>
        <form
          onSubmit={productFormOne.handleSubmit(onSubmit)}
          className="md:w-[300px] max-w-[360px] mx-auto mt-4 p-2 font-[PoppinsBold] dark:text-gray-200 space-y-6"
        >
          <FormField
            control={productFormOne.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    {...field}
                    className="py-6 focus-visible:ring-purple-400"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={productFormOne.control}
            name="product_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    {...field}
                    className="focus-visible:ring-purple-400"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Category handleSetCategory={handleSetCategory} />
          <Button
            className="font-[ApfelFett] w-full "
            disabled={category ? false : true}
            type="submit"
          >
            submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
export default ProductForm;
