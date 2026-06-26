-- CreateTable
CREATE TABLE "savedpost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallpaperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "savedpost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "savedpost_wallpaperId_fkey" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "savedpost_wallpaperId_idx" ON "savedpost"("wallpaperId");

-- CreateIndex
CREATE INDEX "savedpost_userId_idx" ON "savedpost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "savedpost_userId_wallpaperId_key" ON "savedpost"("userId", "wallpaperId");
