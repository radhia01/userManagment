import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import actions
import { getUsers } from "../../redux/actions/user";
import { getStatus } from "../../redux/actions/status";
import { getPriorities } from "../../redux/actions/Priority";
import { getTasksByProject, updateTask } from "../../redux/actions/tasks";
import { getUsersFromProject } from "../../redux/actions/project";
import { resetMessage } from "../../redux/reducer/task";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
// import icons
import AddIcon from "@mui/icons-material/Add";
import { addTask } from "../../redux/actions/tasks";
//
import "./style.css";
import TaskForm from "./TaskForm";
import Success from "../../components/Success";
function TaskList({
  idproject,
  setAddTask,
  setshowDeleteTaskModel,
  showDeleteTaskModel,
}) {
  const dispatch = useDispatch();
  const { tasks, status, message } = useSelector((state) => state.task);
  console.log(tasks)
  const { users, token } = useSelector((state) => state.user);
  const [statusFilter, setstatusFilter] = useState(null);
  const [userFilter, setuserFilter] = useState(null);
  const [priorityFilter, setpriorityFilter] = useState(null);
  const [showAddTask, setshowAddTask] = useState(false);
  const { priorities } = useSelector((state) => state.task);
  const { participants } = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(getTasksByProject({ id: idproject, token }));
    dispatch(getStatus(token));
    dispatch(getUsers(token));
    dispatch(getPriorities(token));
    dispatch(getUsersFromProject({id:idproject,token}));
  }, [dispatch]);
  const handleAddTask = (data) => {
    dispatch(resetMessage());
    dispatch(addTask({ data, token }));
    dispatch(getTasksByProject({ id: idproject }));
  };
  const handleShowTask = () => {
    setshowAddTask(true);
    setAddTask(true);
  };

  const handleUpdateTask = (payload) => {
    dispatch(resetMessage());
    dispatch(updateTask(payload));
    dispatch(getTasksByProject({ id: idproject, token }));
  };
  const filtredTasks =
    tasks &&
    tasks.filter(
      (task) =>
        (!statusFilter || task.status === statusFilter) &&
        (!userFilter || task.utilisateur === userFilter) &&
        (!priorityFilter || task.priorite === priorityFilter)
    );
  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  return (
    <div>
      <div
        id="tasklists"
        className={` ${
          showAddTask || showDeleteTaskModel ? "tasklists2" : "tasklists"
        }`}
      >
        <Row className="d-flex justify-content-between align-items-center m-3">
          <Col md={6} className="title d-flex justify-content-start">
            Liste des Taches{" "}
          </Col>
          <Col md={6} className="d-flex justify-content-end align-items-center">
            <Button className="add_btn " onClick={handleShowTask}>
              {" "}
              <AddIcon className="add_icon" />
              Ajouter{" "}
            </Button>{" "}
          </Col>
        </Row>
        <Row className="d-flex justify-content-end">
          <p style={{ fontSize: 10 }}>
            <p style={{ fontsize: "5px" }}>
              Note : Assurez-vous d'ajouter les participants avant de créer une
              tâche. Les participants disponibles seront affichés dans la liste
              déroulante lors de l'ajout de tâches
            </p>
          </p>
        </Row>
        {/* affichage par status */}
        <Row className="d-flex justify-content-end m-4">
          <div style={{ width: "20%" }}>
            {" "}
            <Form.Label style={{ fontSize: 13, fontWeight: "bold" }}>
              Affichage par status
            </Form.Label>
            <Form.Select
              className="select_text"
              onChange={(e) => setstatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              {status &&
                status.map((el) => {
                  return <option value={el._id}>{el.titre} </option>;
                })}
              {/* affichage par user */}
            </Form.Select>
          </div>
          <div style={{ width: "20%" }}>
            {" "}
            <Form.Label style={{ fontSize: 13, fontWeight: "bold" }}>
              Affichage par utilisateur
            </Form.Label>
            <Form.Select
              className="select_text"
              onChange={(e) => setuserFilter(e.target.value)}
            >
              <option value="">Tous les utilisateurs</option>
              {participants &&
                participants.map((element) => {
                  const user = users.find((el) => el._id === element.user_id);
                  return <option value={user && user._id}>{user && user.nom}</option>;
                })}
            </Form.Select>
          </div>
          <div style={{ width: "20%" }}>
            {" "}
            <Form.Label style={{ fontSize: 13, fontWeight: "bold" }}>
              Affichage par priorité
            </Form.Label>
            <Form.Select
              className="select_text"
              onChange={(e) => setpriorityFilter(e.target.value)}
            >
              <option value="">Tous les priorités</option>
              {priorities &&
                priorities.map((el) => {
                  return <option value={el._id}>{el.titre} </option>;
                })}
            </Form.Select>
          </div>
        </Row>
      </div>

      {showAddTask && (
        <TaskForm
          addTask={handleAddTask}
          idproject={idproject}
          setshowAddTask={setshowAddTask}
          setAddTask={setAddTask}
        />
      )}
      <Row className="m-3 ">
        {filtredTasks &&
          filtredTasks.map((el) => {
            return (
              <>
                <Col md={4}>
                  {" "}
                  <TaskItem
                    task={el}
                    handleUpdateTask={handleUpdateTask}
                    showAddTask={showAddTask}
                    setshowDeleteTaskModel={setshowDeleteTaskModel}
                  />
                </Col>
              </>
            );
          })}
        {filtredTasks && filtredTasks.length === 0 && (
          <div
            className={`  m-4 d-flex justify-content-start ${
              showAddTask ? "notasks" : ""
            }`}
          >
            <h5>Opppps ....Aucune tache à afficher</h5>{" "}
          </div>
        )}
      </Row>
      {message && <Success message={message} />}
    </div>
  );
}

export default TaskList;
