-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "questions" JSONB NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "scorePercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
