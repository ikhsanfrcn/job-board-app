-- CreateTable
CREATE TABLE "SelfAssessmentTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "passingScore" INTEGER NOT NULL DEFAULT 75,
    "totalPoints" INTEGER NOT NULL DEFAULT 100,
    "timeLimit" INTEGER NOT NULL DEFAULT 1800,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelfAssessmentTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelfAssessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL,
    "isPassed" BOOLEAN NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelfAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "timeRemaining" INTEGER NOT NULL,
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "answers" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentSession_sessionToken_key" ON "AssessmentSession"("sessionToken");

-- AddForeignKey
ALTER TABLE "SelfAssessment" ADD CONSTRAINT "SelfAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfAssessment" ADD CONSTRAINT "SelfAssessment_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "SelfAssessmentTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentSession" ADD CONSTRAINT "AssessmentSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
