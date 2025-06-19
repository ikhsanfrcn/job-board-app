-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_transactionId_fkey";

-- AlterTable
ALTER TABLE "Subscriber" ALTER COLUMN "transactionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
