-- CreateTable
CREATE TABLE "GrowthEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "babyId" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "heightCm" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrowthEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GrowthEntry_userId_recordedAt_idx" ON "GrowthEntry"("userId", "recordedAt" DESC);

-- CreateIndex
CREATE INDEX "GrowthEntry_babyId_recordedAt_idx" ON "GrowthEntry"("babyId", "recordedAt" DESC);

-- AddForeignKey
ALTER TABLE "GrowthEntry" ADD CONSTRAINT "GrowthEntry_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE CASCADE ON UPDATE CASCADE;
