-- AlterTable
ALTER TABLE "Payment" ADD COLUMN IF NOT EXISTS "gateway" TEXT NOT NULL DEFAULT 'RAZORPAY',
ADD COLUMN IF NOT EXISTS "payuTxnId" TEXT,
ADD COLUMN IF NOT EXISTS "payuPaymentId" TEXT,
ADD COLUMN IF NOT EXISTS "payuMode" TEXT,
ADD COLUMN IF NOT EXISTS "payuStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Payment_payuTxnId_key" ON "Payment"("payuTxnId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Payment_gateway_idx" ON "Payment"("gateway");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Payment_payuTxnId_idx" ON "Payment"("payuTxnId");
