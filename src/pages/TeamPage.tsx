import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "@/graphql/mutations";
import Team from "@/components/Team";

const TeamPage: React.FC = () => {
  const [createTeam] = useMutation(CREATE_TEAM);

  const handleCreateTeam = async () => {
    try {
      const { data } = await createTeam({ variables: { name: "New Team" } });
      console.log("Team created:", data.createTeam);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <Row>
      <Col>
        <h1 className="text-center mt-3">Vos équipes</h1>
        <Button onClick={handleCreateTeam} className="mb-3">
          +
        </Button>
        <Team />
      </Col>
    </Row>
  );
};

export default TeamPage;
