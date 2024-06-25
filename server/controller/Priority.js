const Priority = require("../model/Priority");
// add new priority
exports.createPriority = async (req, res) => {
  try {
    const { titre } = req.body;
    // recherche de role par son nom
    const newPriority = new Priority({
      titre: titre,
    });

    await newPriority.save();
    return res
      .status(200)
      .json({ data: newPriority, message: "Priorité ajouté avec success" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
// get all priorities
exports.getAllPriorities = async (req, res) => {
  try {
    const priorities = await Priority.find();
    return res.status(200).json({ data: priorities });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// get priorite by id
exports.getPrioriteById = async (req, res) => {
  try {
    const { id } = req.params;
    const priorite = await Priority.findOne({ _id: id });
    return res.status(200).json({ data: priorite });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
