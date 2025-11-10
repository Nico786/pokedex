import { Pokemon } from "@/lib/types";
import React, { useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Button } from "react-bootstrap";
import Stats from "./Stats";
import GeneralInfos from "./GeneralInfos";
import Sprite from "./Sprite";
import TeamPicker from "./TeamPicker";

interface CardDetailsProps {
  show: boolean;
  onHide: () => void;
  pokemon: Pokemon;
}

const CardDetails: React.FC<CardDetailsProps> = ({ show, onHide, pokemon }) => {
  const [showTeamPicker, setShowTeamPicker] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const newTeamPokemon = useMemo(
    () => ({
      id: pokemon.pokedex_id,
      name: pokemon.name.fr,
      sprite: pokemon.sprites.regular,
    }),
    [pokemon]
  );

  const openTeamPicker = () => setShowTeamPicker(true);
  const closeTeamPicker = () => setShowTeamPicker(false);
  const toggleShiny = () => setIsShiny(!isShiny);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
        className={showTeamPicker ? "blurred-modal" : ""}
        backdrop={showTeamPicker ? false : true}
      >
        <Modal.Header closeButton>
          <div className="d-flex align-items-center w-100">
            <Modal.Title id="contained-modal-title-vcenter">
              <span>
                N°{pokemon.pokedex_id}: {pokemon.name.fr}
              </span>
            </Modal.Title>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleShiny}
              className="sprite-toggle-btn"
            >
              {isShiny ? "✨ Shiny" : "Normal"}
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row className="modal-content">
            <Col className="sprite text-center">
              <Sprite
                src={isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular}
                alt={pokemon.name.fr}
                width={300}
              />
            </Col>
            <button
              className="custom-btn add-to-team-btn"
              onClick={openTeamPicker}
            >
              Ajouter à une équipe
            </button>
            <Col className="infos">
              <GeneralInfos
                height={pokemon.height}
                weight={pokemon.weight}
                types={pokemon.types}
              />
            </Col>
            <Col className="stats">
              <Stats stats={pokemon.stats} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <TeamPicker
        show={showTeamPicker}
        onHide={closeTeamPicker}
        pokemon={newTeamPokemon}
      />
    </>
  );
};

export default CardDetails;
