const Project = require("../model/Project");
const Task = require("../model/Task");
// add new project
exports.createProject = async (req, res) => {
  try {
    const { nom, description, dateEcheance, dateCreation } = req.body;
    console.log(req.body);
    const newProject = new Project({
      nom,
      description,
      dateEcheance,
      dateCreation,
    });

    await newProject.save();
    return res
      .status(200)
      .json({ data: newProject, message: "Project ajouté avec success" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Erreur de serveur" });
  }
};
// get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({ data: projects });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// get project by id
exports.getProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findOne({ _id: projectId });
    res.status(200).json({ data: project });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// update project
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log(req.body);
    await Project.findByIdAndUpdate(projectId, req.body);
    const newProject = await Project.findOne({ _id: projectId });
    return res
      .status(200)
      .json({ data: newProject, message: "Project mis a jour avec success" });
  } catch (error) {
    return res.status(500).json({ error: error, message: "Erreur de serveur" });
  }
};
// delete project
exports.removeProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findOne({ _id: projectId });
    // delete all tasks related to this project 
    await Task.deleteMany({projet:projectId})
    await Project.findByIdAndDelete(projectId);
    res
      .status(200)
      .json({ data: project, message: "Project supprimé avec success" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// delete all projects
exports.removeallProjects = async (req, res) => {
  try {
    await Project.deleteMany();
    res.status(200).json({ message: "Tous les projets sont supprimés" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
