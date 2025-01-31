import React from "react";

export interface TeamProps {
  team: {
    id: number;
    name: string;
    pokemons: {
      id: number;
      name: string;
      sprite: string;
    }[];
  };
}

const Team: React.FC<TeamProps> = ({ team }) => {
  return (
    <div className="team">
      <h2>{team.name}</h2>
      <div className="pokemons">
        {team.pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon">
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
