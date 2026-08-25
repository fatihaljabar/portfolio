-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "ipAddress" TEXT;

-- CreateIndex
CREATE INDEX "Message_ipAddress_idx" ON "Message"("ipAddress");
