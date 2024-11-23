const express = require("express");
const { getCareerTree } = require("../controllers/careerTreeController");

const router = express.Router();

// Route to get career tree data
router.get("/", getCareerTree);

module.exports = router;