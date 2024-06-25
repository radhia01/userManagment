const Task = require("../model/Task");
// add new task
exports.createTask = async (req, res) => {
  try {
    const today = new Date();
    const {
      titre,
      description,
      status,
      priorite,
      echeance,
      projet,
      utilisateur,
    } = req.body;
    // recherche de role par son nom
    const newtask = new Task({
      titre,
      description,
      status,
      priorite,
      echeance,
      projet,
      utilisateur,
    });
    console.log(newtask);
    await newtask.save();

    return res
      .status(200)
      .json({ data: newtask, message: "Tache ajoutée avec success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Erreur de serveur ", erreur: error.message });
  }
};
// get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ erreur: error.message, message: "Erreur de serveur " });
  }
};
// get tasks by project exports.getTasks = async (req, res) => {
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projet: projectId });

    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
// delete task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({
      data: task,
      message: "Tache supprimée avec success",
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
// update task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    const task = await Task.findOne({ _id: taskId });
    return res.status(200).json({
      data: task,
      message: "Tache modifiée avec success",
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur " });
  }
};
