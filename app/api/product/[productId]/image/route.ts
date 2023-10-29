import { join } from "path";
import { writeFile } from "fs";

import { mkdirSync } from "fs";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  const formData = await req.formData();
  const images_array = [
    formData.get("image0"),
    formData.get("image1"),
    formData.get("image2"),
    formData.get("image3"),
    formData.get("image4"),
  ];
  const shopId = formData.get("shop_id");
  console.log(shopId)
  const ProductId = formData.get("product_id");
  const email = formData.get("email");
  console.log(email);
  if (email) {
    const user = await db.user.findUnique({
      where: {
        email: email as string,
      },
      select: {
        id: true,
      },
    });
    if (!user) return Response.json("user not found", { status: 404 });
    const uploadDir = `./public/${user?.id}/${shopId}/${ProductId}`;
    if (shopId && ProductId && images_array && user) {
      try {
        for (let i = 0; i < images_array.length; i++) {
          const image: File = images_array[i] as File;
          if (!image) continue;
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          mkdirSync(uploadDir, { recursive: true });
        await  db.product.update({
            where:{
                id : ProductId as string
            },
            data:{
                images:{
                    push: `${uploadDir}/${image?.name}`
                }
            }
         })
         writeFile(`${uploadDir}/${image?.name}`, buffer, () => {});
        }
        return Response.json("image uploaded", { status: 200 });
      } catch (err) {
        console.log(err);
        return Response.error();
      }
    }
  }
  return Response.json("not received email", { status: 400 });
}
