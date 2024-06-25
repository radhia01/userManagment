const express = require("express");
const {
  createPriority,
  getAllPriorities,
  getPrioriteById,
} = require("../controller/Priority");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
// ajouter un nouveau priority
router.post("/priorities", verifyToken, createPriority);
// get priorities
router.get("/priorities", verifyToken, getAllPriorities);
// get priority by id
router.get("/priorities/:id", verifyToken, getPrioriteById);
module.exports = router;
