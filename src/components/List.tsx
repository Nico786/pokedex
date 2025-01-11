import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/graphql/queries";
import Card from "./Card";
import { Pokemon } from "@/lib/types";
import { Col, Row } from "react-bootstrap";

type ListProps = {
  pokemons: Pokemon[];
};

const List: React.FC<ListProps> = () => {
  const { data, loading, error, refetch } = useQuery(GET_POKEMONS, {
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Row>
      {data.pokemons.map((pokemon: Pokemon, index: number) => (
        <Col xs={6} md={4} lg={3} xl={1} key={index}>
          <Card
            key={index}
            pokedex_id={pokemon.pokedex_id}
            name={pokemon.name.fr}
            sprite={pokemon.sprites.regular}
          />
        </Col>
      ))}
    </Row>
  );
};

export default List;
