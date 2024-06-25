const Role = require("../model/Role");

// add new role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    // recherche de role par son nom
    const newrole = new Role({
      titre: name,
    });

    await newrole.save();
    return res
      .status(200)
      .json({ data: newrole, message: "Role ajouté avec success" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
// get all roles
exports.getRoles = async (req, res) => {
  try {
    // recherche de role par son nom
    const roles = await Role.find();

    return res.status(200).json({ data: roles });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
