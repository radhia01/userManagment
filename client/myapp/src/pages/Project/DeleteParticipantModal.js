import React from "react";
import { Button, Modal } from "react-bootstrap";
function DeleteParticipantModal({
  setshowDeleteUser,
  deleteUser,
  userToDelete,
}) {
  const closeModal = () => {
    setshowDeleteUser(false);
  };
  return (
    <div className="delete_participant">
      <div className="modal shodow">
        <Modal.Dialog>
          <Modal.Header
            className="modal_header"
            closeButton
            onClick={closeModal}
          >
            Vous voulez vraiment supprimer cet employé ?{" "}
          </Modal.Header>
          <Modal.Body className="modal_body">
            <div className="d-flex justify-content-center">
              {" "}
              <Button
                className="modal_confirm m-2"
                onClick={() => deleteUser(userToDelete)}
              >
                Supprimer
              </Button>
              <Button className="modal_reset m-2" onClick={closeModal}>
                Annuler
              </Button>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default DeleteParticipantModal;
