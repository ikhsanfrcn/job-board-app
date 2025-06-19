-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('PreferNotToSay', 'Male', 'Female');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" "Gender" DEFAULT 'PreferNotToSay',
    "dob" TEXT,
    "education" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "regionNumber" TEXT,
    "phoneNumber" TEXT,
    "avatar" TEXT DEFAULT 'https://res.cloudinary.com/dbq88i6pk/image/upload/v1744257650/profile-default-icon-512x511-v4sw4m29_cyf3m5.png',
    "isVerify" BOOLEAN NOT NULL DEFAULT false,
    "verificationSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "about" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "regionNumber" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "website" TEXT,
    "logo" TEXT DEFAULT 'https://res.cloudinary.com/dbq88i6pk/image/upload/v1744257650/profile-default-icon-512x511-v4sw4m29_cyf3m5.png',
    "isVerify" BOOLEAN NOT NULL DEFAULT false,
    "industryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "salary" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobdesc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Jobdesc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_website_key" ON "Company"("website");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_name_key" ON "Industry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
