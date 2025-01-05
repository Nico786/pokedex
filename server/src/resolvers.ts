const resolvers = {
  Query: {
    pokemons: async (_, __, { dataSources }) => {
      return dataSources.pokedexAPI.getPokemons();
    },
    pokemon: async (_, { name }, { dataSources }) => {
      return dataSources.pokedexAPI.getPokemon(name);
    }
  }
};
exports.resolvers = resolvers;