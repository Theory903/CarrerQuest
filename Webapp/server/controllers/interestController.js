const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../db/intrestdata.json");

// Helper function to read JSON data
const readData = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write JSON data
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
};

// Fetch all interests
const getInterests = (req, res) => {
  try {
    const data = readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Update interests
const updateInterests = (req, res) => {
  const updatedData = req.body.data;

  try {
    writeData(updatedData);
    res.status(200).json({ message: "Interests updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update data" });
  }
};

// Seed default data
const seedInterests = (req, res) => {
  const defaultData = [
    { category: "STEM", score: 0, fullMark: 100 },
    { category: "Arts", score: 0, fullMark: 100 },
    { category: "Business", score: 0, fullMark: 100 },
    { category: "Social Sciences", score: 0, fullMark: 100 },
    { category: "Healthcare", score: 0, fullMark: 100 },
  ];

  try {
    writeData(defaultData);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to seed data" });
  }
};

module.exports = {
  getInterests,
  updateInterests,
  seedInterests,
};