import React from "react";
import Sprite from "./Sprite";

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
  onDelete?: (id: number) => void;
}

const Team: React.FC<TeamProps> = ({ team, onDelete }) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'équipe « ${team.name} » ?`
      )
    ) {
      onDelete?.(team.id);
    }
  };

  return (
    <div className="team">
      <button
        type="button"
        className="delete-btn"
        aria-label={`Supprimer l'équipe ${team.name}`}
        title="Supprimer l'équipe"
        onClick={handleDelete}
      >
        ×
      </button>
      <h2 className="team-title">{team.name}</h2>
      <div className="pokemons">
        {team.pokemons.length > 0 ? (
          team.pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon">
              <Sprite src={pokemon.sprite} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          ))
        ) : (
          <p className="no-pokemon-message">
            Ajoutez des pokémon depuis le pokédex !
          </p>
        )}
      </div>
    </div>
  );
};

export default Team;
