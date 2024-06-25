import React from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import actions
import { getPriorities } from "../../redux/actions/Priority";
import { getUsers } from "../../redux/actions/user";
import { getStatus } from "../../redux/actions/status";
import { getUsersFromProject } from "../../redux/actions/project";
import { resetMessage } from "../../redux/reducer/task";
// import components
import Success from "../../components/Success";
function TaskForm({
  addTask,
  setAddTask,
  idproject,
  setshowAddTask,
  setshowUpdateModal,
  currentId,
  setcurrentId,
  handleUpdateTask,
}) {
  const dispatch = useDispatch();

  const [showCalendar, setshowCalendar] = useState(false);

  const { priorities, message, status } = useSelector((state) => state.task);

  const { users, token } = useSelector((state) => state.user);

  const { participants } = useSelector((state) => state.project);

  const tache = useSelector((state) =>
    currentId ? state.task.tasks.find((el) => el._id === currentId) : null
  );

  const [task, settask] = useState({
    titre: "",
    description: "",
    status: "654cedce4177a26f57f164c5",
    priorite: "",
    echeance: new Date(),
    projet: idproject,
    utilisateur: null,
  });

  useEffect(() => {
    dispatch(getPriorities(token));
    dispatch(getStatus(token));
    dispatch(getUsers(token));
    dispatch(resetMessage());
    dispatch(getUsersFromProject({ id: idproject, token }));
  }, [dispatch]);
  useEffect(() => {
    currentId && settask(tache);
  }, [currentId]);

  const closeModal = () => {
    dispatch(resetMessage());
    if (currentId) {
      setcurrentId(null);
      setshowUpdateModal(false);
      setAddTask(false);
    } else {
      setshowAddTask(false);
      setAddTask(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      handleUpdateTask({ id: currentId, data: task ,token});
    } else {
      console.log(task);
      addTask(task);
    }
  };

  return (
    <div className="task_form">
      <div className="modal show">
        <Modal.Dialog>
          <Modal.Header closeButton onClick={closeModal}>
            <Modal.Title className="header_title">
              {currentId
                ? "Mettre à jour une tache"
                : "Ajouter une nouvelle tache   "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="m-2">
                <Form.Label className="label">Titre</Form.Label>
                <Form.Control
                  className="input_text"
                  type="text"
                  name="titre"
                  required
                  value={task && task.titre}
                  onChange={(e) => settask({ ...task, titre: e.target.value })}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label className="label">Description</Form.Label>
                <Form.Control
                  className="input_text"
                  as="textarea"
                  rows={6}
                  name="description"
                  value={task && task.description}
                  onChange={(e) =>
                    settask({ ...task, description: e.target.value })
                  }
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group className=" m-2 d-flex justify-content-between">
                <Form.Label className="label">Echéance</Form.Label>
                {!showCalendar && !currentId && (
                  <Button
                    className="add_btn "
                    onClick={(e) => setshowCalendar(true)}
                  >
                    Ajouter une date
                  </Button>
                )}
                {(showCalendar || currentId) && (
                  <div>
                    <DatePicker
                      selected={
                        currentId ? new Date(task.echeance) : task.echeance
                      }
                      onChange={(date) => settask({ ...task, echeance: date })}
                    />
                  </div>
                )}
              </Form.Group>
              {currentId && (
                <Form.Group className="m-2">
                  <Form.Label className="label">Statut</Form.Label>
                  <Form.Select
                    className="select_text"
                    value={task && task.status}
                    onChange={(e) =>
                      settask({ ...task, status: e.target.value })
                    }
                  >
                    <option>Choisir une statut</option>
                    {status &&
                      status.map((element) => {
                        return (
                          <option value={element._id}>{element.titre}</option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>
              )}

              <Form.Group className="m-2">
                <Form.Label className="label">Priorité</Form.Label>
                <Form.Select
                  className="select_text"
                  value={task && task.priorite}
                  onChange={(e) =>
                    settask({ ...task, priorite: e.target.value })
                  }
                >
                  <option>Choisir une priorité</option>
                  {priorities &&
                    priorities.map((element) => {
                      return (
                        <option value={element._id}>{element.titre}</option>
                      );
                    })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="m-2">
                <Form.Label className="label">Utilisateur</Form.Label>
                <Form.Select
                  className="select_text"
                  value={task && task.utilisateur}
                  onChange={(e) =>
                    settask({ ...task, utilisateur: e.target.value })
                  }
                >
                  <option>Choisir un utilisateur</option>
                  {participants &&
                    participants.map((element) => {
                      const userr =
                        users && users.find((el) => el._id === element.user_id);
                      return (
                        <option value={userr && userr._id}>
                          {userr && userr.nom}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
              <div className="d-flex justify-content-end">
                {" "}
                <Button className="add_btn m-2" type="submit">
                  {currentId ? "Mettre à jour la tache" : "Ajouter "}
                </Button>
              </div>

              {message && <Success message={message} />}
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default TaskForm;
