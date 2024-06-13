-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'DATA_MANAGER', 'STAFF');

-- CreateEnum
CREATE TYPE "StageTypes" AS ENUM ('NameGenerator', 'Sociogram', 'DyadCensus', 'TieStrengthCensus', 'Narrative', 'Information', 'CategoricalBin', 'OrdinalBin', 'AlterForm', 'AlterEdgeForm', 'EgoForm');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" SERIAL NOT NULL,
    "configured" BOOLEAN NOT NULL DEFAULT false,
    "initializedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "allowAnonymousRecruitment" BOOLEAN NOT NULL DEFAULT false,
    "limitInterviews" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "publicId" VARCHAR(12) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',

    CONSTRAINT "StudyUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Protocol" (
    "id" SERIAL NOT NULL,
    "publicId" VARCHAR(12) NOT NULL,
    "studyId" TEXT NOT NULL,

    CONSTRAINT "Protocol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProtocolRevision" (
    "id" TEXT NOT NULL,
    "revision" SERIAL NOT NULL,
    "protocolId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProtocolRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "publicId" VARCHAR(12) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StageTypes" NOT NULL,
    "protocolRevisionId" INTEGER NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "publicId" VARCHAR(12) NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "protocolRevisionId" INTEGER NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Study_publicId_key" ON "Study"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Study_name_key" ON "Study"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Study_slug_key" ON "Study"("slug");

-- CreateIndex
CREATE INDEX "Study_publicId_idx" ON "Study"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Protocol_publicId_key" ON "Protocol"("publicId");

-- CreateIndex
CREATE INDEX "Protocol_publicId_idx" ON "Protocol"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "ProtocolRevision_revision_key" ON "ProtocolRevision"("revision");

-- CreateIndex
CREATE INDEX "ProtocolRevision_revision_idx" ON "ProtocolRevision"("revision");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_publicId_key" ON "Stage"("publicId");

-- CreateIndex
CREATE INDEX "Stage_publicId_idx" ON "Stage"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_publicId_key" ON "Interview"("publicId");

-- CreateIndex
CREATE INDEX "Interview_publicId_idx" ON "Interview"("publicId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyUser" ADD CONSTRAINT "StudyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyUser" ADD CONSTRAINT "StudyUser_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("publicId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Protocol" ADD CONSTRAINT "Protocol_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("publicId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProtocolRevision" ADD CONSTRAINT "ProtocolRevision_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "Protocol"("publicId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_protocolRevisionId_fkey" FOREIGN KEY ("protocolRevisionId") REFERENCES "ProtocolRevision"("revision") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_protocolRevisionId_fkey" FOREIGN KEY ("protocolRevisionId") REFERENCES "ProtocolRevision"("revision") ON DELETE CASCADE ON UPDATE CASCADE;
