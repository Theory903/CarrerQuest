const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../db/careerTree.json");

// Controller to fetch career tree data
const getCareerTree = (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    const careerTree = JSON.parse(data);
    res.status(200).json(careerTree);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch career tree data." });
  }
};

module.exports = { getCareerTree };