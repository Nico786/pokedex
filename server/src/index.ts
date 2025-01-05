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
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world',
  },
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

