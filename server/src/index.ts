import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { PokedexAPI } from './pokedex-api';
import { resolvers } from './resolvers';

interface ContextValue {
  dataSources: {
    pokedexAPI: PokedexAPI;
  };
}

const typeDefs = gql`
  type Query {
    pokemons: [Pokemon]!
    pokemon(name: String!): Pokemon
    teams: [Team]!
  }

  type Mutation {
    addPokemon(pokedex_id: Int!): Pokemon
    createTeam(name: String!): Team
    deleteTeam(id: Int!): Team
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

  type Team {
    id: Int!
    name: String!
    pokemons: [Pokemon]
  }
`;

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

