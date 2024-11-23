const path = require("path");
const fs = require("fs");

// Submit a mentorship request
const submitRequest = (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../data/mentorshipRequests.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const requests = JSON.parse(rawData);

    const newRequest = {
      id: requests.length + 1,
      ...req.body,
      submittedAt: new Date().toISOString(),
    };

    requests.push(newRequest);
    fs.writeFileSync(dataPath, JSON.stringify(requests, null, 2));
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Failed to submit mentorship request:", error);
    res.status(500).json({ error: "Failed to submit mentorship request" });
  }
};

module.exports = { submitRequest };