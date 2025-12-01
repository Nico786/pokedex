import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
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

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors({
    origin: 'http://pokemon.local',
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          pokedexAPI: new PokedexAPI({ cache }),
        },
      };
    },
  })
);

const PORT = 4000;
await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log(`🚀  Server ready at: http://localhost:${PORT}/graphql`);

