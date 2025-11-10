import { Pokemon } from "@/lib/types";
import React, { useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
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
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              N°{pokemon.pokedex_id}: {pokemon.name.fr}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="modal-content">
            <Col className="sprite text-center">
              <Sprite
                regularSrc={pokemon.sprites.regular}
                shinySrc={pokemon.sprites.shiny}
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
