import React from "react";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Success from "../../components/Success";

// import actions
import { getUsers } from "../../redux/actions/user";
import {
  addProject,
  updateProject,
  getUsersFromProject,
  getProjects,
} from "../../redux/actions/project";
import { resetMessage,resetError } from "../../redux/reducer/project";

import { getStatus } from "../../redux/actions/status";
function ProjectForm({ currentId, setshow }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.task);
  const { message } = useSelector((state) => state.project);
  const { token } = useSelector((state) => state.user);
  const project = useSelector((state) =>
    currentId ? state.project.projects.find((el) => el._id === currentId) : null
  );
  const [projectDetails, setprojectDetails] = useState({
    nom: "",
    description: "",
    dateCreation: new Date(),
    dateEcheance: new Date(),
    status: "654cedce4177a26f57f164c5",
  });
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  // functions

  const handleChange = (e) => {
    setprojectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value,
    });
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentId) {
      dispatch(addProject({ project: projectDetails, token }));
    } else {
      dispatch(
        updateProject({
          idproject: project._id,
          project: projectDetails,
          token,
        })
      );
    }
  };

  // useEffect
  useEffect(() => {
    currentId && setprojectDetails(project);
  }, []);
  useEffect(() => {
    if (showDeleteModal)
      document.getElementById("project_details").style.opacity = 0.1;
  }, [showDeleteModal]);
  useEffect(() => {
    dispatch(getUsers(token));
    dispatch(getStatus(token));
    dispatch(resetMessage());
    dispatch(resetError())
    dispatch(getProjects(token));
  }, [dispatch]);
  useEffect(() => {
    currentId && dispatch(getUsersFromProject({id:project._id,token}));
  }, [dispatch]);
  const closeModal = () => {
    setshow(false);
    dispatch(resetMessage());
  };

  return (
    <div className="add_edit">
      <div className="modal ">
        <Form onSubmit={handleSubmit}>
          <Modal.Dialog>
            <Modal.Header closeButton onClick={closeModal}>
              <Modal.Title className="header_title">
                {currentId
                  ? `Mettre à jour le  projet : ${project.nom}`
                  : `Ajouter un nouveau projet`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal_body">
              <>
                <Col md={12}>
                  {" "}
                  <Form.Group>
                    <div className="label">
                      <Form.Label>Titre</Form.Label>
                    </div>
                    <Form.Control
                      className="input_text"
                      type="text"
                      required
                      name="nom"
                      onChange={handleChange}
                      defaultValue={project && project.nom}
                      placeholder="ajouter un titre au projet"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={10}>
                  <Form.Group>
                    <div className="label">
                      <Form.Label>Description</Form.Label>
                    </div>
                    <Form.Control
                      className="text_area"
                      type="text"
                      as="textarea"
                      rows={8}
                      name="description"
                      onChange={handleChange}
                      required
                      defaultValue={project && project.description}
                      placeholder="ajouter une petite description au projet"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </>

              <div className="d-flex  justify-content-between">
                <Col md={5}>
                  {" "}
                  <Form.Group>
                    <div className="label">
                      <Form.Label>Date Echeance</Form.Label>
                    </div>
                    <DatePicker
                      className="calendar"
                      selected={
                        currentId
                          ? new Date(projectDetails.dateEcheance)
                          : projectDetails.dateEcheance
                      }
                      onChange={(date) =>
                        setprojectDetails({
                          ...projectDetails,
                          dateEcheance: date,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                {currentId && (
                  <Col md={5}>
                    {" "}
                    <Form.Group>
                      <Form.Label className="label">Statut</Form.Label>
                      <Form.Select
                        value={projectDetails.status}
                        onChange={(e) =>
                          setprojectDetails({
                            ...projectDetails,
                            status: e.target.value,
                          })
                        }
                      >
                        {status &&
                          status.map((el) => {
                            return (
                              
                                <option value={el._id}>{el.titre}</option>
                            
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" className="add_btn " type="submit">
                {currentId ? "Mettre à jour" : "Ajouter"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      </div>

      {message && <Success message={message} />}
    </div>
  );
}

export default ProjectForm;
