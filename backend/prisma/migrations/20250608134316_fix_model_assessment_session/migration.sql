-- AddForeignKey
ALTER TABLE "AssessmentSession" ADD CONSTRAINT "AssessmentSession_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "SkillAssessmentTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
