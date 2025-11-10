import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    pokemons: async (_, __, { dataSources }) => {
      return dataSources.pokedexAPI.getPokemons();
    },
    pokemon: async (_, { name }, { dataSources }) => {
      return dataSources.pokedexAPI.getPokemon(name);
    },
    teams: async () => {
      const teams = await prisma.team.findMany({
        include: {
          pokemons: { include: { pokemon: true } },
        },
      });
      return teams.map((t) => ({
        id: t.id,
        name: t.name,
        pokemons: t.pokemons.map((tp) => ({
          id: tp.pokemon.id,
          name: tp.pokemon.name,
          sprite: tp.pokemon.sprite,
        })),
      }));
    },
  },
  Mutation: {
    createTeam: async (_, { name }) => {
      try {
        const newTeam = await prisma.team.create({ data: { name } });
        return { id: newTeam.id, name: newTeam.name, pokemons: [] };
      } catch (error) {
        console.error("Error creating team:", error);
        throw new Error("Failed to create team");
      }
    },
    deleteTeam: async (_, { id }) => {
      try {
        const deleted = await prisma.team.delete({ where: { id } });
        return { id: deleted.id, name: deleted.name, pokemons: [] };
      } catch (error) {
        console.error("Error deleting team:", error);
        throw new Error("Failed to delete team");
      }
    },
    addPokemonToTeam: async (_, { teamId, pokemonId, name, sprite }) => {
      try {
        // Check current team size
        const currentTeam = await prisma.team.findUnique({
          where: { id: teamId },
          include: { pokemons: true },
        });

        if (!currentTeam) {
          throw new Error("Team not found");
        }

        // Check if pokemon already in team
        const alreadyExists = currentTeam.pokemons.some(
          (tp) => tp.pokemonId === pokemonId
        );
        if (alreadyExists) {
          throw new Error("Ce Pokémon est déjà dans cette équipe");
        }

        // Check team size limit
        if (currentTeam.pokemons.length >= 6) {
          throw new Error("L'équipe est complète (maximum 6 Pokémon)");
        }

        await prisma.pokemon.upsert({
          where: { id: pokemonId },
          update: { name, sprite },
          create: { id: pokemonId, name, sprite },
        });

        await prisma.teamPokemon.create({
          data: { teamId, pokemonId },
        });

        const updatedTeam = await prisma.team.findUnique({
          where: { id: teamId },
          include: { pokemons: { include: { pokemon: true } } },
        });

        return {
          id: updatedTeam!.id,
          name: updatedTeam!.name,
          pokemons: updatedTeam!.pokemons.map((tp) => ({
            id: tp.pokemon.id,
            name: tp.pokemon.name,
            sprite: tp.pokemon.sprite,
          })),
        };
      } catch (error) {
        console.error("Error adding pokemon to team:", error);
        throw error;
      }
    },
  },
};