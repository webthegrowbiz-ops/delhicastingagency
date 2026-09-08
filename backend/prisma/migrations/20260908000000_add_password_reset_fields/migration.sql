-- AlterTable
ALTER TABLE "User" ADD COLUMN "passwordResetToken" TEXT,
ADD COLUMN "passwordResetExpires" TIMESTAMP(3),
ADD COLUMN "passwordResetRequired" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "User_passwordResetToken_idx" ON "User"("passwordResetToken");
