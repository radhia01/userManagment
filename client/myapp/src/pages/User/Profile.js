import React from "react";
import { Image, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updatePassword } from "../../redux/actions/user";
import axios from "axios";
import Success from "../../components/Success";
import Error from "../../components/Error";
// import css file
import "./style.css";
import { resetError, resetMessage } from "../../redux/reducer/user";
function Profile() {
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { message, error, token,userInfo } = useSelector((state) => state.user);
  const [uploading, setUploading] = useState(false);
  const [ShowModalUpdateImage, setShowModalUpdateImage] = useState(false);
  const [showConfirmUpdate, setshowConfirmUpdate] = useState(false);
  const [image, setImage] = useState("");
  const [showInfos, setshowInfos] = useState(true);
  const [newPassword, setnewPassword] = useState("");
  const [newPassword1, setnewPassword1] = useState("");
  const [showupdatePassword, setshowupdatePassword] = useState(false);

  const [userdata, setuser] = useState(userInfo);

  const [file, setFile] = useState(null);
  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  const showUserInfos = () => {
    dispatch(resetMessage());
    setshowInfos(true);
    setshowupdatePassword(false);
  };
  const showUpdatePassword = () => {
    dispatch(resetMessage());
    setshowInfos(false);
    setshowupdatePassword(true);
  };

  const handleChange = (e) => {
    dispatch(resetMessage());
    dispatch(resetError());
    setuser({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleupdateUser = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ id: userdata._id, userdata, token }));
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(
      updatePassword({
        id: userdata._id,
        data: { newPassword: newPassword, newPassword1: newPassword1 },
        token,
      })
    );
  };
 
  
  // update user image

  const handleSelectFile = async (e) => {
    setFile(e.target.files[0]);
  };
  const updateUserImage = async () => {
    if (file) {
      try {
        const data = new FormData();
        data.append("file", file);
        const response = await axios.post(
          `https://task-forge-backend.vercel.app/upload/${userdata._id}`,
          data
        );
        const res = await response.data;
        if (res.data) {
          setImage(res.data.image);
          setuser({ ...userdata, image: res.data.image });
        }
        setshowConfirmUpdate(false);
        setShowModalUpdateImage(false);
      } catch (error) {
        console.error("Error uploading image to Cloudinary: ", error);
      }
    }
  };

  const handleChangePassword = (e) => {
    setnewPassword(e.target.value);
    dispatch(resetError());
  };
  const handleChangePassword1 = (e) => {
    setnewPassword1(e.target.value);
    dispatch(resetError());
  };
  //
  const handleShowModalUpdateImage = () => {
    setShowModalUpdateImage(true);
  };
  const closeConfirmModal = () => {
    setshowConfirmUpdate(false);
  };
  const closeImportModal = () => {
    setShowModalUpdateImage(false);
  };
  useEffect(() => {
    if (file) {
      setshowConfirmUpdate(true);
    }
  }, [file]);
  useEffect(() => {
    if (ShowModalUpdateImage || showConfirmUpdate) {
      document.getElementById("profile").style.opacity = 0.1;
    } else document.getElementById("profile").style.opacity = 1;
  }, [ShowModalUpdateImage, showConfirmUpdate]);
  return (
    <div className="profile">
      <div id="profile">
        <Row className="mt-3 " style={{ zIndex: 2 }}>
          <Image
            height={290}
            src="https://png.pngtree.com/background/20230516/original/pngtree-3d-mountains-hd-wallpapers-2017-picture-image_2615313.jpg"
          ></Image>
        </Row>

        <Row>
          <Card className="p-3 shadow " style={{ zIndex: 4, height: 550 }}>
            <Row>
              <Col md={2}>
                <Image
                  className="imageProfile"
                  style={{ cursor: "pointer" }}
                  width={100}
                  height={80}
                  src={image || userdata.image || "placeholder_image_url"}
                ></Image>
                <br></br>
                <Button
                  className=" mt-2 update_btn"
                  onClick={handleShowModalUpdateImage}
                >
                  Mettre à jour{" "}
                </Button>
              </Col>

              <Col className="m-2">
                <Row style={{ fontWeight: "bold", fontSize: 20 }}>
                  {userdata && userdata.nom}{" "}
                </Row>
                <Row>{userdata && userdata.email}</Row>
              </Col>
            </Row>
            {/* input caché  */}

            <div className="d-flex m-2">
              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                multiple={false}
                onChange={handleSelectFile}
              />

              {uploading && <p>Uploading...</p>}
            </div>

            <Row className="p-2">
              <Col md={4}>
                <Button
                  to=""
                  onClick={showUserInfos}
                  className="link m-4 profile_btn"
                >
                  Informations personelles
                </Button>
                <br></br>
                <Button
                  to=""
                  className="link profile_btn"
                  onClick={showUpdatePassword}
                >
                  Modifer le mot de passe
                </Button>
              </Col>

              <Col md={5}>
                {showInfos ? (
                  <Form onSubmit={handleupdateUser}>
                    <Form.Group>
                      {" "}
                      <Form.Label className="label">
                        Nom d'utilisateur
                      </Form.Label>
                      <Form.Control
                        name="nom"
                        value={userdata && userdata.nom}
                        onChange={handleChange}
                        className="input_text"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="label">Adresse Email</Form.Label>
                      <Form.Control
                        className="input_text"
                        name="email"
                        value={userdata && userdata.email}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="label">Telephone</Form.Label>
                      <Form.Control
                        name="telephone"
                        value={userdata && userdata.telephone}
                        onChange={handleChange}
                        className="input_text"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="label">
                        Adresse physique
                      </Form.Label>
                      <Form.Control
                        name="adresse"
                        value={userdata && userdata.adresse}
                        onChange={handleChange}
                        className="input_text"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Button type="submit" className="update_btn">
                        Mettre à jour
                      </Button>
                    </Form.Group>
                  </Form>
                ) : (
                  <Form onSubmit={handleUpdatePassword}>
                    <Form.Group>
                      {" "}
                      <Form.Label className="label">
                        Nouveau mot de passe
                      </Form.Label>
                      <Form.Control
                        value={newPassword}
                        type="password"
                        onChange={handleChangePassword}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="label">
                        Confirmer le mot de passe
                      </Form.Label>
                      <Form.Control
                        value={newPassword1}
                        type="password"
                        onChange={handleChangePassword1}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Button type="submit" className="update_btn">
                        Mettre à jour
                      </Button>
                    </Form.Group>
                  </Form>
                )}
                {message && <Success message={message} />}
                {error && <Error message={error} />}
              </Col>
            </Row>
          </Card>
        </Row>
      </div>

      {ShowModalUpdateImage && (
        <div
          className=" modal show"
          style={{ display: "block", position: "inherit" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={closeImportModal}>
              Mettre à jour la photo de profile{" "}
            </Modal.Header>
            <Modal.Body>
              <Button className="update_btn" onClick={handleImageClick}>
                Importer une image{" "}
              </Button>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      )}
      {showConfirmUpdate && (
        <div
          className=" modal show"
          style={{ display: "block", position: "inherit" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={closeConfirmModal}>
              Votre photo de profile sera mise à jour
            </Modal.Header>
            <Modal.Body>
              <Button className="update_btn" onClick={updateUserImage}>
                OK
              </Button>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
}

export default Profile;
