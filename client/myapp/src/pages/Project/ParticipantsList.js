import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/user";

import { resetMessage } from "../../redux/reducer/project";
import {
  removeUserFromProject,
  getUsersFromProject,
  addUserToProject,
} from "../../redux/actions/project";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// import components
import Success from "../../components/Success";
import  Error  from "../../components/Error"
import DeleteParticipantModal from "./DeleteParticipantModal";
//
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
function ParticipantsList({ id, project }) {
  const dispatch = useDispatch();
  const [showAddUser, setshowAddUser] = useState(false);
  const [showDeleteUser, setshowDeleteUser] = useState(false);
  const { users, token } = useSelector((state) => state.user);
  const [userId, setuserId] = useState(null);
 
  const [userToDelete, setuserToDelete] = useState(null);
  const { message, participants,error } = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsersFromProject({ id, token }));
  }, [dispatch]);
  const deleteUser = (iduser) => {
    dispatch(removeUserFromProject({ iduser, idproject: project._id, token }));

    setshowDeleteUser(false);
  };

  const handleshowAddUser = () => {
    dispatch(resetMessage());
    setshowAddUser(true);
  };
  const closeModal = () => {
    setshowAddUser(false);
  };

  const AddUserProject = () => {
    dispatch(addUserToProject({ userId, id,token }));
    dispatch(getUsersFromProject({ id: id,token }));
  };
  const handleshowDeleteUser = (id) => {
    setshowDeleteUser(true);
    setuserToDelete(id);
  };

  return (
    <div className="participants_list">
      <div className={`${showAddUser ? "projects_dark" : "list"}`}>
        <Row className="d-flex justify-content-between align-items-center">
          <Col>
            <p style={{ fontWeight: "bold", fontSize: 20 }}>
              Liste des participants
            </p>
          </Col>
          <Col className=" d-flex justify-content-end">
            <Button onClick={handleshowAddUser} className="add_btn">
              <AddIcon className="add_icon" />
              Ajouter un nouveau participant
            </Button>
          </Col>
        </Row>
        <div className="d-flex justify-content-center m-3 border ">
          <Row className=" justify-content-center" style={{ width: "50%" }}>
            {" "}
            {participants &&
              participants.map((element) => {
                const userr =
                  users && users.find((el) => el._id === element.user_id);
                return (
                  <Col
                    key={element._id}
                    md={12}
                    className=" m-2 d-flex justify-content-between align-items-center"
                  >
                    {userr && userr.nom}{" "}
                    <Button
                      style={{ width: 40, height: 30 }}
                      className=" d-flex justify-content-center bg-black border-black text-white"
                      onClick={() => handleshowDeleteUser(userr._id)}
                    >
                      <DeleteIcon style={{ fontSize: 16 }} />
                    </Button>
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>

      {showAddUser && (
        <div
          className="modal show m-3"
          style={{ display: "block", position: "fixed", top: 10 }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={closeModal}>
              <h6> Ajouter un employé au projet</h6>
             
            </Modal.Header>
            <Modal.Body>
              <Form.Label>
                <h6>Sélectionner un employé</h6>
              </Form.Label>
              <div className="d-flex justify-content-between ">
                <Form.Select
                  className="m-1 form_select"
                  style={{ height: "50%" }}
                  onChange={(e) => setuserId(e.target.value)}
                >
                  <option>
                    <h6>Choisir un employé</h6>
                  </option>
                  {users &&
                    users
                      .filter((el) => el.role !== "6538f981737733927f1ef0a5")
                      .map((el) => {
                        return participants &&
                          participants.find(
                            (element) => element.user_id === el._id
                          ) ? null : (
                          <option value={el._id}> {el.nom}</option>
                        );
                      })}
                </Form.Select>
                <Button className=" m-2 btn3" onClick={AddUserProject}>
                  Ajouter
                </Button>
              </div>
            </Modal.Body>

            {message && <Success message={message} />}
            {error && <Error message={error} />}
           
          </Modal.Dialog>
        </div>
      )}
      {showDeleteUser && (
        <DeleteParticipantModal
          setshowDeleteUser={setshowDeleteUser}
          deleteUser={deleteUser}
          userToDelete={userToDelete}
        />
      )}
    </div>
  );
}

export default ParticipantsList;
