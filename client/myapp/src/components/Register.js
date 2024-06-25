import React from "react";
import { Card, Form, Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetError } from "../redux/reducer/user";

import { addUser } from "../redux/actions/user";
import Error from "./Error";
function Register() {
  const [userDetails, setuserDetails] = useState({
    nom: "",
    email: "",
    motdepasse: "",
    telephone: "",
    adresee: "",
    rolename: "admin",
  });
  const { error, success } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
   
    dispatch(resetError());
    setuserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (success) navigate("/");
  }, [success]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(userDetails));
  };
  return (
    <Container fluid className="vh-100  bg-white register">
      <Row className="h-100 ">
        <Col className="d-flex  justify-content-center align-items-center">
          <Card className="register_card shadow">
            <Card.Header className="header_title d-flex justify-content-center align-items-center">
              <h4>S'enregistrer</h4>
            </Card.Header>
            <Card.Body>
              <Form className="mt-3" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label className="label"> Nom</Form.Label>
                  <Form.Control
                    className="form_control"
                    name="nom"
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="label"> Telephone</Form.Label>
                  <Form.Control
                    className="form_control"
                    name="telephone"
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="register_group">
                  <Form.Label className="label"> Adresse Email</Form.Label>
                  <Form.Control
                    className="form_control"
                    name="email"
                    type="email"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="register_group">
                  <Form.Label className="label"> Adresee</Form.Label>
                  <Form.Control
                    className="form_control"
                    name="adresse"
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="register_group">
                  <Form.Label className="label "> Mot de passe </Form.Label>
                  <Form.Control
                    className="form_control"
                    type="password"
                    name="motdepasse"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Button className=" m-1 add_btn" type="submit">
                  S'enregistrer
                </Button>
                {error && <Error message={error} />}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
