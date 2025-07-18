-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchs" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "serial_num" INTEGER NOT NULL,
    "metadata_uri" TEXT NOT NULL,
    "lastSynced" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Watchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ownershiplogs" (
    "id" SERIAL NOT NULL,
    "watch_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ownershiplogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_wallet_address_key" ON "Users"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Watchs_owner_id_key" ON "Watchs"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Watchs_serial_num_key" ON "Watchs"("serial_num");

-- CreateIndex
CREATE UNIQUE INDEX "Watchs_metadata_uri_key" ON "Watchs"("metadata_uri");

-- CreateIndex
CREATE UNIQUE INDEX "Ownershiplogs_watch_id_key" ON "Ownershiplogs"("watch_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ownershiplogs_owner_id_key" ON "Ownershiplogs"("owner_id");

-- AddForeignKey
ALTER TABLE "Watchs" ADD CONSTRAINT "Watchs_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownershiplogs" ADD CONSTRAINT "Ownershiplogs_watch_id_fkey" FOREIGN KEY ("watch_id") REFERENCES "Watchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
