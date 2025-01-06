import { Pokemon } from "@/lib/types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Table } from "react-bootstrap";
import Stats from "./Stats";
import GeneralInfos from "./GeneralInfos";

interface CardDetailsProps {
  show: boolean;
  onHide: () => void;
  pokemon: Pokemon;
}

const CardDetails: React.FC<CardDetailsProps> = ({ show, onHide, pokemon }) => {
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
            <img
              src={pokemon.sprites.regular}
              alt={pokemon.name.fr}
              width={300}
            />
          </Col>
          <Col className="stats">
            <Stats stats={pokemon.stats} />
          </Col>
          <Col className="infos">
            <GeneralInfos
              height={pokemon.height}
              weight={pokemon.weight}
              types={pokemon.types}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default CardDetails;
