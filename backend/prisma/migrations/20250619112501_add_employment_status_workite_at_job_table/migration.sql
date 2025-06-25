-- CreateEnum
CREATE TYPE "WorksiteType" AS ENUM ('ONSITE', 'HYBRID', 'REMOTE');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "employmentStatus" "EmploymentType",
ADD COLUMN     "worksite" "WorksiteType",
ALTER COLUMN "category" DROP NOT NULL;
