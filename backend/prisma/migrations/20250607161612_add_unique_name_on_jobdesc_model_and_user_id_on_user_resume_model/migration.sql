/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Jobdesc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserResume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jobdesc_name_key" ON "Jobdesc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_userId_key" ON "UserResume"("userId");
