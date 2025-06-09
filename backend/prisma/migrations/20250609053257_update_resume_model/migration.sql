/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Additional` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Additional" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Leadership" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
