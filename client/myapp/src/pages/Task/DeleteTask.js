import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/actions/tasks";
import "./style.css";
import "../Project/style.css";
function DeleteTask({ task, setshowDeleteModal }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [taskName, settaskName] = useState(null);
  const [showAlert, setshowAlert] = useState(false);
  const { priorities, message } = useSelector((state) => state.task);
  const [error, seterror] = useState("");
  const handleTaskName = (e) => {
    settaskName(e.target.value);
    seterror("");
  };
  const removeTask = (id) => {
    
    if (taskName === task.titre) {
      dispatch(deleteTask({ id,token }));
      setshowAlert(true);
    } else {
      seterror("Nom de tache incorrecte");
      setshowAlert(true);
    }
  };

  const closeModal = () => {
    setshowDeleteModal(false);
    document.getElementById("tasks").style.opacity = 1;
    document.getElementById("tasklists").style.opacity = 1;
    document.getElementById("task_card").style.opacity = 1;
  };
  const closeOKAlert = (e) => {
    setshowDeleteModal(false);
    document.getElementById("tasks").style.opacity = 1;
    document.getElementById("tasklists").style.opacity = 1;
    document.getElementById("task_card").style.opacity = 1;
  };

  return (
    <div className="delete_task">
      <div className="modal show">
        <Modal.Dialog>
          <Modal.Header
            className="modal_header"
            closeButton
            onClick={closeModal}
          >
            Confimer la suppression de tache :{" "}
            <spam style={{ fontWeight: "bold" }}>{task && task.titre}</spam>
          </Modal.Header>
          <Modal.Body className="modal_body">
            <Form.Group className="d-flex">
              <Form.Control
                style={{ fontSize: 12 }}
                className="m-2"
                onChange={handleTaskName}
                placeholder="veuiller entrer le nom de projet "
              ></Form.Control>
              <Button
                className="mt-3"
                onClick={() => removeTask(task._id)}
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
        {message && (
          <div className="d-flex justify-content-center">
            <Alert
              variant="success"
              className="d-flex justify-content-between align-items-center"
              style={{ width: "20%" }}
            >
              {message}
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  style={{ height: 30, fontSize: 10 }}
                  onClick={closeOKAlert}
                >
                  Ok
                </Button>
              </div>
            </Alert>
          </div>
        )}
        {showAlert && error && (
          <div className="d-flex justify-content-center">
            <Alert
              variant="danger"
              className="d-flex justify-content-between align-items-center"
              style={{ width: "30%", fontSize: 12, fontWeight: "bold" }}
            >
              {error}
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  style={{ height: 30, fontSize: 10 }}
                  onClick={() => alert("hey")}
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

export default DeleteTask;
