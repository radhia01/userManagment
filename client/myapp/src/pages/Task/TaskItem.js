import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { getStatus } from "../../redux/actions/status";
import { getPriorities } from "../../redux/actions/Priority";
import { getUsers } from "../../redux/actions/user";
import { resetMessage } from "../../redux/reducer/task";
import TaskForm from "./TaskForm";
import { deleteTask } from "../../redux/actions/tasks";
function TaskItem({
  task,
  handleUpdateTask,
  showAddTask,
  setshowDeleteTaskModel,
}) {
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const [currentId, setcurrentId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const { status, priorities } = useSelector((state) => state.task);
  const { users, token } = useSelector((state) => state.user);
  const truncateText = (text, maxLength) => {
    return text && text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  };
  useEffect(() => {
    dispatch(getStatus(token));
    dispatch(getPriorities(token));
    dispatch(getUsers(token));
  }, [dispatch]);

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  const getStatusById = (id) => {
    return status && status.find((el) => el._id === id);
  };
  const getPriorityById = (id) => {
    return priorities && priorities.find((el) => el._id === id);
  };
  const getUserById = (id) => {
    return users && users.find((el) => el._id === id);
  };
  const handleshowDeleteModal = () => {
    dispatch(resetMessage());
    setshowDeleteModal(true);
    setshowDeleteTaskModel(true);
  };

  const handleshowUpdateModal = (id) => {
    setcurrentId(id);
    setshowUpdateModal(true);
  };
  const CloseModal = () => {
    setshowDeleteModal(false);
    setshowDeleteTaskModel(false);
  };
  const handleDeleteTask = (id) => {
    dispatch(deleteTask({id,token}));
    CloseModal();
  };
  useEffect(() => {
    if (showDeleteModal)
      document.getElementById("task_item").style.opacity = 0.1;
    else document.getElementById("task_item").style.opacity = 1;
  }, [showDeleteModal]);
  // useEffect(() => {
  //   if (showUpdateModal) {
  //     document.getElementById("task_item").style.opacity = 0.1;
  //     document.getElementById("project_details").style.opacity = 0.1;
  //     document.getElementById("tasklists").style.opacity = 0.1;
  //   } else {
  //     document.getElementById("task_item").style.opacity = 1;
  //     document.getElementById("project_details").style.opacity = 1;
  //     document.getElementById("tasklists").style.opacity = 1;
  //   }
  // }, [showUpdateModal]);
  return (
    <div className={`${showAddTask ? "projects_dark" : "task_item"}`}>
      <div id="task_item">
        <Card
          id="task_card"
          className=" task_card m-2"
          style={{ position: "relative", zIndex: 1 }}
        >
          <Card.Header className="modal_header">{task.titre}</Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <p className="task_paragraph">
                Description:
                <span className="span_txt">
                  {truncateText(task.description, 4)}
                </span>
              </p>
              <p>
                {" "}
                {task && task.description.length > 2 && (
                  <Button
                    className="voir_plus"
                    onClick={() => setshowModal(true)}
                  >
                    Voir PLus
                  </Button>
                )}
              </p>{" "}
            </div>
            <div className="d-flex justify-content-start">
              {" "}
              <p className="task_paragraph">
                Status:
                <span className="span_txt">
                  {getStatusById(task.status)?.titre}
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-start">
              {" "}
              <p className="task_paragraph">
                Priorité:
                <span className="span_txt">
                  {getPriorityById(task.priorite)?.titre}
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-start">
              {" "}
              <p className="task_paragraph">
                Echeance:{" "}
                <span className="span_txt">
                  {task.echeance ? task.echeance.substr(0, 10) : null}
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-start">
              {" "}
              <p className="task_paragraph">
                Attribué à :
                <span className="span_txt">
                  {getUserById(task.utilisateur)?.nom}
                </span>
              </p>
            </div>
            <div></div>
            {showModal && (
              <div
                className=" shadow bg-white "
                style={{
                  display: "block",
                  overflowWrap: "break-all",
                  position: "absolute",
                  top: 10,
                  width: 300,
                  height: 200,
                  zIndex: 2,
                  right: 10,
                }}
              >
                <Form.Control value={task.description} as="textarea" rows={7}>
                  {" "}
                </Form.Control>

                <div style={{ position: "absolute", right: 0 }}>
                  <Button
                    className=" bg-white text-black border-white d-flex justify-content-center align-items-center"
                    style={{ fontSize: 10, height: 15 }}
                    onClick={toggleModal}
                  >
                    fermer
                  </Button>{" "}
                </div>
              </div>
            )}
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between task_btn ">
            {" "}
            <Button
              className=" text-danger task_btn "
              onClick={handleshowDeleteModal}
            >
              Supprimer
            </Button>
            <Button
              className=" text-danger task_btn"
              onClick={() => handleshowUpdateModal(task._id)}
            >
              Mettre à jour
            </Button>
          </Card.Footer>
        </Card>
      </div>

      <div>
        {showDeleteModal && (
          <div className="modal show">
            <Modal.Dialog>
              <Modal.Header
                className="modal_header"
                closeButton
                onClick={CloseModal}
              >
                {" "}
                Veuillez confirmer la suppression de cette tache{" "}
              </Modal.Header>
              <Modal.Body className="modal_body">
                <div className="d-flex justify-content-center">
                  <Button
                    className="modal_confirm m-2 "
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Oui{" "}
                  </Button>{" "}
                  <Button
                    className="bg-dark border-dark color-white m-2 modal_reset "
                    onClick={CloseModal}
                  >
                    Annuler
                  </Button>
                </div>
              </Modal.Body>
              {/* {message &&  <Modal.Footer className='d-flex justify-content-center'>{message} <Button onclick={CloseModal}>OK </Button></Modal.Footer>}  */}
            </Modal.Dialog>
          </div>
        )}
      </div>
      {showUpdateModal && (
        <TaskForm
          setshowUpdateModal={setshowUpdateModal}
          handleUpdateTask={handleUpdateTask}
          currentId={currentId}
          setcurrentId={setcurrentId}
        />
      )}
    </div>
  );
}

export default TaskItem;
