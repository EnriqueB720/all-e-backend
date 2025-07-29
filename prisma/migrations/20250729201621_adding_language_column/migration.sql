-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('SPANISH', 'ENGLISH');

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "language" "public"."Language" NOT NULL DEFAULT 'ENGLISH';
