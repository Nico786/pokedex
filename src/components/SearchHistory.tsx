import React from "react";
import { Pokemon } from "@/lib/types";
import { Col, Row } from "react-bootstrap";

interface SearchHistoryProps {
  pokemons: Pokemon[];
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ pokemons }) => {
  return (
    <div>
      <h2>Historique</h2>
      <Row className="search-history">
        {pokemons.map((pokemon, index) => (
          <Col xs={4} md={3} lg={1} key={index} className="pokemon-card">
            <img
              src={pokemon.sprites.regular}
              alt={pokemon.name.fr}
              width={150}
            />
            <span>{pokemon.name.fr}</span>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default SearchHistory;
