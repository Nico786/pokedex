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
      return await prisma.team.findMany({
        include: {
          pokemons: true,
        },
      });
    },
  },
  Mutation: {
    // addPokemon: async (_, { pokedex_id }) => {
    //   console.log("POKEMON NUMERO", pokedex_id);
    //   const newTeamMember = await prisma.team.create({
    //     data: {
    //       pokemons: {
    //         name: "string",
    //       },
    //     },
    //   });
    //   return newTeamMember;
    // },
    createTeam: async (_, { name }) => {
      try {
        const newTeam = await prisma.team.create({
          data: { name },
        });
        return newTeam;
      } catch (error) {
        console.error("Error creating team:", error);
        throw new Error("Failed to create team");
      }
    },
    deleteTeam: async (_, { id }) => {
      try {
        const deleted = await prisma.team.delete({ where: { id } });
        return deleted;
      } catch (error) {
        console.error("Error deleting team:", error);
        throw new Error("Failed to delete team");
      }
    },
  },
};