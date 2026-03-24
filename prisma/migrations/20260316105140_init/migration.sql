-- CreateEnum
CREATE TYPE "MemoryCategory" AS ENUM (
    'FIRST_SMILE',
    'FIRST_TOOTH',
    'FIRST_STEPS',
    'FIRST_WORD',
    'DOCTOR_VISIT',
    'PHOTO_MEMORY',
    'MILESTONE'
);

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "MemoryCategory" NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowthEntry" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "heightCm" DOUBLE PRECISION NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrowthEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Memory_childId_eventDate_idx" ON "Memory"("childId", "eventDate");

-- CreateIndex
CREATE INDEX "GrowthEntry_childId_recordedAt_idx" ON "GrowthEntry"("childId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "GrowthEntry_childId_recordedAt_key" ON "GrowthEntry"("childId", "recordedAt");

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowthEntry" ADD CONSTRAINT "GrowthEntry_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
