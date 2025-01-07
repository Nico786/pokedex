import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/graphql/queries";
import { Pokemon } from "@/lib/types";

const List: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POKEMONS);

  return (
    <div>
      <h1 className="text-center">Pokedex</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.pokedex_id}>
              <span>{pokemon.pokedex_id}</span>
              <span>{pokemon.name.fr}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
