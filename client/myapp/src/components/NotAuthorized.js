import React from "react";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { Col, Row } from "react-bootstrap";
function NotAuthorized() {
  return (
    <div>
      <Row className="d-flex justify-content-center align-items-center m-3">
        <Col md={3} className="d-flex justify-content-end">
          <DoNotDisturbAltIcon style={{ color: "red" }} />
        </Col>
        <Col>
          {" "}
          <h3>You are not authorized </h3>{" "}
        </Col>
      </Row>
    </div>
  );
}

export default NotAuthorized;
