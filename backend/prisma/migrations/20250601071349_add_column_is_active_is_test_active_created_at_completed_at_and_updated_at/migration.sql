/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserTest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isTestActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserTest" ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserTest_userId_key" ON "UserTest"("userId");
