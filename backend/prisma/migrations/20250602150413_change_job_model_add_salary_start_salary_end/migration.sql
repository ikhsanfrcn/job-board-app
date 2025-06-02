/*
  Warnings:

  - You are about to drop the column `salary` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salary",
ADD COLUMN     "salaryEnd" TEXT,
ADD COLUMN     "salaryStart" TEXT;
