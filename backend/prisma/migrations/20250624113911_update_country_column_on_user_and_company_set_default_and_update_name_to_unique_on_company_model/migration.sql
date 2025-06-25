/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "country" SET DEFAULT 'Indonesia';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "country" SET DEFAULT 'Indonesia';

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
