// import { Stripe } from "@stripe/stripe-js"
import server from "@/lib/API";
import { db } from "@/lib/db";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});
export async function POST(req: Request) {
  const {Address, zip, productId,city,  email } = await req.json();
const GetProduct = await db.product.findUnique({
    where: {
        id: productId
    }
})
if(GetProduct)
      try {
        const line_items = await stripe.checkout.sessions.create({
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: "INR",
                product_data: {
                  name: GetProduct?.name,
                  description: GetProduct?.name
                },
                unit_amount: Math.round(GetProduct?.price! * 100),
              },
            },
          ],
          mode: "payment",
          success_url: `${process.env.STRIPE_REDIRECT_BASE_URL}/order/product/${GetProduct.id}/?success=true`,
          cancel_url: `${process.env.STRIPE_REDIRECT_BASE_URL}/order/product/${GetProduct.id}/?cancel=false`,
          metadata: {
            Address, zip, productId,city,  email
          },
        });
        return Response.json({ url: line_items.url });
      } catch (err) {
        console.log("Course Id Checkout", err);
        return Response.error();
      }
    }

