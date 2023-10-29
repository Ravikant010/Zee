"use client"
import React, { useEffect, useState } from 'react';
import GetProducts from '../actions/getProducts';
import Loader from '@/components/loader';

type Props = {
  email: string;
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  shopId: string;
  category: string;
  sizes: string[];
  inventory: number;
  images: string[];
  soldCount: number;
  rating: number | null;
  createdAt: Date;
  active: boolean;
}

export default function ProductCard({ email }: Props) {
  const [products, setProducts] = useState<Array<Product> | null>([]);
  const [isLoading, setLoading] = useState(true);


  const [showFullDescription, setShowFullDescription] = useState(false);

  async function Products() {
    if (email) {
      //@ts-ignore
      const { data, status } = await GetProducts(email) as {
        data: Array<Product>;
        status: number;
      };
      if (status === 200) {
        setLoading(false);
        return setProducts([...data]);
      }
      setLoading(false);
      return setProducts(null);
    }
    setLoading(false);
  }

  //@ts-ignore
  useEffect(() => {
    Products();
  }, []);

  useEffect(() => {
    console.log(products);
    console.log(isLoading)
  }, [products]);

  if (!isLoading && !products?.length) return <>NOt prodcut</>;

  if (!isLoading && products?.length)
    return (
      <>
        {products.map((product) => (
          <div
            className="p-4 bg-white shadow-lg dark:bg-gray-800 dark:bg-opacity-40 product-card font-[PoppinsMedium]"
            key={product?.id}
          >
            <img
              src={product?.images[0]?.slice(8)}
              alt="Dress Image"
              className="object-cover w-full mb-2 text-center rounded h-44 product-image"
            />
            <div className="product-details">
              <h2 className="text-xl font-semibold product-name dark:text-gray-200 font-[PoppinsMedium] tracking-wide line-clamp-1 w-full">
                {product?.name}
              </h2>
             
              <p className="text-sm product-description">
                {showFullDescription
                  ? product?.description
                  : `${product?.description.slice(0, 100)}${
                      product?.description.length > 100 ? '...' : ''
                    }`}
              </p>
              {product?.description.length > 200 && (
                <button
                  className="text-blue-500 "
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
              )}
              <p className="text-sm product-sizes">Available Sizes: {product?.sizes}</p>
              <p className="mt-2 text-sm font-bold text-gray-700 product-price dark:text-gray-200 font-[PoppinsMedium]">
                &#x20B9; {product?.price}
              </p>
            </div>
            
          </div>
        ))}
      </>
    );

  return <div className='flex items-center justify-center w-full h-screen'>
    
    <Loader />

</div>
}
