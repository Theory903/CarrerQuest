const express = require("express");
const { getGoals } = require("../controllers/goalsController");

const router = express.Router();

// Route to get all goals
router.get("/", getGoals);

module.exports = router;