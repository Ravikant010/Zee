/*
  Warnings:

  - Added the required column `City` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL;
