const express = require("express");

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  removeProject,
  removeallProjects,
} = require("../controller/Project");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();
// ajouter un nouveau project
router.post("/projects", verifyToken, createProject);
// get all projects
router.get("/projects", verifyToken, getProjects);
// get project by id
router.get("/projects/:projectId", verifyToken, getProject);
// update project
router.put("/projects/:projectId", verifyToken, updateProject);
// delete project
router.delete("/projects/:projectId", verifyToken, removeProject);
// remove all
router.get("/remove/projects", verifyToken, removeallProjects);
module.exports = router;
