-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "TransferRequests" (
    "id" SERIAL NOT NULL,
    "watch_id" INTEGER NOT NULL,
    "from_user_id" INTEGER NOT NULL,
    "to_user_id" INTEGER NOT NULL,
    "status" "TransferStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransferRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransferRequests" ADD CONSTRAINT "TransferRequests_watch_id_fkey" FOREIGN KEY ("watch_id") REFERENCES "Watchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequests" ADD CONSTRAINT "TransferRequests_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequests" ADD CONSTRAINT "TransferRequests_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
