import React from "react";
import "./App.css";

// import components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UserList from "./pages/User/UserList";
import Profile from "./pages/User/Profile";
import Projects from "./pages/Project/ProjectList";
import TaskList from "./pages/Task/TaskList";
import ProjectDetails from "./pages/Project/ProjectDetails";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import react-bootstrap components
import { Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
       
        <Route
          path="*"
          element={
            <div>
              <Row>
                <Col md={3}>
                  <Sidebar />
                </Col>
                <Col md={8}>
                  <Row>
                    <Navbar />
                  </Row>
                  <Row>
                    <Routes>
                      <Route element={<PrivateRoutes />}>
                        <Route path="/users" element={<UserList />} />
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/projects" element={<Projects />}></Route>
                        <Route path="/tasks" element={<TaskList />}></Route>
                        <Route
                          path="/dashboard"
                          element={<Dashboard />}
                        ></Route>
                        <Route
                          path="/project/details/:id"
                          element={<ProjectDetails />}
                        ></Route>
                        {/* Ajoutez d'autres routes ici */}
                      </Route>
                    <Route path="*" element={<Navigate to="/" replace/>}></Route>
                    </Routes>
                  </Row>
                </Col>
              </Row>
              <ToastContainer />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}
