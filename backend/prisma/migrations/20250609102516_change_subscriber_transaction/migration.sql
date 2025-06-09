/*
  Warnings:

  - You are about to drop the column `subscriberId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `Subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_subscriberId_fkey";

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "subscriberId";

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
