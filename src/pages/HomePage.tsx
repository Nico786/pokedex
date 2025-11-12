import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
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
    <Row className="text-center justify-content-center">
      <Col>
        <h1>Rechercher par nom ou en cliquant sur une carte !</h1>
        <div className="page-input-form">
          <PokedexInput
            onSubmit={handleSearch}
            placeholder="Rechercher un Pokémon..."
            icon="🔍"
            buttonText="GO"
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Pokemon not found - Error: {error.message}</p>}
        <List pokemons={[]} revealedPokemonId={revealedPokemonId} />
      </Col>
    </Row>
  );
};

export default HomePage;
