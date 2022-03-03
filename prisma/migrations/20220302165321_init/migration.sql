/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "network" JSONB,
    "protocolId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);
