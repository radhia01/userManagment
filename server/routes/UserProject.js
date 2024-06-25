const express = require("express");
const {
  addUserToProject,
  getUsersFromProject,
  getUsersProject,
  removeUserFromProject,
} = require("../controller/UserProject");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();
// associate user to  project
router.get("/users/:userId/projects/:projectId", verifyToken, addUserToProject);
// delete user from project
router.delete(
  "/users/:userId/projects/:projectId",
  verifyToken,
  removeUserFromProject
);
// get users project
router.get("/users/project/:projectId", verifyToken, getUsersFromProject);
//
router.get("/users/projects", verifyToken, getUsersProject);
module.exports = router;
