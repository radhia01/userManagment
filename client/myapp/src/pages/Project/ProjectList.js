import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/actions/project";
import { Button, Row, Col } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";
import AddIcon from "@mui/icons-material/Add";
function ProjectList() {
  const { projects } = useSelector((state) => state.project);
  const { token } = useSelector((state) => state.user);
  const [show, setshow] = useState(false);
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects(token));
  }, [dispatch]);
  const showAddModal = () => {
    setshow(true);
    setcurrentId(null);
  };
  return (
    <div>
      <div id="projects" className={`${show ? "projects_dark" : "projects"}`}>
        {" "}
        <Row className="d-flex justify-content-between align-items-center m-3">
          <Col md={6} className="title d-flex justify-content-start">
            Liste des Projets{" "}
          </Col>
          <Col md={6} className="d-flex justify-content-end align-items-center">
            <Button className="add_btn " onClick={showAddModal}>
              {" "}
              <AddIcon className="add_icon" />
              Ajouter un nouveau projet{" "}
            </Button>
          </Col>
        </Row>
        <Row>
          {" "}
          {projects &&
            projects.map((element) => {
              return (
                <Col md={3} key={element._id}>
                  <ProjectItem
                    project={element}
                    setshow={setshow}
                    setcurrentId={setcurrentId}
                  />
                </Col>
              );
            })}
        </Row>
      </div>

      {show && <ProjectForm setshow={setshow} currentId={currentId} />}
    </div>
  );
}

export default ProjectList;
