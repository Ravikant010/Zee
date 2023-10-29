/*
  Warnings:

  - You are about to drop the column `City` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Shop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shop_name]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shop_address` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_city` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_name` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Shop_name_key";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "City",
DROP COLUMN "address",
DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "shop_address" TEXT NOT NULL,
ADD COLUMN     "shop_city" TEXT NOT NULL,
ADD COLUMN     "shop_description" TEXT,
ADD COLUMN     "shop_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shop_name_key" ON "Shop"("shop_name");
