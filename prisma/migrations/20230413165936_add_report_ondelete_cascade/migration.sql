-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_messageId_fkey";

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
