-- CreateEnum
CREATE TYPE "BasketStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Basket" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Foodstuff',
ADD COLUMN     "commodityType" TEXT,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "regularTopUp" DOUBLE PRECISION,
ADD COLUMN     "status" "BasketStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "targetDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Basket_userId_idx" ON "Basket"("userId");

-- CreateIndex
CREATE INDEX "Basket_status_idx" ON "Basket"("status");

-- CreateIndex
CREATE INDEX "Transaction_basketId_idx" ON "Transaction"("basketId");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");
