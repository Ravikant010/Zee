import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductCard = ({
  name,
  price,
  image,
  description,
  id
}: {
  name: string;
  id:string;
  price: string;
  image: string;
  description: string;
}) => {
  const router = useRouter()
  function navigate(){
    return router.push(`/product/${id}`)
  }
  return (
    <div className="h-auto p-2 px-4 dark:bg-gray-800 w-52 sm:px-6 lg:px-8 shrink-0 dark:bg-opacity-40 md:gap-x-2 lg:w-72"  onClick={navigate}>
      <div className="relative group">
        <div className="w-full overflow-hidden aspect-w-1 aspect-h-1 ">
          <Image
            className="object-cover w-full h-32 transition-all duration-300 rounded-md md:h-72 md:w-72 lg:w-full"
            src={image}
            width={300}
            height={300}
            alt=""
          />
        </div>
        <div className="flex flex-col items-start justify-between mt-2 space-x-4">
          <div>
            <h3 className="text-lg font-bold tracking-wide sm:text-sm md:text-base line-clamp-1">
              <p>
                {name}
                <span className="absolute inset-0" aria-hidden="true"></span>
              </p>
            </h3>
            <h2 className="text-sm line-clamp-1">{description}</h2>
          </div>
         
        </div>
        <div className="">
            <p className="flex text-xl font-bold sm:text-sm md:text-base">
              &#8377; {price}
            </p>
          </div>
      </div>
    </div>
  );
};
export default ProductCard;
