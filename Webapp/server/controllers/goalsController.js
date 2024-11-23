const path = require("path");
const fs = require("fs");

// Fetch goals from JSON file
const getGoals = (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../db/goals.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const goals = JSON.parse(rawData);
    res.status(200).json(goals);
  } catch (error) {
    console.error("Failed to fetch goals:", error);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

module.exports = { getGoals };