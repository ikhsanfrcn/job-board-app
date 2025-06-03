/*
  Warnings:

  - You are about to drop the column `salaryEnd` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salaryStart` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salaryEnd",
DROP COLUMN "salaryStart",
ADD COLUMN     "salaryMax" INTEGER,
ADD COLUMN     "salaryMin" INTEGER;
