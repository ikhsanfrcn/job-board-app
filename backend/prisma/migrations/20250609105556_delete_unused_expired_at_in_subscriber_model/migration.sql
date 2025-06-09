/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Subscriber` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceUrl` on the `Subscriber` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscriber" DROP COLUMN "expiredAt",
DROP COLUMN "invoiceUrl";
