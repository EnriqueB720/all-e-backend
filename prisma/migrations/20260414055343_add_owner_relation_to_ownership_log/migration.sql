-- CreateEnum
CREATE TYPE "MintStatus" AS ENUM ('PENDING', 'MINTED', 'FAILED');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_expiry" TIMESTAMP(3),
ALTER COLUMN "wallet_address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Watchs" ADD COLUMN     "mint_status" "MintStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "token_id" TEXT,
ADD COLUMN     "tx_hash" TEXT;

-- AddForeignKey
ALTER TABLE "Ownershiplogs" ADD CONSTRAINT "Ownershiplogs_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
