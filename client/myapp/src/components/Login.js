import React from "react";
import { useEffect, useState } from "react";
import Error from "./Error";
// import from react-bootstrap
import { Card, Form, Col, Row, Button, Container } from "react-bootstrap";
// import actions
import { login } from "../redux/actions/user";
import { resetError, resetMessage } from "../redux/reducer/user";
// import from react-redux
import { useDispatch, useSelector } from "react-redux";
// import from react-router-dom
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });
  const { error, userInfo } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // functions
  const handleChange = (e) => {
    setuserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
    dispatch(resetError());
  };
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(userDetails));
    dispatch(resetError());
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);
  useEffect(() => {
    dispatch(resetError());
    dispatch(resetMessage());
  }, []);
  return (
    <Container fluid className="vh-100  bg-white login">
      (username:"admin@gmail.com",password:"0000")
      <Row className="h-100 ">
        <Col className="d-flex  justify-content-center align-items-center">
          <Card className="login_card">
            <Card.Header className="header_title">
              <h4>Se Connecter(Espace administrateur)</h4>
            </Card.Header>
            <Card.Body>
              <Form className="mt-3" onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label className="label"> Adresse Email</Form.Label>
                  <Form.Control
                    className="form_control"
                    name="email"
                    type="email"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="label "> Mot de passe </Form.Label>
                  <Form.Control
                    className="form_control"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Button className="add_btn" type="submit">
                  Se Connecter
                </Button>
                <div className="message d-flex justify-content-center">
                  {error && <Error message={error} />}
                </div>
              </Form>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
