-- CreateTable
CREATE TABLE "SiteProfile" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "photoUrl" TEXT,
    "greetingEn" TEXT NOT NULL,
    "greetingId" TEXT NOT NULL,
    "basedInEn" TEXT NOT NULL,
    "basedInId" TEXT NOT NULL,
    "introEn" TEXT NOT NULL,
    "introId" TEXT NOT NULL,
    "aboutContentEn" TEXT NOT NULL,
    "aboutContentId" TEXT NOT NULL,
    "bestRegardsEn" TEXT NOT NULL,
    "bestRegardsId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteProfile_pkey" PRIMARY KEY ("id")
);
