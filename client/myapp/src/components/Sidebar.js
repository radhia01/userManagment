import React, { useState } from "react";
// import from "react-bootstrap"
import { Col, Row, Button } from "react-bootstrap";
// import style.css file
import "./style.css";
// import icons
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import actions
import { logout } from "../redux/reducer/user";
// import from react-router-dom
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import from 'react-redux
import { useDispatch } from "react-redux";

function Sidebar() {
  const [color, setcolor] = useState(false);
  const [color1, setcolor1] = useState(false);
  const [color2, setcolor2] = useState(false);
  const [color3, setcolor3] = useState(false);
  const btnClass = !color ? "btn" : "pinkBtn";
  const btnClass1 = !color1 ? "btn" : "pinkBtn";
  const btnClass2 = !color2 ? "btn" : "pinkBtn";
  const btnClass3 = !color3 ? "btn" : "pinkBtn";
  // use navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goHome = () => {
    setcolor(true);
    setcolor1(false);
    setcolor2(false);
    setcolor3(false);
    navigate("/dashboard");
  };
  const goUsers = () => {
    setcolor(false);
    setcolor1(true);
    setcolor2(false);
    setcolor3(false);
    navigate("/users");
  };
  const goProjects = () => {
    setcolor(false);
    setcolor1(false);
    setcolor3(false);
    setcolor2(true);
    navigate("/projects");
  };
  const goProfile = () => {
    setcolor(false);
    setcolor1(false);
    setcolor3(true);
    setcolor2(false);
    navigate("/profile");
  };
  const Deconnect = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Col className="sidebar shadow ">
        <Row className=" sidebar_title">
          Espace Admin <br></br>
          <p className="sidebar_title2">Tableau de Bord Administratif</p>
        </Row>
        <hr></hr>
        <Row className="sidebar_col">
          <Button className={`sidebar_btn ${btnClass}`} onClick={goHome}>
            <DashboardIcon style={{ marginRight: 10 }} />
            Tableau de Bord
          </Button>
        </Row>
        <Row className="sidebar_col">
          <Button className={`sidebar_btn ${btnClass1}`} onClick={goUsers}>
            <Row>
              <Col md={4} className="d-flex justify-content-end">
                <GroupIcon />
              </Col>
              <Col md={3} className="d-flex justify-content-start">
                {" "}
                Employés
              </Col>
            </Row>
          </Button>
        </Row>

        <Row className="sidebar_col">
          {" "}
          <Button className={`sidebar_btn ${btnClass2}`} onClick={goProjects}>
            <Row>
              <Col md={4} className="d-flex justify-content-end">
                <FormatListBulletedIcon />
              </Col>
              <Col md={3} className="d-flex justify-content-start">
                {" "}
                Projets
              </Col>
            </Row>
          </Button>
        </Row>
        <Row className="sidebar_col">
          {" "}
          <Button className={`sidebar_btn ${btnClass3}`} onClick={goProfile}>
            <Row>
              <Col md={4} className="d-flex justify-content-end">
                <Person2Icon />
              </Col>
              <Col md={3} className="d-flex justify-content-start">
                Profile
              </Col>
            </Row>
          </Button>
        </Row>

        <Row className="sidebar_col">
          {" "}
          <Button className="sidebar_btn" onClick={Deconnect}>
            <Row>
              <Col md={4} className="d-flex justify-content-end">
                <LogoutIcon />
              </Col>
              <Col md={3} className="d-flex justify-content-start">
                Déconnecter
              </Col>
            </Row>
          </Button>
        </Row>
      </Col>
    </div>
  );
}

export default Sidebar;
