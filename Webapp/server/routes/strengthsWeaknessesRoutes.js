const express = require("express");
const {
  getSubjects,
  updateSubjects,
  seedSubjects,
} = require("../controllers/strengthsWeaknessesController");

const router = express.Router();

// Define routes
router.get("/", getSubjects); // Fetch all subjects
router.put("/", updateSubjects); // Update subjects
router.post("/seed", seedSubjects); // Seed default subjects

module.exports = router;