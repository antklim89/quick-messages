/*
  Warnings:

  - You are about to drop the column `subjectId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `subjectBody` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_subjectId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "subjectId",
ADD COLUMN     "subjectBody" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_subjectBody_fkey" FOREIGN KEY ("subjectBody") REFERENCES "subjects"("body") ON DELETE RESTRICT ON UPDATE CASCADE;
