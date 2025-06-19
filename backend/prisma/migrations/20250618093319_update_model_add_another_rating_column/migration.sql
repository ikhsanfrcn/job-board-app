/*
  Warnings:

  - You are about to drop the column `isCurrentEmployee` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - Added the required column `careerOpportunitiesRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cultureRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilitiesRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryEstimate` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workLifeBalanceRating` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "EmploymentType" ADD VALUE 'SEASONAL';

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "isCurrentEmployee",
DROP COLUMN "rating",
ADD COLUMN     "careerOpportunitiesRating" INTEGER NOT NULL,
ADD COLUMN     "cultureRating" INTEGER NOT NULL,
ADD COLUMN     "facilitiesRating" INTEGER NOT NULL,
ADD COLUMN     "salaryEstimate" TEXT NOT NULL,
ADD COLUMN     "workLifeBalanceRating" INTEGER NOT NULL;
