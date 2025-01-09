import { Pokemon } from "@/lib/types";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface SearchHistoryProps {
  pokemons: { name: string; sprite: string }[];
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ pokemons }) => {
  //console log les pokemons
  console.log(pokemons);
  return (
    <div>
      <h2>Historique</h2>
      <Row className="search-history">
        {pokemons.map((pokemon, index) => (
          <Col xs={4} md={3} lg={1} key={index} className="pokemon-card">
            <img src={pokemon.sprite} alt={pokemon.name} width={150} />
            <span>{pokemon.name}</span>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default SearchHistory;
