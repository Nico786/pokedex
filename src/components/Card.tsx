import React from "react";

type CardProps = {
  pokedex_id: number;
  name: string;
  sprite: string;
};

const Card: React.FC<CardProps> = ({ pokedex_id, name, sprite }) => {
  return (
    <div>
      <div className="pokemon-card">
        <img src={sprite} alt={name} width={100} className="img-fluid" />
        <p>
          n°{pokedex_id}
          <br />
          {name}
        </p>
      </div>
    </div>
  );
};

export default Card;
