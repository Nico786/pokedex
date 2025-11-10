import React, { useState } from "react";
import { Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEAM, DELETE_TEAM } from "@/graphql/mutations";
import { GET_TEAMS } from "@/graphql/queries";
import Team from "@/components/Team";

const TeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [createTeam] = useMutation(CREATE_TEAM, {
    update(cache, { data }) {
      if (!data?.createTeam) return;
      const existing = cache.readQuery<{ teams: any[] }>({ query: GET_TEAMS });
      if (!existing) return;
      cache.writeQuery({
        query: GET_TEAMS,
        data: { teams: [...existing.teams, data.createTeam] },
      });
    },
  });
  const [deleteTeam] = useMutation(DELETE_TEAM, {
    update(cache, { data }) {
      const deletedId = data?.deleteTeam?.id;
      if (!deletedId) return;
      const existing = cache.readQuery<{ teams: any[] }>({ query: GET_TEAMS });
      if (!existing) return;
      cache.writeQuery({
        query: GET_TEAMS,
        data: { teams: existing.teams.filter((t) => t.id !== deletedId) },
      });
    },
  });
  const [showWarning, setShowWarning] = useState(false);
  const { loading, error, data } = useQuery(GET_TEAMS);

  const handleCreateTeam = async () => {
    if (teamName.trim() === "") {
      setShowWarning(true);
      return;
    }
    try {
      await createTeam({ variables: { name: teamName.trim() } });
      setTeamName("");
      setShowWarning(false);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleDeleteTeam = async (id: number) => {
    try {
      await deleteTeam({ variables: { id } });
    } catch (error) {
      console.error("Error deleting team:", error);
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
        {data?.teams?.map((team: any) => (
          <Team key={team.id} team={team} onDelete={handleDeleteTeam} />
        ))}
      </Col>
    </Row>
  );
};

export default TeamPage;
