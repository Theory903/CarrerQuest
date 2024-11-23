const express = require("express");
const router = express.Router();

const {
  getInterests,
  updateInterests,
  seedInterests,
} = require("../controllers/interestController");

// Routes
router.get("/", getInterests); // Fetch all interests
router.put("/", updateInterests); // Update interests
router.post("/seed", seedInterests); // Seed default interests

module.exports = router;