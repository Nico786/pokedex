import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TEAMS } from "@/graphql/queries";
import { ADD_POKEMON_TO_TEAM } from "@/graphql/mutations";

interface TeamPickerProps {
  show: boolean;
  onHide: () => void;
  pokemon: {
    id: number;
    name: string;
    sprite: string;
  };
}

const TeamPicker: React.FC<TeamPickerProps> = ({ show, onHide, pokemon }) => {
  const { data } = useQuery(GET_TEAMS);
  const [addPokemonToTeam] = useMutation(ADD_POKEMON_TO_TEAM);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddToTeam = async (teamId: number) => {
    setError(null);
    setSuccess(null);
    try {
      await addPokemonToTeam({
        variables: {
          teamId,
          pokemonId: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprite,
        },
        update(cache, { data: mutationData }) {
          const updatedTeam = mutationData?.addPokemonToTeam;
          if (!updatedTeam) return;
          const existing = cache.readQuery<{ teams: any[] }>({
            query: GET_TEAMS,
          });
          if (!existing) return;
          cache.writeQuery({
            query: GET_TEAMS,
            data: {
              teams: existing.teams.map((t) =>
                t.id === updatedTeam.id ? updatedTeam : t
              ),
            },
          });
        },
      });
      setSuccess(`${pokemon.name} ajouté avec succès !`);
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (e: any) {
      setError(e.message || "Erreur lors de l'ajout");
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="team-picker-modal"
      centered
      show={show}
      onHide={onHide}
      className="team-picker-modal"
      backdrop="static"
      backdropClassName="team-picker-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title id="team-picker-modal">
          Sélectionner une équipe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(error || success) && (
          <div className="row mb-3">
            <div className="col-12">
              {error && (
                <Alert
                  variant="danger"
                  onClose={() => setError(null)}
                  dismissible
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert
                  variant="success"
                  onClose={() => setSuccess(null)}
                  dismissible
                >
                  {success}
                </Alert>
              )}
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12">
            {data?.teams?.length ? (
              <div className="team-picker-list">
                {data.teams.map((team: any) => {
                  const isFull = team.pokemons.length >= 6;
                  const hasPokemon = team.pokemons.some(
                    (p: any) => p.id === pokemon.id
                  );
                  return (
                    <div
                      key={team.id}
                      className={`team-tile ${
                        isFull || hasPokemon ? "disabled" : ""
                      }`}
                      role="button"
                      tabIndex={isFull || hasPokemon ? -1 : 0}
                      onClick={() =>
                        !isFull && !hasPokemon && handleAddToTeam(team.id)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isFull && !hasPokemon)
                          handleAddToTeam(team.id);
                      }}
                    >
                      <div className="team-tile-header">
                        <span className="team-tile-name">{team.name}</span>
                        {isFull ? (
                          <span className="team-tile-status full">
                            Complète
                          </span>
                        ) : hasPokemon ? (
                          <span className="team-tile-status has">
                            Déjà ajouté
                          </span>
                        ) : (
                          <span className="team-tile-action">Ajouter</span>
                        )}
                      </div>
                      <div className="team-tile-count">
                        {team.pokemons.length} / 6 Pokémon
                      </div>
                      <div className="team-tile-sprites">
                        {Array.isArray(team.pokemons) &&
                        team.pokemons.length > 0 ? (
                          team.pokemons.map((p: any, idx: number) => {
                            const src = p.sprite ?? p?.sprites?.regular;
                            const alt =
                              p.name?.fr ?? p.name ?? `pokemon-${idx}`;
                            return (
                              <img
                                key={(p.id ?? p.pokedex_id ?? idx) + "-sprite"}
                                src={src}
                                alt={alt}
                                className="team-sprite"
                              />
                            );
                          })
                        ) : (
                          <span className="team-empty">Aucun Pokémon</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-teams">
                Aucune équipe trouvée. Créez une équipe d'abord !
              </p>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TeamPicker;
