-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_savedpost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallpaperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "savedpost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "savedpost_wallpaperId_fkey" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_savedpost" ("createdAt", "id", "userId", "wallpaperId") SELECT "createdAt", "id", "userId", "wallpaperId" FROM "savedpost";
DROP TABLE "savedpost";
ALTER TABLE "new_savedpost" RENAME TO "savedpost";
CREATE INDEX "savedpost_wallpaperId_idx" ON "savedpost"("wallpaperId");
CREATE INDEX "savedpost_userId_idx" ON "savedpost"("userId");
CREATE UNIQUE INDEX "savedpost_userId_wallpaperId_key" ON "savedpost"("userId", "wallpaperId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
