import { cn } from '@/lib/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartCP({orders}:{
  orders: Array<any>
}) {
  const [extractedPrice, setExtracedPrice] = useState()
function handleOrders(){
  let extractPrice = orders.map(e=> e?.product)
  console.log(extractPrice)
  setExtracedPrice(extractPrice)
}

useEffect(()=>{
  handleOrders()
}, [])
  return (
    <ResponsiveContainer width="100%" height={"100%"} className={cn("bg-none")}>
    <LineChart data={extractedPrice} className={"bg-none"}>

    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey={"price"} stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>
</ResponsiveContainer>
  );
}
