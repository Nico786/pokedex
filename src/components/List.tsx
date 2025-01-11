import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/graphql/queries";
import Card from "./Card";
import { Pokemon } from "@/lib/types";
import { Col, Row } from "react-bootstrap";
import CardDetails from "./CardDetails";

type ListProps = {
  pokemons: Pokemon[];
};

const List: React.FC<ListProps> = () => {
  const { data, loading, error, refetch } = useQuery(GET_POKEMONS, {
    fetchPolicy: "cache-first",
  });

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, []);

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedPokemon(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Row>
      {data.pokemons.map((pokemon: Pokemon, index: number) => (
        <Col xs={6} md={4} lg={3} xl={1} key={index}>
          <Card
            key={index}
            pokemon={pokemon}
            onClick={() => handleCardClick(pokemon)}
          />
        </Col>
      ))}
      {selectedPokemon && (
        <CardDetails
          show={showDetails}
          onHide={handleCloseDetails}
          pokemon={selectedPokemon}
        />
      )}
    </Row>
  );
};

export default List;
