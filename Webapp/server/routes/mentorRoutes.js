const express = require("express");
const { getMentors } = require("../controllers/mentorController");

const router = express.Router();

// GET /api/mentors
router.get("/", getMentors);

module.exports = router;