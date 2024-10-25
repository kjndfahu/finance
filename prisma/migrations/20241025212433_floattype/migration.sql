-- DropForeignKey
ALTER TABLE "TopUpDeclined" DROP CONSTRAINT "TopUpDeclined_email_fkey";

-- DropForeignKey
ALTER TABLE "TopUpDeclined" DROP CONSTRAINT "TopUpDeclined_operationsHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawDeclined" DROP CONSTRAINT "WithdrawDeclined_email_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawOperations" DROP CONSTRAINT "WithdrawOperations_email_fkey";

-- DropIndex
DROP INDEX "User_login_balance_key";

-- AlterTable
ALTER TABLE "Deposits" ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Referrals" ALTER COLUMN "totalAmount" SET DEFAULT 0,
ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TopUpDeclined" ALTER COLUMN "sum" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TopUpOperations" ALTER COLUMN "sum" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TopUpRequest" ALTER COLUMN "sum" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WithdrawDeclined" ALTER COLUMN "sum" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WithdrawOperations" ALTER COLUMN "sum" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WithdrawRequest" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "WithdrawOperations" ADD CONSTRAINT "WithdrawOperations_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawDeclined" ADD CONSTRAINT "WithdrawDeclined_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpDeclined" ADD CONSTRAINT "TopUpDeclined_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpDeclined" ADD CONSTRAINT "TopUpDeclined_operationsHistoryId_fkey" FOREIGN KEY ("operationsHistoryId") REFERENCES "OperationsHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
