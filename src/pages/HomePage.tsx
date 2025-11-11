import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_POKEMON } from "@/graphql/queries";
import PokedexInput from "@/components/PokedexInput";
import CardDetails from "@/components/CardDetails";
import List from "@/components/List";

const HomePage: React.FC = () => {
  const [getPokemon, { data, loading, error }] = useLazyQuery(GET_POKEMON);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [revealedPokemonId, setRevealedPokemonId] = useState<number | null>(
    null
  );

  const handleSearch = (name: string) => {
    getPokemon({ variables: { name } });
  };

  useEffect(() => {
    if (data && data.pokemon) {
      localStorage.setItem(
        `isRevealed-${data.pokemon.pokedex_id}`,
        JSON.stringify(true)
      );
      setRevealedPokemonId(data.pokemon.pokedex_id);
      setModalShow(true);
    }
  }, [data]);

  return (
    <div className="mt-5">
      <h2 className="text-center">
        Rechercher par nom ou en cliquant sur une carte !
      </h2>
      <PokedexInput
        onSubmit={handleSearch}
        placeholder="Rechercher un Pokémon..."
        icon="🔍"
        buttonText="GO"
        buttonClassName="search-btn"
        containerClassName="search-container"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Pokemon not found - Error: {error.message}</p>}
      {data && (
        <div>
          <CardDetails
            show={modalShow}
            onHide={() => setModalShow(false)}
            pokemon={data.pokemon}
          />
        </div>
      )}
      <List pokemons={[]} revealedPokemonId={revealedPokemonId} />
    </div>
  );
};

export default HomePage;
