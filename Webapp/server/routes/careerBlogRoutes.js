const express = require("express");
const { getCareerBlogs } = require("../controllers/careerBlogController");

const router = express.Router();

// GET /api/careerBlogs
router.get("/", getCareerBlogs);

module.exports = router;