import React from "react";
import { Button, Card } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
function Project({ project }) {
  const navigate = useNavigate();
  const showDetails = (id) => {
    navigate(`/project/details/${id}`);
  };
  return (
    <div>
      <Card className="m-3">
        <Card.Header>{project && project.nom}</Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center">
          {" "}
          <Button
            className="btn_details d-flex justify-content-center align-items-center"
            onClick={() => showDetails(project._id)}
          >
            Voir détails
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Project;
