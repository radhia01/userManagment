const express = require("express");
const {
  createStatus,
  getStatus,
  getStatusById,
} = require("../controller/Status");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();
// ajouter un nouveau status
router.post("/status", verifyToken, createStatus);
// get status
router.get("/status", verifyToken, getStatus);
// get status by id
router.get("/status/:id", verifyToken, getStatusById);
module.exports = router;
