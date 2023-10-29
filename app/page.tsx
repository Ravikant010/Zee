import Image from "next/image";
import { Gift, LucideIcon } from "lucide-react";
import { Smile } from "lucide-react";
import { Truck } from "lucide-react";
import { BaggageClaim } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query'
import getQueryClient from "@/components/queryClient";
import axios from "axios";
import ProductCard from "./_components/ProductCard";
import Product from "./_components/product";
export default async function Home() {

  const queryClient = new QueryClient()

 await  queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: async()=> await axios.get("https://jsonplaceholder.typicode.com/posts"),
  })


  return (
    <main className="w-full min-h-screen dark:text-gray-300">
      <div className="absolute top-0 h-screen -z-10">
        <video
          className="object-cover w-full h-full"
          autoPlay
          autoFocus
          muted
          loop
        >
          <source src="/image.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="h-screen"></div>
      <div className="relative top-0 flex flex-col items-center justify-center w-full h-full font-[ApfelFett] dark:text-gray-300">
        <h1 className="flex items-center w-full p-2 text-3xl font-semibold text-center h-52 font-[Open Sans] leading-normal">
          We Provide the Best Customer Experience
        </h1>
        <div className="absolute top-0 bg-gray-800 rounded-full w-52 h-52 bg-opacity-45 -z-10 blur-2xl"></div>
      </div>
      <div className="flex w-full p-4 mx-auto space-x-4 overflow-x-auto shrink-0">
        {[
          {
            heading: "Authentic Products",
            description:
              "Genuine items for peace of mind. Quality and authenticity assured.",
            icon: Gift,
          },
          {
            heading: "Satisfaction Guaranteed",
            description:
              "Your contentment is our promise. We stand by our products, always.",
            icon: Smile,
          },
          {
            heading: "Daily New Arrivals",
            description:
              "Daily trends and innovations. Never miss what's fresh and exciting.",
            icon: BaggageClaim,
          },
          {
            heading: "Swift Shipping",
            description:
              "Fast, secure doorstep delivery. Shop for quick, reliable shipping.",
            icon: Truck,
          },
        ].map((el, index) => (
          <Card
            key={index}
            heading={el.heading}
            description={el.description}
            Icon={el.icon}
          />
        ))}
      </div>
      <div className="w-full my-20 text-2xl font-semibold text-center">
        Find Your Style
      </div>

      {["Women's Clothing", "Men's Clothing", "Kids' Clothing"].map(
        (options, index) => (
          <BubbleShape text={options} index={index} key={index} />
        )
      )}

      <div className="text-center font-semibold text-2xl mt-20 font-[ApfelFett]">
        Explore for more
        <br />
        <Button
          variant={"outline"}
          className={cn("px-6 my-4 text-lg font-thin font-[PoppinsMedium]")}
        >
          Explore
        </Button>
      </div>

      <div className="h-auto my-20 ">
        <h1 className="text-2xl font-semibold text-center font-[ApfelFett] " >Our Best Sellers</h1>
       <Product title="BestSeller"/>
      </div>

      <div className="h-full my-20 ">
        <h1 className="h-full text-2xl font-semibold text-center font-[ApfelFett]">New Arrivals</h1>

        <Product title = "NewArrival"/>
      </div>

      <div className="h-auto my-20">
        <h1 className="h-full text-2xl font-semibold text-center font-[ApfelFett]">Style</h1>

        <Product title = "Style"/>
      </div>

      <div className="h-auto my-20">
        <h1 className="h-full text-2xl font-semibold text-center">Available Brands</h1>

       
      </div>
    
    </main>
  );
}

function Card({ heading, description, Icon }: {
  heading:string, description:string, Icon: LucideIcon
}) {
  return (
    <div className="relative flex flex-col w-3/5 p-4 my-20 shadow-md bg-opacity-20 rounded-xl bg-slate-800 shrink-0">
      <Icon size={32} strokeWidth={1} />
      <h1 className="text-lg font-semibold dark:border-gray-600">{heading}</h1>
      <div className="h-24 overflow-y-auto text-base">{description}</div>
      <div className="absolute top-0 w-full h-full bg-gray-800 rounded-lg bg-opacity-40 blur-2xl -z-10"></div>
    </div>
  );
}





const BlurBGCircle = ({ classname }: { classname: string }) => {
  return (
    <div className={cn("flex justify-center items-center", classname)}></div>
  );
};





const BubbleShape = ({ text, index }: { index: number; text: string }) => (
  <section
    className={cn(
      "text-lg p-4 w-11/12 mx-auto flex items-center relative",
      { ["justify-end"]: index % 2 == 0 },
      {
        ["justify-start"]: index % 2 !== 0,
      }
    )}
  >
    <BlurBGCircle classname="w-32 h-32 bg-gray-800 rounded-full blur-xl bg-opacity-70 "></BlurBGCircle>
    <div className="absolute flex items-center w-32 h-32 text-center break-words ">
      {text}
    </div>


  </section>
);


