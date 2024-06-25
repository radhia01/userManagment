import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../redux/actions/project";
import { resetMessage } from "../redux/reducer/project";

export default function DeleteModal({
  name,
  id,
  deleteModel,
  setdeleteModel,
  setshowForm,
}) {
  const [projectName, setprojectName] = useState("");
  const [ErrorMessage, setErrorMessage] = useState(false);
  // import from store
  const { message } = useSelector((state) => state.project);
  // usedispatch
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (projectName === name) {
      dispatch(deleteProject(id));
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };
  const removeMessage = () => {
    dispatch(resetMessage());
    setdeleteModel(false);
    setshowForm(false);
  };
  return (
    <div>
      {deleteModel && (
        <Modal.Dialog className="delete_Model shadow">
          <Modal.Header
            closeButton
            style={{ fontSize: "13px", color: "red" }}
            onClick={(e) => setdeleteModel(false)}
          >
            {" "}
            Suppression de projet
          </Modal.Header>
          <Modal.Body style={{ fontSize: "13px" }}>
            Veuillez entrez le nom de projet : {name}
            <Form>
              <Form.Control
                value={projectName}
                onChange={(e) => setprojectName(e.target.value)}
              ></Form.Control>
              {!message && (
                <Button
                  className="m-2"
                  style={{ fontSize: 10 }}
                  onClick={handleSubmit}
                >
                  Supprimer
                </Button>
              )}{" "}
            </Form>
          </Modal.Body>
          {message && (
            <div className="p-2">
              {" "}
              <Alert
                className="d-flex justify-content-start align-items-center h-1"
                style={{ height: "40px", fontSize: 10 }}
                variant="success"
              >
                {message}
              </Alert>{" "}
              <Button
                className="bg-white border-white text-black"
                onClick={removeMessage}
              >
                OK
              </Button>
            </div>
          )}
          {ErrorMessage && (
            <Alert
              className="d-flex justify-content-start align-items-center "
              style={{ height: "40px", fontSize: 10 }}
              variant="danger"
            >
              Veuillez verifier le nom de projet
            </Alert>
          )}
        </Modal.Dialog>
      )}
    </div>
  );
}
