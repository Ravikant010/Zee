/*
  Warnings:

  - Made the column `shop_description` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "shop_description" SET NOT NULL;
