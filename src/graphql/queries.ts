import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons {
      pokedex_id
      name {
        fr
      }
      weight
      height
      sprites {
        regular
        shiny
      }
      types {
        name
        image
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
      pokedex_id
      name {
        fr
      }
      weight
      height
      sprites {
        regular
        shiny
      }
      types {
        name
        image
      }
      stats {
        atk
        def
        vit
      }
    }
  }
`;

export const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      name
      pokemons {
        pokedex_id
        name{
          fr
        }
        sprites{
          regular
        }
      }
    }
  }
`;