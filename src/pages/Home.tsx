import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import InputField from "@/components/InputField";
import { GET_POKEMON } from "@/graphql/queries";
import CardDetails from "@/components/CardDetails";
import SearchHistory from "@/components/SearchHistory";

const Home = () => {
  const [getPokemon, { data, loading, error }] = useLazyQuery(GET_POKEMON);
  const [modalShow, setModalShow] = useState(false);
  const [searchHistory, setSearchHistory] = useState<
    { name: string; sprite: string }[]
  >([]);

  const handleSearch = (name: string) => {
    getPokemon({ variables: { name } });
    if (data && data.pokemon) {
      const pokemon = data.pokemon;
      setModalShow(true);
      setSearchHistory((prevSearch) => [
        ...prevSearch,
        { name: pokemon.name.fr, sprite: pokemon.sprites.regular },
      ]);
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
          <SearchHistory pokemons={searchHistory} />
        </div>
      )}
    </div>
  );
};

export default Home;
