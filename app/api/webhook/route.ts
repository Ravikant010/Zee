import { Stripe } from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  console.log(signature + "signature");
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SEC as string
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Webhook Error" + err);
  }

  const sessions = event.data.object as Stripe.Checkout.Session;
  //@ts-ignore
  const { Address, zip, productId, city, email } = sessions?.metadata;
  console.log(sessions?.metadata);
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(Address, zip, productId, city, email);
  if (user) {
    if (event.type === "checkout.session.completed") {
      const order = await db.order.create({
        data: {
          productId: productId,
          buyerId: user?.id as string,
          zip: parseInt(zip),
          city: city,
          Address: Address,
          status: "Ordered",
        },
      });
      
      if (!order) {
        return new NextResponse("webhook error: missing metadata");
      }

      return Response.json({ data: order, status: 400 });
    }
    return Response.json(null, { status: 400 });
  }
  return Response.json(null, { status: 400 });
}
