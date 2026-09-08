-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('APPLICATION_SUBMITTED', 'APPLICATION_SHORTLISTED', 'APPLICATION_SELECTED', 'APPLICATION_REJECTED', 'NEW_APPLICATION', 'CASTING_APPROVED', 'CASTING_REJECTED', 'ARTIST_PROFILE_APPROVED', 'ARTIST_PROFILE_REJECTED', 'PAYMENT_SUCCESSFUL', 'SYSTEM');

-- AlterTable
ALTER TABLE "CastingCall" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "compensation" TEXT,
ADD COLUMN     "isClosed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenVersion" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMfa" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mfaSecret" TEXT,
    "mfaEnrolledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMfa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMfaBackupCode" (
    "id" TEXT NOT NULL,
    "adminMfaId" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminMfaBackupCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevokedToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RevokedToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AdminMfa_userId_key" ON "AdminMfa"("userId");

-- CreateIndex
CREATE INDEX "AdminMfaBackupCode_adminMfaId_idx" ON "AdminMfaBackupCode"("adminMfaId");

-- CreateIndex
CREATE UNIQUE INDEX "RevokedToken_tokenHash_key" ON "RevokedToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RevokedToken_userId_idx" ON "RevokedToken"("userId");

-- CreateIndex
CREATE INDEX "RevokedToken_expiresAt_idx" ON "RevokedToken"("expiresAt");

-- CreateIndex
CREATE INDEX "Application_artistId_idx" ON "Application"("artistId");

-- CreateIndex
CREATE INDEX "Application_castingCallId_status_idx" ON "Application"("castingCallId", "status");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "ArtistProfile_verificationStatus_idx" ON "ArtistProfile"("verificationStatus");

-- CreateIndex
CREATE INDEX "BrandProfile_verificationStatus_idx" ON "BrandProfile"("verificationStatus");

-- CreateIndex
CREATE INDEX "CastingCall_approvalStatus_isClosed_idx" ON "CastingCall"("approvalStatus", "isClosed");

-- CreateIndex
CREATE INDEX "CastingCall_brandId_idx" ON "CastingCall"("brandId");

-- CreateIndex
CREATE INDEX "CastingCall_category_idx" ON "CastingCall"("category");

-- CreateIndex
CREATE INDEX "CastingCall_submittedAt_idx" ON "CastingCall"("submittedAt");

-- CreateIndex
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminMfa" ADD CONSTRAINT "AdminMfa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminMfaBackupCode" ADD CONSTRAINT "AdminMfaBackupCode_adminMfaId_fkey" FOREIGN KEY ("adminMfaId") REFERENCES "AdminMfa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevokedToken" ADD CONSTRAINT "RevokedToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
