import { Pokemon } from "@/lib/types";
import React, { useEffect, useState } from "react";
import pokeball from "@/assets/images/pokeball.png";

type CardProps = {
  pokemon: Pokemon;
  onClick?: () => void;
  forceReveal?: boolean;
};

const Card: React.FC<CardProps> = ({ pokemon, onClick, forceReveal }) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    const savedState = localStorage.getItem(`isRevealed-${pokemon.pokedex_id}`);
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      `isRevealed-${pokemon.pokedex_id}`,
      JSON.stringify(isRevealed)
    );
  }, [isRevealed, pokemon.pokedex_id]);

  useEffect(() => {
    if (forceReveal && !isRevealed) {
      setIsRevealed(true);
    }
  }, [forceReveal]);

  const handleClick = () => {
    setIsRevealed(true);
    if (onClick) {
      onClick();
    }
  };

  const src = isRevealed ? pokemon.sprites.regular : pokeball;
  const name = isRevealed ? pokemon.name.fr : "?";

  return (
    <div>
      <div
        className={`pokemon-card ${isRevealed ? "card-revealed" : ""}`}
        onClick={handleClick}
      >
        <img
          src={src}
          alt={pokemon.name.fr}
          width={100}
          className="img-fluid"
        />
        <p>
          n°{pokemon.pokedex_id}
          <br />
          {name}
        </p>
      </div>
    </div>
  );
};

export default Card;
