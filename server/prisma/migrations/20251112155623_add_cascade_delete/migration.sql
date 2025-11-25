-- DropForeignKey
ALTER TABLE "TeamPokemon" DROP CONSTRAINT "TeamPokemon_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "TeamPokemon" DROP CONSTRAINT "TeamPokemon_teamId_fkey";

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
