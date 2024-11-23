const express = require("express");
const { getAcademicPerformance } = require("../controllers/academicPerformanceController");

const router = express.Router();

// Route to get academic performance data
router.get("/", getAcademicPerformance);

module.exports = router;