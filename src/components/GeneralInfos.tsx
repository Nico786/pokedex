import React from "react";
import { Table } from "react-bootstrap";
import { type Type } from "@/lib/types";

type GeneralInfosProps = {
  height: number;
  weight: number;
  types: Type[];
};

const GeneralInfos: React.FC<GeneralInfosProps> = ({
  height,
  weight,
  types,
}) => {
  return (
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>Taille</td>
          <td>{height}</td>
        </tr>
        <tr>
          <td>Poids</td>
          <td>{weight}</td>
        </tr>
        <tr>
          <td>{types.length > 1 ? "Types" : "Type"}</td>
          <td>
            {types.map((type, index) => (
              <img
                key={index}
                src={type.image}
                alt={type.name}
                className="mx-2"
              />
            ))}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default GeneralInfos;
