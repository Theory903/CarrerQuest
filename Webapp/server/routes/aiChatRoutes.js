const express = require("express");
const { getAIResponse } = require("../controllers/aiChatController");

const router = express.Router();

// Define routes
router.post("/", getAIResponse);

module.exports = router; // Correctly export the router