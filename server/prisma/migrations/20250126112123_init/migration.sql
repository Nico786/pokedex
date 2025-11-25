/*
  Warnings:

  - You are about to drop the column `isTeam` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `name` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_teamId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "isTeam",
DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TeamPokemon" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "TeamPokemon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokemonId") ON DELETE RESTRICT ON UPDATE CASCADE;
