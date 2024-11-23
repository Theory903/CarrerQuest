const path = require("path");
const fs = require("fs");

// Fetch Participation Data
const getParticipationData = (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../db/participation.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const participationData = JSON.parse(rawData);
    res.status(200).json(participationData);
  } catch (error) {
    console.error("Failed to fetch participation data:", error);
    res.status(500).json({ error: "Failed to fetch participation data" });
  }
};

module.exports = { getParticipationData };