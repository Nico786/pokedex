import { Pokemon } from "@/lib/types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Stats from "./Stats";
import GeneralInfos from "./GeneralInfos";
import Sprite from "./Sprite";
import { useMutation } from "@apollo/client";
import { CATCH_POKEMON } from "@/graphql/mutations";

interface CardDetailsProps {
  show: boolean;
  onHide: () => void;
  pokemon: Pokemon;
}

const CardDetails: React.FC<CardDetailsProps> = ({ show, onHide, pokemon }) => {
  const [catchPokemon] = useMutation(CATCH_POKEMON);

  const handleCatchPokemon = async () => {
    try {
      await catchPokemon({ variables: { pokedex_id: pokemon.pokedex_id } });
      console.log("Pokemon added to team!");
    } catch (error) {
      console.error("Error adding Pokemon to team:", error);
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
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
          <button onClick={handleCatchPokemon}>Add to Team</button>
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
  );
};

export default CardDetails;
