import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { PokedexAPI } from './pokedex-api.js';
import { resolvers } from './resolvers.js';

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
    createTeam(name: String!): Team
    deleteTeam(id: Int!): Team
    addPokemonToTeam(teamId: Int!, pokemonId: Int!, name: String!, sprite: String!): Team
    removePokemonFromTeam(teamId: Int!, pokemonId: Int!): Team
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

  type TeamMember {
    id: Int!
    name: String!
    sprite: String!
  }

  type Team {
    id: Int!
    name: String!
    pokemons: [TeamMember]!
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

