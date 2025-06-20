-- AlterEnum
ALTER TYPE "ApplicationStatus" ADD VALUE 'ACCEPTED';

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
