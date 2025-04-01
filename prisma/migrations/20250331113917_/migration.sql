-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "isEnded" BOOLEAN NOT NULL DEFAULT false;
