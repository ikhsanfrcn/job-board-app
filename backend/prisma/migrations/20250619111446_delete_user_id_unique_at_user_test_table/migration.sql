/*
  Warnings:

  - Changed the type of `employmentStatus` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "UserTest_userId_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "employmentStatus",
ADD COLUMN     "employmentStatus" "EmploymentType" NOT NULL;
