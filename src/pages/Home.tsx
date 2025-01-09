import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_POKEMON } from "@/graphql/queries";
import { Pokemon } from "@/lib/types";
import InputField from "@/components/InputField";
import CardDetails from "@/components/CardDetails";
import SearchHistory from "@/components/SearchHistory";

const Home = () => {
  const [getPokemon, { data, loading, error }] = useLazyQuery(GET_POKEMON);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<Pokemon[]>([]);

  const handleSearch = (name: string) => {
    getPokemon({ variables: { name } });
    if (data && data.pokemon) {
      const pokemon: Pokemon = data.pokemon;
      setModalShow(true);
      setSearchHistory([...searchHistory, pokemon]);
    }
  };

  return (
    <div className="mt-5">
      <InputField onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Pokemon not found - Error: {error.message}</p>}
      {data && (
        <div>
          <CardDetails
            show={modalShow}
            onHide={() => setModalShow(false)}
            pokemon={data.pokemon}
          />
          <SearchHistory pokemons={searchHistory as Pokemon[]} />
        </div>
      )}
    </div>
  );
};

export default Home;
