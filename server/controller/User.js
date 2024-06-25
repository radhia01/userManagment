const User = require("../model/User");
const Role = require("../model/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
//Configure Multer to handle file downloads.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// functions
// add new user
exports.createUser = async (req, res) => {
  try {
    const { nom, email, motdepasse, telephone, adresse, rolename } = req.body;
    console.log("le body is " + req.body.nom);
    // check if role already exist
    const role = await Role.findOne({ titre: rolename });
    if (!role) {
      return res.status(400).json({ message: "le role specifié n'existe pas" });
    }
    // check if password length is less than 8 caracters
    if (motdepasse.length < 8) {
      return res.status(400).json({
        message:
          "Le mot de passe doit avoir une longueur d'au moins 8 caractères",
      });
    }
    // hash password

    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    // add user
    const newuser = new User({
      nom,
      motdepasse: hashedPassword,
      email,
      adresse,
      telephone,
      role: role._id,
      image:
        "https://res.cloudinary.com/db8b6npfz/image/upload/v1700921258/user_bgjn60.png",
    });
    console.log("new user is " + newuser);
    await newuser.save();
    return res.status(200).json({
      success: true,
      data: newuser,
      message: "Utilisateur ajouté avec succéss",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Erreur de serveur " });
  }
};
// login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exist
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable " });
    }
    // compare passwords
    const checkedPassword = await bcrypt.compare(password, user.motdepasse);
    if (!checkedPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // check if user is an admin
    if (user.role.toString() !== "6538f981737733927f1ef0a5") {
      return res
        .status(400)
        .json({ message: "Vous n'etes pas un administrateur" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    return res.status(200).json({ token: token, user, success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Erreur de serveur", err: error.message });
  }
};

// get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    await User.deleteOne({ _id: userId });
    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succéss", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// get user by id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, adresse, telephone } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { nom, email, adresse, telephone } },
      { new: true }
    );
    return res
      .status(200)
      .json({ data: user, message: "Mise à jour  effectué avec success" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};

// update password
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const { newPassword, newPassword1 } = req.body;
    if (newPassword === newPassword1) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(id, { motdepasse: hashedPassword });
      const updatedUser = await User.findById(id);
      return res.status(200).json({
        data: updatedUser,
        message: "Mot de passe mis à jour avec succéss",
      });
    }
    return res
      .status(401)
      .json({ message: "Les mots de passes  ne sont pas  similaires" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
