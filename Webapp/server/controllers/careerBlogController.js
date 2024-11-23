const path = require("path");
const fs = require("fs");

// Fetch career blog posts
const getCareerBlogs = (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../db/careerBlogs.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const blogs = JSON.parse(rawData);
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Failed to fetch career blogs:", error);
    res.status(500).json({ error: "Failed to fetch career blogs" });
  }
};

module.exports = { getCareerBlogs };