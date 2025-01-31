import React, { useState } from "react";
import { Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEAM } from "@/graphql/mutations";
import { GET_TEAMS } from "@/graphql/queries";
import Team from "@/components/Team";

const TeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [createTeam] = useMutation(CREATE_TEAM);
  const [showWarning, setShowWarning] = useState(false);
  const { loading, error, data } = useQuery(GET_TEAMS);

  const handleCreateTeam = async () => {
    if (teamName === "") {
      setShowWarning(true);
      return;
    }

    try {
      const { data } = await createTeam({ variables: { name: teamName } });
      console.log("Team created:", data.createTeam);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Row className="text-center justify-content-center">
      <Col>
        <h1 className="mt-3">Equipes</h1>
        {showWarning && (
          <Alert variant="warning">Veuillez choisir un nom d'équipe.</Alert>
        )}
        <Form.Group className="d-flex mx-auto justify-content-center">
          <Form.Control
            type="text"
            placeholder="Entrer un nom d'équipe"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            style={{ width: "20%" }}
          />
          <Button onClick={handleCreateTeam} className="mx-2">
            +
          </Button>
        </Form.Group>
        {data.teams.map((team: any) => (
          <Team key={team.id} team={team} />
        ))}
      </Col>
    </Row>
  );
};

export default TeamPage;
