import React, { useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEAM, DELETE_TEAM } from "@/graphql/mutations";
import { GET_TEAMS } from "@/graphql/queries";
import Team from "@/components/Team";
import PokedexInput from "@/components/PokedexInput";

const TeamPage: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
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
  const { loading, error, data } = useQuery(GET_TEAMS);

  const handleCreateTeam = async (teamName: string) => {
    if (!teamName.trim()) {
      setShowWarning(true);
      return;
    }
    try {
      await createTeam({ variables: { name: teamName.trim() } });
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
        <h1>Equipes</h1>
        {showWarning && (
          <Alert variant="warning" className="team-warning-alert">
            Veuillez choisir un nom d'équipe.
          </Alert>
        )}
        <div className="page-input-form">
          <PokedexInput
            onSubmit={handleCreateTeam}
            placeholder="Entrer un nom d'équipe"
            icon="✏️"
            buttonText="+ Créer"
          />
        </div>
        {data?.teams?.map((team: any) => (
          <Team key={team.id} team={team} onDelete={handleDeleteTeam} />
        ))}
      </Col>
    </Row>
  );
};

export default TeamPage;
