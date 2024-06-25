import React from "react";
import { useEffect, useState } from "react";
// import from date-fns
import { format } from "date-fns";
// import from react-bootstrap
import { Card, Row, Col, Container, Table } from "react-bootstrap";
// import actions
import { getUsers } from "../redux/actions/user";
import { getTasks } from "../redux/actions/tasks";
import { getProjects } from "../redux/actions/project";
import { getStatus } from "../redux/actions/status";
// import from react-redux
import { useDispatch, useSelector } from "react-redux";
//import from chart-js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const { users, token } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { tasks, status } = useSelector((state) => state.task);
  const today = format(new Date(), "yyyy-MM-dd");
  const [data, setdata] = useState({
    labels: [],
    datasets: [],
    backgroundColor: [],
  });
  const [projectData, setprojectData] = useState({
    labels: [],
    datasets: [],
    backgroundColor: [],
  });

  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    
      dispatch(getUsers(token));
      dispatch(getProjects(token));
      dispatch(getTasks(token));
      dispatch(getStatus(token));
  }, [dispatch]);

  const totalEmployees =
    users?
    users
      .filter((el) => el.role !== "6538f981737733927f1ef0a5").length:0
  const totalProjects =
    projects ? projects.length:0
    
  const totalTasks =
    tasks?tasks.length:0
  const ProjectStatus = (id) => {
    return status && status.find((el) => el._id === id).titre;
  };
  const AverageTachesByProject = (id) => {
    const projectTasks =
      tasks && tasks.filter((element) => element.projet === id);
    return projectTasks && projectTasks.length / totalProjects;
  };
  const achievmentPercent = (id) => {
    const projectTasks =
      tasks && tasks.filter((element) => element.projet === id);

    const achievedTasks =
      projectTasks &&
      projectTasks.filter((el) => el.status === "654cedeb4177a26f57f164c9");
    if (achievedTasks && achievedTasks.length === 0) return 0;
    else
      return (
        (achievedTasks && achievedTasks.length / projectTasks.length) * 100
      );
  };

  useEffect(() => {
    if (tasks) {
      const statusCount = {};
      tasks &&
        tasks.forEach((task) => {
          if (statusCount[task.status]) {
            statusCount[task.status]++;
          } else {
            statusCount[task.status] = 1;
          }
        });

      const chartData = {
        labels: Object.keys(statusCount).map((statusId) => {
          const statut = status && status.find((el) => el._id === statusId);
          return statut ? statut.titre : statusId;
        }),
        datasets: [
          {
            data: Object.values(statusCount),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
          },
        ],
      };
      setdata({
        ...data,
        labels: chartData.labels,
        datasets: chartData.datasets,
        backgroundColor: chartData.backgroundColor,
      });
    }
  }, [tasks]);
  //use effect
  useEffect(() => {
    if (projects) {
      const statusCount = {};
      projects &&
        projects.forEach((project) => {
          if (statusCount[project.status]) {
            statusCount[project.status]++;
          } else {
            statusCount[project.status] = 1;
          }
        });

      const chartData = {
        labels: Object.keys(statusCount).map((statusId) => {
          const statut = status && status.find((el) => el._id === statusId);
          return statut ? statut.titre : statusId;
        }),
        datasets: [
          {
            data: Object.values(statusCount),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
          },
        ],
      };
      setprojectData({
        ...projectData,
        labels: chartData.labels,
        datasets: chartData.datasets,
        backgroundColor: chartData.backgroundColor,
      });
    }
  }, [projects]);

  return (
    <div className="dashboard">
      <Container className="m-2">
        <Row className="d-flex justify-content-between align-items-center m-3 part1">
          <Col className="title d-flex justify-content-start">
            Tableau de Bord{" "}
          </Col>
        </Row>
        <Row className="part2">
          <Col md={4}>
            <div className="dashboard_card shadow">
              Nombre Total des employés
              <hr></hr>
              <p className="dashboard_number">{totalEmployees}</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="dashboard_card shadow">
              Nombre Total des projets
              <hr></hr>
              <p className="dashboard_number">{totalProjects}</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="dashboard_card shadow">
              Nombre Total des taches
              <hr></hr>
              <p className="dashboard_number">{totalTasks}</p>
            </div>
          </Col>
        </Row>
        <Row className="part3">
          <Table striped bordered hover className="shadow">
            <thead>
              <tr>
                <th>Nom de projet</th>
                <th>Statut</th>
                <th> % d'Achèvement</th>
                <th>Date d'Échéance</th>
                <th>Nombre moyen des taches</th>
              </tr>
            </thead>
            <tbody>
              {projects &&
                projects.map((element) => {
                  return (
                    <tr key={element._id}>
                      <td>{element.nom}</td>
                      <td>{ProjectStatus(element.status)}</td>
                      <td>{achievmentPercent(element._id)}%</td>

                      <td>
                        {element.dateEcheance &&
                          element.dateEcheance.slice(0, 10)}
                      </td>
                      <td>{AverageTachesByProject(element._id)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Row>
        <Row className="d-flex justify-content-between part4">
          <Col md={5} className="dashboard_status shadow">
            <div className="mt-3">
              <h6>Répartition des tâches par statut</h6>
            </div>{" "}
            {tasks && tasks.length>0? <Pie data={data}> </Pie>: <h4>Aucune tache n'est encore ajoutée</h4>}
            
          </Col>
          <Col md={5} className="dashboard_status shadow">
            <div className="mt-3">
              <h6>Répartition des projets par statut</h6>
            </div>{" "}
            {<Pie data={projectData}> </Pie>}
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-start title2"
          // style={{ fontSize: 18, fontWeight: "bold" }}
        >
          {" "}
          Tâches avec échéance aujourd'hui{" "}
        </Row>
        <Row className="  d-flex part5">
          {tasks && tasks.length>0?
            tasks
              .filter((el) => el.echeance.slice(0, 10) === today)
              .map((task) => {
                return (
                  <Col
                    key={task._id}
                    md={4}
                    className="  
                "
                  >
                    <Card className="shadow ">
                      <Card.Header className="header_title">
                        {task.titre}
                      </Card.Header>
                      <Card.Body>
                        {projects &&
                          projects
                            .filter((el) => el._id === task.projet)
                            .map((element) => {
                              return <div key={element._id}> Projet : {element.nom}</div>;
                            })}
                        <br></br>
                        {users &&
                          users
                            .filter((el) => el._id === task.utilisateur)
                            .map((element) => {
                              return (
                                <div className="mt-3">
                                  Affecté à : {element.nom}
                                </div>
                              );
                            })}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }):<h4>Aucune tache</h4>}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
