import { Pokemon } from "@/lib/types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Table } from "react-bootstrap";
import StatsGraph from "./StatsGraph";

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
          <Col className="sprite">
            <img src={pokemon.sprites.regular} alt={pokemon.name.fr} />
          </Col>
          <Col className="stats">
            <StatsGraph stats={pokemon.stats} />
          </Col>
          <Col className="infos">
            <h3>Informations générales</h3>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Height</td>
                  <td>{pokemon.height}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{pokemon.weight}</td>
                </tr>
                {pokemon.types.map((type) => (
                  <tr key={type.name}>
                    <td>Type</td>
                    <td>
                      <img src={type.image} alt={type.name} />
                      <span>{type.name}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default CardDetails;
