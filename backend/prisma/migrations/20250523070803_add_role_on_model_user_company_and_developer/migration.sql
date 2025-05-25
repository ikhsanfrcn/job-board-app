-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'company';

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'developer';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
