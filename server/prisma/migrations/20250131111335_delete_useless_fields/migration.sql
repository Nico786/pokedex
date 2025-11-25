/*
  Warnings:

  - The primary key for the `Pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `height` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `isCaught` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `isShiny` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `isUnknown` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `pokedexId` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonId` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Pokemon` table. All the data in the column will be lost.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teamId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Sprite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sprite` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sprite" DROP CONSTRAINT "Sprite_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "Stat" DROP CONSTRAINT "Stat_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "TeamPokemon" DROP CONSTRAINT "TeamPokemon_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "TeamPokemon" DROP CONSTRAINT "TeamPokemon_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Type" DROP CONSTRAINT "Type_pokemonId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_pkey",
DROP COLUMN "height",
DROP COLUMN "isCaught",
DROP COLUMN "isShiny",
DROP COLUMN "isUnknown",
DROP COLUMN "level",
DROP COLUMN "pokedexId",
DROP COLUMN "pokemonId",
DROP COLUMN "weight",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "sprite" TEXT NOT NULL,
ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "teamId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Sprite";

-- DropTable
DROP TABLE "Stat";

-- DropTable
DROP TABLE "Type";

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
