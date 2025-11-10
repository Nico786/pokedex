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

export const DELETE_TEAM = gql`
  mutation deleteTeam($id: Int!) {
    deleteTeam(id: $id) {
      id
    }
  }
`;

export const ADD_POKEMON_TO_TEAM = gql`
  mutation addPokemonToTeam($teamId: Int!, $pokemonId: Int!, $name: String!, $sprite: String!) {
    addPokemonToTeam(teamId: $teamId, pokemonId: $pokemonId, name: $name, sprite: $sprite) {
      id
      name
      pokemons {
        id
        name
        sprite
      }
    }
  }
`;