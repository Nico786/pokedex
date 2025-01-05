import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { PokedexAPI } from './pokedex-api';

interface ContextValue {
  dataSources: {
    pokedexAPI: PokedexAPI;
  };
}

const typeDefs = gql`
  type Query {
    pokemons: [Pokemon]!
    pokemon(name: String!): Pokemon
  }

  type Pokemon {
    pokedex_id: Int!
    name: Name!
    weight: String
    height: String
    sprites: Sprite
    types: [Type]
    stats: Stat
  }

  type Name {
    fr: String!
  }

  type Sprite {
    regular: String
    shiny: String
  }

  type Type {
    name: String
    image: String
  }

  type Stat {
    atk: Int
    def: Int
    vit: Int
  }
`;

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

const server = new ApolloServer<ContextValue>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {

  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        pokedexAPI: new PokedexAPI({ cache }),
      },
    };
  }
});

console.log(`🚀  Server ready at: ${url}`);

