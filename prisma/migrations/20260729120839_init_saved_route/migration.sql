-- CreateTable
CREATE TABLE "saved_routes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "savingAmount" INTEGER NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_routes_pkey" PRIMARY KEY ("id")
);
