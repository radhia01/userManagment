const User = require("../model/User");
const UserProject = require("../model/UserProject");
const TaskModal=require("../model/Task")
// associate new user to an existing project
exports.addUserToProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const fectUser = await UserProject.findOne({
      user_id: userId,
      project_id: projectId,
    });

    if (fectUser) {
      return res.status(409).json({ message: "utilisateur deja associé" });
    }
    const newUserProject = new UserProject({
      user_id: userId,
      project_id: projectId,
    });
    await newUserProject.save();
    res.status(200).json({
      data: newUserProject,
      message: "utilisateur associé  au projet avec success",
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// Désassocier un utilisateur d'un projet
exports.removeUserFromProject = async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    // check if user is already associated to a task 
    const verifyUser=await TaskModal.findOne({utilisateur:userId});
    // 
    if(verifyUser){
      return res.status(400).json({message:"Unable to remove the user from the project. The user is currently assigned to an active task. Please reassign or complete the task before removing the user."})
    }
    const user = await User.findOne({ _id: userId });
    await UserProject.findOneAndDelete({
      user_id: userId,
      project_id: projectId,
    });
  
    return res.status(200).json({
      data: user,
      message: " Utilisateur retiré du projet avec succèss",
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
// get all users that have been associated to a project

exports.getUsersFromProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log(projectId)
    const usersproject = await UserProject.find({ project_id: projectId });
    return res.status(200).json({ data: usersproject });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
exports.getUsersProject = async (req, res) => {
  try {
    const usersproject = await UserProject.find();
    return res.status(200).json({ data: usersproject });
  } catch (error) {
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};
