"use client";
import React, { useEffect, useState } from "react";
import { Activity, Boxes, DollarSign, Eye, LayoutGrid } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Icon from "@/app/_components/Icon";
import total_sales from "./_actions/totalSales";
import getInventory from "./_actions/getInventory";
import LineChartCP from "./_components/lineChart";
import Loader from "@/components/loader";
type Props = {};

export default function page({}: Props) {
  const [totalInvetory, setTotalInventory] = useState(0);
  const [totalOrders, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [total_products, setTotalProduct] = useState(0);
  const [category, setCategory] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [orders_, setOrders_] = useState();
  async function handleSales() {
    //@ts-ignore
    const {
      order_price,
      product_price,
      percentage,
      total_products,
      category,
      orders_,
    } = await total_sales();
    // console.log(order_price, product_price, percentage, category);
    setTotalRevenue(order_price);
    setTotalSales(Math.round(percentage));
    setTotalProduct(total_products);
    setCategory(category?.length);
    setOrders_(orders_);
  }

  async function handleInventory() {
    const res = await getInventory();
    setTotalOrder(res?.totalOrders);
    setTotalInventory(res?.totalInventory);
  }

  async function handleState() {
    await handleSales();
    await handleInventory();

    setLoading(false);
  }
  useEffect(() => {
    handleState();
  }, []);
  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        <Loader />
      </div>
    );
  return (
    <main className="p-2 space-y-2 font-[ApfelFett] tracking-wide text-xl lg:max-w-screen-xl mx-auto">
      <section className="grid w-full h-32 grid-cols-2 gap-2 lg:h-52">
        <div className="flex flex-col justify-around w-full h-full p-2 dark:bg-gray-800 dark:bg-opacity-30 rounded-xl lg:rounded-none">
          <Icon Icon={Activity} size={26} classname=" dark:text-purple-500" />

          <div>
            {" "}
            <h1>Total Sales</h1>
            <h2>{totalSales}%</h2>
          </div>
        </div>
        <div className="flex flex-col justify-around w-full h-full p-2 dark:bg-gray-800 dark:bg-opacity-30 rounded-xl lg:rounded-none">
          <div>
            <Icon Icon={Boxes} size={26} classname="dark:text-purple-500 " />
          </div>
          <div>
            <h1>Total Products</h1>
            <h2>{total_products}</h2>
          </div>
        </div>
      </section>

      <section className="grid w-full h-32 grid-cols-2 gap-2">
        <div className="flex flex-col justify-around w-full h-full p-2 dark:bg-gray-800 dark:bg-opacity-30 rounded-xl lg:rounded-none">
          <Icon Icon={DollarSign} size={26} classname=" dark:text-purple-500" />
          <div>
            <h1>Revenue</h1>
            <h2>{totalRevenue}</h2>
          </div>
        </div>
        <div className="flex flex-col justify-around w-full h-full p-2 dark:bg-gray-800 dark:bg-opacity-30 rounded-xl lg:rounded-none">
          <Icon Icon={LayoutGrid} size={26} classname="dark:text-purple-500 " />

          <h1>Total Categories</h1>
          <h2>{category}</h2>
        </div>
      </section>

      <section className="grid w-full grid-cols-1 h-52 dark:bg-gray-800 dark:bg-opacity-30 rounded-xl ">
        <div className="w-full h-full p-2 rounded-xl">
          <h1>Sales Growth</h1>
          <div className="w-full overflow-y-hidden h-44">
            <LineChartCP orders={orders_} />
          </div>
        </div>
      </section>

      <section className="grid w-full grid-cols-2 h-52 dark:bg-gray-800 dark:bg-opacity-30 dark:text-purple-500">
        <div className="flex flex-col w-full h-full p-2 pt-5 rounded-xl lg:rounded-none">
          <h1 className="border-b-2 border-purple-800 ">Total Inventory </h1>
          <h2 className="mt-5 text-white">{totalInvetory}</h2>
        </div>

        <div className="flex flex-col w-full h-full p-2 pt-5 rounded-xl lg:rounded-none">
          <h1 className="border-b-2 border-purple-800 ">Stock </h1>
          <h2 className="mt-5 text-white">{totalInvetory - totalOrders}</h2>
        </div>
      </section>
    </main>
  );
}
