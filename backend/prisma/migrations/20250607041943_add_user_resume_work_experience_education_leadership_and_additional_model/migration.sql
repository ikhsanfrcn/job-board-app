-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULLTIME', 'PARTTIME', 'CONTRACT', 'FREELANCE', 'SELFEMPLOYED', 'INTERN');

-- CreateEnum
CREATE TYPE "AdditionalCategory" AS ENUM ('TECHNICAL', 'LANGUAGE', 'INTERPERSONAL');

-- CreateTable
CREATE TABLE "UserResume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" TEXT,

    CONSTRAINT "UserResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "userResumeId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jobdescId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "userResumeId" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leadership" (
    "id" TEXT NOT NULL,
    "userResumeId" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Leadership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additional" (
    "id" TEXT NOT NULL,
    "userResumeId" TEXT NOT NULL,
    "category" "AdditionalCategory" NOT NULL,
    "items" TEXT[],
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Additional_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserResume" ADD CONSTRAINT "UserResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userResumeId_fkey" FOREIGN KEY ("userResumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_jobdescId_fkey" FOREIGN KEY ("jobdescId") REFERENCES "Jobdesc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userResumeId_fkey" FOREIGN KEY ("userResumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leadership" ADD CONSTRAINT "Leadership_userResumeId_fkey" FOREIGN KEY ("userResumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Additional" ADD CONSTRAINT "Additional_userResumeId_fkey" FOREIGN KEY ("userResumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
