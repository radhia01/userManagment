import React from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
// import css file
import "./style.css";
// import icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import from react
import { useState, useEffect } from "react";
// import from react-redux
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import actions
import { getUsers, deleteUser, updateUser } from "../../redux/actions/user";
// import components
import AddEdit from "./UserForm";
import Error from "../../components/Error";
import { resetError, resetMessage } from "../../redux/reducer/user";
export default function Users() {
  const { users, token } = useSelector((state) => state.user);
  const [showModal, setshowModal] = useState(false);
  const [userToDelete, setuserToDelete] = useState(null);
  const [showConfirmation, setshowConfirmation] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();
  // useeffect
  useEffect(() => {
    if (!showModal) document.getElementById("employes").style.opacity = 1;
  }, [showModal]);
  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch]);
  // functions
  const showAddModal = () => {
    setshowModal(true);
    setcurrentId(null);
    document.getElementById("employes").style.opacity = 0.1;
  };
  const showEditModal = (id) => {
    setshowModal(true);
    setcurrentId(id);
    document.getElementById("employes").style.opacity = 0.1;
  };
  // show delete user modal
  const confirmDelete = (user) => {
    console.log(user);
    setshowConfirmation(true);
    setuserToDelete(user);
  };
  // delete user
  const removeUser = (id) => {
    try {
      dispatch(deleteUser({ id, token }));
      setshowConfirmation(false);
      setuserToDelete(null);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserInfo = (payload) => {
    dispatch(
      updateUser({
        userdata: payload.user,
        id: payload.id,
        token: payload.token,
      })
    );
    dispatch(getUsers());
  };
  const closeModal = () => {
    setshowConfirmation(false);
  };
  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <div className="usersList">
      <>
        <div id="employes">
          <Row className="d-flex justify-content-between align-items-center m-3">
            <Col md={6} className="title d-flex justify-content-start">
              Liste des Employés{" "}
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-end align-items-center"
            >
              <Button className="add_btn " onClick={showAddModal}>
                {" "}
                <AddIcon className="add_icon" />
                Ajouter un nouveau employé{" "}
              </Button>
            </Col>
          </Row>

          <table className="table shadow ">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Adresse</th>
                <th scope="col">Telephone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users
                  .filter((el) => el.role !== "6538f981737733927f1ef0a5")
                  .map((element) => {
                    return (
                      
                        <tr key={element._id}>
                          <td className="d-flex">
                            <img
                              src={element.image}
                              className="userimg"
                              alt="user"
                            />
                            <div style={{ marginLeft: 5 }}>{element.nom}</div>
                          </td>
                          <td>{element.email}</td>
                          <td>{element.adresse}</td>
                          <td>{element.telephone}</td>
                          <td className="d-flex justify-content-evenly">
                            <Button
                              className="list_btn"
                              onClick={() => confirmDelete(element)}
                            >
                              <DeleteIcon />
                            </Button>
                            <Button className="list_btn">
                              <EditIcon
                                onClick={() => showEditModal(element._id)}
                              />
                            </Button>
                          </td>
                        </tr>
                    
                    );
                  })}
            </tbody>
          </table>
        </div>

        {showModal && (
          <AddEdit
            setshowModal={setshowModal}
            updateUserInfo={updateUserInfo}
            currentId={currentId}
          />
        )}
      </>
      {showConfirmation && (
        <div className="modal show">
          <Modal.Dialog>
            <Modal.Header
              className="modal_header"
              closeButton
              onClick={closeModal}
            >
              Voulez-vous vraiment supprimer l'utilisateur : {userToDelete.nom}
            </Modal.Header>
            <Modal.Body className="modal_body">
              <Button
                className="modal_confirm m-2"
                onClick={() => removeUser(userToDelete._id)}
              >
                Supprimer
              </Button>
              <Button className="modal_reset m-2" onClick={closeModal}>
                Annuler
              </Button>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
}
