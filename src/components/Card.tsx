import { Pokemon } from "@/lib/types";
import React from "react";

type CardProps = {
  pokemon: Pokemon;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ pokemon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <div className="pokemon-card" onClick={handleClick}>
        <img
          src={pokemon.sprites.regular}
          alt={pokemon.name.fr}
          width={100}
          className="img-fluid"
        />
        <p>
          n°{pokemon.pokedex_id}
          <br />
          {pokemon.name.fr}
        </p>
      </div>
    </div>
  );
};

export default Card;
