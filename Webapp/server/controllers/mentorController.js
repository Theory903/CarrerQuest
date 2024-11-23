const path = require("path");
const fs = require("fs");

// Get the mentor list
const getMentors = (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../db/mentors.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const mentors = JSON.parse(rawData);
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Failed to fetch mentors:", error);
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
};

module.exports = { getMentors };