/*
  Warnings:

  - The primary key for the `TeamPokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TeamPokemon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeamPokemon" DROP CONSTRAINT "TeamPokemon_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TeamPokemon_pkey" PRIMARY KEY ("teamId", "pokemonId");
