"use client"
import React from 'react';
import { useRouter } from 'next/router';

interface ProductProps {
  image_url: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  id: string;
}

const Product: React.FC<ProductProps> = ({ image_url, name, description, price, rating, id }) => {
  const router = useRouter();
  
  const redirectToProduct = () => {
    const formattedName = name.trim().toLowerCase();
    const redirect_link = `/home/shop/product/${formattedName}/?id=${id}`;
    router.push(redirect_link);
  };

  return (
    <div className="w-32 p-2 space-y-2 text-base bg-gray-800 rounded-md h-52 bg-opacity-20 cursor-pointer" onClick={redirectToProduct}>
      <div>
        <img src={image_url.slice(8)} alt={name} className="object-cover w-full h-20" />
        <h1 className="mt-1 font-bold line-clamp-2">{name}</h1>
        <div className="text-sm line-clamp-1">{description}</div>
      </div>
      {/* {rating && <Star />} */}
      <p className="text-sm font-semibold">INR: {price}</p>
    </div>
  );
};

export default Product;
