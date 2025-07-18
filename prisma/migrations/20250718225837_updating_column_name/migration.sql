/*
  Warnings:

  - You are about to drop the column `lastSynced` on the `Watchs` table. All the data in the column will be lost.
  - Added the required column `last_synced` to the `Watchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watchs" DROP COLUMN "lastSynced",
ADD COLUMN     "last_synced" TIMESTAMP(3) NOT NULL;
