-- CreateTable
CREATE TABLE "acronym" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "definition" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "acronym.text_unique" ON "acronym"("text");
