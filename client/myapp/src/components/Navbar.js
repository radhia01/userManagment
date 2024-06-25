import React from "react";
import "./style.css";
import { Row, Col } from "react-bootstrap"
import imageLogo from "../assets/images/logo.png";
function Navbar() {
  return (
    <div>
      <Row className=" navbar">
        <Col md={1} className="d-flex justify-content-start">
          {" "}
          <img src={imageLogo} alt="Logo de l'application" className="logo" />
        </Col>

        <Col className="d-flex justify-content-start">
          {" "}
          <h4>Tableau de Bord Administratif</h4>
        </Col>
      </Row>
    </div>
  );
}

export default Navbar;
