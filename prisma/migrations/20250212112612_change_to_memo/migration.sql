/*
  Warnings:

  - You are about to drop the column `description` on the `memo` table. All the data in the column will be lost.
  - Added the required column `memo` to the `memo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_memo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "memo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "memo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_memo" ("createdAt", "createdBy", "id", "updatedAt", "updatedBy", "userId") SELECT "createdAt", "createdBy", "id", "updatedAt", "updatedBy", "userId" FROM "memo";
DROP TABLE "memo";
ALTER TABLE "new_memo" RENAME TO "memo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
