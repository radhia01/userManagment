const express = require("express");
const { createRole, getRoles } = require("../controller/Role");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();
// ajouter un nouveau role
router.post("/roles", verifyToken, createRole);
// get roles
router.get("/roles", verifyToken, getRoles);
module.exports = router;
