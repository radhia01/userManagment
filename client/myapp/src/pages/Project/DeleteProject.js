import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../redux/actions/project";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetMessage } from "../../redux/reducer/user";

function DeleteProject({ project, setshowDeleteModal }) {
  const navigate = useNavigate();
  const {token}=useSelector(state=>state.user)
  const [projectName, setprojectName] = useState(null);
  const [showAlert, setshowAlert] = useState(false);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    seterror("");
    setprojectName(e.target.value);
  };
  const removeProj = (id) => {
    if (projectName === project.nom) {
      dispatch(deleteProject({id,token}));
      navigate("/projects");
    } else {
      seterror("Nom de projet incorrect");
      setshowAlert(true);
    }
  };

  const closeModal = () => {
    setshowDeleteModal(false);
  };

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  return (
    <div className="delete_project">
      <div className="modal show">
        <Modal.Dialog>
          <Modal.Header
            className="modal_header"
            closeButton
            onClick={closeModal}
          >
            Confimer la suppression de projet :{" "}
            <spam style={{ fontWeight: "bold", marginLeft: 10 }}>
              {" "}
              {project && project.nom}
            </spam>
          </Modal.Header>
          <Modal.Body className="modal_body">
            <Form.Group className="d-flex">
              <Form.Control
                className="m-2 input_text"
                onChange={handleChange}
                placeholder="Veuillez entrer le nom de projet "
              ></Form.Control>
              <Button
                className="mt-3 modal_confirm"
                onClick={() => removeProj(project._id)}
                style={{
                  width: "20%",
                  fontSize: 10,
                  fontWeight: "bold",
                  height: 30,
                }}
              >
                Confirmer{" "}
              </Button>
            </Form.Group>
          </Modal.Body>
        </Modal.Dialog>

        {showAlert && error && (
          <div className="d-flex  alert_error">
            <Alert
              variant="danger"
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", fontSize: 12, fontWeight: "bold" }}
            >
              {error}
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  className="alert_error_btn"
                  onClick={() => setshowAlert(false)}
                >
                  Ok
                </Button>
              </div>
            </Alert>
          </div>
        )}
      </div>
      {/* 
    
        */}
    </div>
  );
}

export default DeleteProject;
