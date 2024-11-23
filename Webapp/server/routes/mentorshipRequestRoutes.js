const express = require("express");
const { submitRequest } = require("../controllers/mentorshipRequestController");

const router = express.Router();

// POST /api/mentorshipRequests
router.post("/", submitRequest);

module.exports = router;