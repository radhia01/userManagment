const express = require("express");
const User = require("../model/User");
const { verifyToken } = require("../utils/verifyToken");
const {
  createUser,
  login,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updatePassword,
} = require("../controller/User");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

const router = express.Router();
// add new user
router.post("/users", verifyToken, createUser);
// login
router.post("/login", login);
// get all users
router.get("/users", verifyToken, getUsers);
// delete user
router.delete("/users/:userId", verifyToken, deleteUser);
// find user by id
router.get("/users/:id", verifyToken, getUserById);
// update user
router.patch("/users/:id", verifyToken, updateUser);
// check if user is authorized
router.get("/protege", verifyToken, (req, res) => {
  try {
    res.json({ message: "Accès autorisé", user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'accès protégé",
    });
  }
});
// update password
router.patch("/users/update/password/:id",verifyToken, updatePassword);
// update image profile
router.post("/upload/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { image: cldRes.secure_url } },
      { new: true }
    );
    console.log(cldRes);
    res.json({ message: "image mise  a jour avec success", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

module.exports = router;
