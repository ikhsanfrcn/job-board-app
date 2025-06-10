/*
  Warnings:

  - The `features` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "features",
ADD COLUMN     "features" TEXT[];
