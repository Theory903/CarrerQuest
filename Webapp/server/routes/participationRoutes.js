const express = require("express");
const { getParticipationData } = require("../controllers/participationController");

const router = express.Router();

// Define the route to get participation data
router.get("/", getParticipationData);

module.exports = router;