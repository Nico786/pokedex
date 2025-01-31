import { gql } from '@apollo/client';

export const CATCH_POKEMON = gql`
  mutation addPokemon($pokemonId: Int!) {
    addPokemon(pokemonId: $pokemonId) {
      id
      pokemonId
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`;