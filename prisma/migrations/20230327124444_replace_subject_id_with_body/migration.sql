/*
  Warnings:

  - The primary key for the `subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `subjects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_subjectId_fkey";

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "subjectId" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "subjects_pkey" PRIMARY KEY ("body");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("body") ON DELETE RESTRICT ON UPDATE CASCADE;
