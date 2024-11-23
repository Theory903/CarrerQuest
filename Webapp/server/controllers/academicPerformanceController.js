const path = require("path");
const fs = require("fs");

const getAcademicPerformance = (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../db/academicPerformance.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const performanceData = JSON.parse(rawData);
    res.status(200).json(performanceData);
  } catch (error) {
    console.error("Failed to fetch academic performance data:", error);
    res.status(500).json({ error: "Failed to fetch academic performance data" });
  }
};

module.exports = { getAcademicPerformance };