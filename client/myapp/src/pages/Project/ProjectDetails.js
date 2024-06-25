import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/actions/project";
import ProjectForm from "./ProjectForm";
import ParticipantsList from "./ParticipantsList";
import TaskList from "../Task/TaskList";
import Error from "../../components/Error";
import { resetMessage } from "../../redux/reducer/project";
import DeleteProject from "./DeleteProject";
import { resetError } from "../../redux/reducer/project";
function ProjectDetails() {
  const { id } = useParams();
  const [showProjectDetails, setshowProjectDetails] = useState(false);
  const [showParticipants, setshowParticipants] = useState(false);
  const [showTasks, setshowTasks] = useState(false);
  const [showDeleteTaskModel, setshowDeleteTaskModel] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const { token } = useSelector((state) => state.user);
  const {error}=useSelector(state=>state.project)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects(token));
    dispatch(resetMessage());
    dispatch(resetError())
  }, [dispatch]);

  const project = useSelector(
    id ? (state) => state.project.projects.find((el) => el._id === id) : null
  );
  const handleShowProjectDetails = () => {
    setshowProjectDetails(true);
    setshowParticipants(false);
    setshowTasks(false);
  };
  const handleshowParticipants = () => {
    setshowProjectDetails(false);
    setshowParticipants(true);
    setshowTasks(false);
  };
  const handleshowTasks = () => {
    setshowProjectDetails(false);
    setshowParticipants(false);
    setshowTasks(true);
  };
  const handleShowRemoveProject = () => {
    setshowDeleteModal(true);
    dispatch(resetMessage());
    setshowParticipants(false);
    setshowTasks(false);
  };

  return (
    <div>
      <div
        className={` ${
          showDeleteModal || addTask || showDeleteTaskModel
            ? "project_details_dark"
            : "projects_details"
        }`}
      >
        <Row className="d-flex m-3">
          {" "}
          <Col
            className="d-flex   align-items-center justify-content-end"
            md={6}
          >
            <h4>Mettre à jour le projet :</h4>
          </Col>
          <Col
            className="d-flex  align-items-center   justify-content-start text-danger"
            Col
            md={6}
          >
            <h5>{project && project.nom}</h5>
          </Col>
        </Row>
        <Row>
          <Col
            md={6}
            className=" fw-bold d-flex justify-content-end align-items-center"
          >
            Crée le : {project && project.dateCreation.slice(0, 10)}
          </Col>
        </Row>
        <hr></hr>
        <div className="d-flex  justify-content-center align-items-center">
          {" "}
          <Button className=" m-2 btn2 " onClick={handleShowProjectDetails}>
            Mettre à jour le projet
          </Button>
          <Button className=" m-2 btn2" onClick={handleshowParticipants}>
            Les participants
          </Button>
          <Button className=" m-2 btn2" onClick={handleshowTasks}>
            Les Taches
          </Button>
          <Button className=" m-2 btn2" onClick={handleShowRemoveProject}>
            Supprimer le projet
          </Button>
        </div>
        <hr style={{ fontSize: 20 }}></hr>
      </div>

      <div>
        {showProjectDetails && (
          <ProjectForm setshow={setshowProjectDetails} currentId={id} />
        )}
      </div>
      {showTasks && (
        <TaskList
          idproject={id}
          addTask={addTask}
          setAddTask={setAddTask}
          showDeleteTaskModel={showDeleteTaskModel}
          setshowDeleteTaskModel={setshowDeleteTaskModel}
        />
      )}
      <Row className="">
        {showParticipants && <ParticipantsList id={id} project={project} />}
      </Row>
      {showDeleteModal && (
        <DeleteProject
          project={project}
          setshowDeleteModal={setshowDeleteModal}
        />
      )}
      {error && <Error message={error}/>}
    </div>
  );
}

export default ProjectDetails;
