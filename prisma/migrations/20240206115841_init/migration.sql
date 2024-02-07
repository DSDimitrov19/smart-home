-- CreateTable
CREATE TABLE "Door" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'opened',
    "updatedAt" DATETIME NOT NULL
);
