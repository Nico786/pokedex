import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons {
      id
      name
      weight
      height
      sprites {
        regular
        shiny
      }
      types {
        name
      }
      stats {
        atk
        def
        vit
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      weight
      height
      sprites {
        regular
        shiny
      }
      types {
        name
      }
      stats {
        atk
        def
        vit
      }
    }
  }
`;