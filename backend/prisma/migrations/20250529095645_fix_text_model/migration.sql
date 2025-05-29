/*
  Warnings:

  - A unique constraint covering the columns `[jobId]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "questions" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Test_jobId_key" ON "Test"("jobId");
