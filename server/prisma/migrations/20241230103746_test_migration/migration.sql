/*
  Warnings:

  - The primary key for the `Pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `pokedex_id` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `height` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCaught` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isShiny` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTeam` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUnknown` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pokedexId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_pkey",
DROP COLUMN "id",
DROP COLUMN "pokedex_id",
ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "isCaught" BOOLEAN NOT NULL,
ADD COLUMN     "isShiny" BOOLEAN NOT NULL,
ADD COLUMN     "isTeam" BOOLEAN NOT NULL,
ADD COLUMN     "isUnknown" BOOLEAN NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "pokedexId" INTEGER NOT NULL,
ADD COLUMN     "pokemonId" SERIAL NOT NULL,
ADD COLUMN     "teamId" INTEGER,
ADD COLUMN     "weight" TEXT NOT NULL,
ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("pokemonId");

-- CreateTable
CREATE TABLE "Sprite" (
    "spriteId" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Sprite_pkey" PRIMARY KEY ("spriteId")
);

-- CreateTable
CREATE TABLE "Type" (
    "typeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "Stat" (
    "statId" SERIAL NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "vit" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("statId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" SERIAL NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprite" ADD CONSTRAINT "Sprite_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokemonId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokemonId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stat" ADD CONSTRAINT "Stat_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokemonId") ON DELETE RESTRICT ON UPDATE CASCADE;
