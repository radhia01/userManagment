const express = require("express");
const {
  createTask,
  getTasks,
  getTasksByProject,
  deleteTask,
  updateTask,
} = require("../controller/Task");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
// ajouter un nouveau task
router.post("/tasks", verifyToken, createTask);
// get tasks
router.get("/tasks", verifyToken, getTasks);
// get tasks by project
router.get("/tasks/projects/:projectId", verifyToken,getTasksByProject);
// delete task
router.delete("/tasks/:taskId",verifyToken, deleteTask);
// update task
router.put("/tasks/:taskId", verifyToken,updateTask);
module.exports = router;
