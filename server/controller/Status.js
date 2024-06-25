const Status = require("../model/Status");
// add new priority
exports.createStatus = async (req, res) => {
  try {
    const { titre } = req.body;
    // recherche de role par son nom
    const newStatus = new Status({
      titre: titre,
    });

    await newStatus.save();
    return res
      .status(200)
      .json({ data: newStatus, message: "Status ajouté avec success" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
// get all status

exports.getStatus = async (req, res) => {
  try {
    const status = await Status.find();
    return res.status(200).json({ data: status });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
// get status by id
exports.getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findOne({ _id: id });
    return res.status(200).json({ data: status });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
