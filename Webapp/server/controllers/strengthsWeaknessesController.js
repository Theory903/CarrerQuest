const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../db/subjects.json");

// Helper functions
const readData = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
};

// Controller functions
const getSubjects = (req, res) => {
  try {
    const data = readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const updateSubjects = (req, res) => {
  const updatedData = req.body.data;

  try {
    writeData(updatedData);
    res.status(200).json({ message: "Subjects updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update data" });
  }
};

const seedSubjects = (req, res) => {
  const defaultData = [
    { subject: "Mathematics", score: 90, type: "strength" },
    { subject: "Science", score: 80, type: "strength" },
    { subject: "Language Arts", score: 60, type: "weakness" },
    { subject: "Social Studies", score: 70, type: "weakness" },
    { subject: "Physical Education", score: 85, type: "strength" },
  ];

  try {
    writeData(defaultData);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to seed data" });
  }
};

module.exports = {
  getSubjects,
  updateSubjects,
  seedSubjects,
};