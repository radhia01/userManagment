import React, { useState, useEffect } from "react";
// import from "react-bootstrap"
import { Modal, Button, Form } from "react-bootstrap";
// import from react-redux
import { useSelector, useDispatch } from "react-redux";
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Success from "../../components/Success";
// import actions
import { addUser, getUsers } from "../../redux/actions/user";
import { resetMessage, resetError } from "../../redux/reducer/user";

function AddEdit({ setshowModal, currentId, updateUserInfo }) {
  const dispatch = useDispatch();
  const { message, error, token } = useSelector(
    (state) => state.user
  );
   
  const user = useSelector((state) =>
    currentId ? state.user.users.find((el) => el._id === currentId) : null
  );

  const [userDetails, setuserDetails] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    motdepasse: "",
    rolename: "user",
  });

  // functions
  useEffect(() => {
    dispatch(resetError());
    dispatch(resetMessage());
  }, [dispatch]);

  const closeModal = () => {
    setshowModal(false);
    dispatch(resetMessage());
  };
  const handleChange = (e) => {
    dispatch(resetError());
    dispatch(resetMessage());
    setuserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetError());
    try {
      if (!currentId) {
        dispatch(addUser({ userDetails, token }));
     
      } else {
        updateUserInfo({ id: currentId, user: userDetails, token });
      
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        toast.error(error);
      }, 2000); // Set the time you want the error message to appear (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [error]);
  const resetForm = () => {
    setuserDetails({
      ...userDetails,
      nom: "",
      email: "",
      telephone: "",
      adresse: "",
      motdepasse: "",
    });
  };

  // useeffcet

  useEffect(() => {
    currentId && setuserDetails(user);
  }, []);

  return (
    <div className="add_edit_user">
      <div className="modal  ">
        <Modal.Dialog>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton onClick={closeModal}>
              <Modal.Title className="header_title">
                {currentId
                  ? "Mettre à jour un employé"
                  : "Ajouter un nouveau  employé"}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="form_group">
                <div className="label">
                  <Form.Label>Nom</Form.Label>
                </div>
                <Form.Control
                  className="input_text"
                  required
                  type="text"
                  id="nom"
                  name="nom"
                  onChange={handleChange}
                  value={userDetails.nom}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <div className="label">
                  <Form.Label>Email</Form.Label>
                </div>
                <Form.Control
                  className="input_text"
                  required
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={userDetails.email}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <div className="label">
                  <Form.Label>Adresse</Form.Label>
                </div>
                <Form.Control
                  className="input_text"
                  required
                  id="adresse"
                  type="text"
                  name="adresse"
                  onChange={handleChange}
                  value={userDetails.adresse}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <div className="label">
                  <Form.Label>Telephone</Form.Label>
                </div>

                <Form.Control
                  className="input_text"
                  required
                  id="telephone"
                  type="text"
                  name="telephone"
                  onChange={handleChange}
                  value={userDetails.telephone}
                ></Form.Control>
              </Form.Group>
              {!currentId && (
                <Form.Group>
                  <div className="label">
                    <Form.Label>Mot de passe</Form.Label>{" "}
                  </div>

                  <Form.Control
                    className="input_text"
                    type="password"
                    name="motdepasse"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                className="add_btn"
                onClick={resetForm}
              >
                Annuler
              </Button>
              <Button variant="primary" className="add_btn" type="submit">
                {currentId ? "Mettre à jour" : "Ajouter"}
              </Button>
            </Modal.Footer>

            {message && <Success message={message} />}

            {error && <ToastContainer />}
          </Form>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default AddEdit;
