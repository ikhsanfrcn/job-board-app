/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_transactionId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_externalId_key" ON "Transaction"("externalId");

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("externalId") ON DELETE SET NULL ON UPDATE CASCADE;
