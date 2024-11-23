require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const interestRoutes = require("./routes/interestRoutes");
const strengthsWeaknessesRoutes = require("./routes/strengthsWeaknessesRoutes");
const careerTreeRoutes = require("./routes/careerTreeRoutes");
const goalsRoutes = require("./routes/goalsRoutes");
const academicPerformanceRoutes = require("./routes/academicPerformanceRoutes");
const participationRoutes = require("./routes/participationRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const mentorshipRequestRoutes = require("./routes/mentorshipRequestRoutes");
const aiChatRoutes = require("./routes/aiChatRoutes");
const careerBlogRoutes = require("./routes/careerBlogRoutes");

const app = express();

// Middleware
app.use(helmet());
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-production-url.com"]
    : ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(bodyParser.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.send({ status: "OK", uptime: process.uptime() });
});

// Routes
app.use("/api/interests", interestRoutes);
app.use("/api/subjects", strengthsWeaknessesRoutes);
app.use("/api/careerTree", careerTreeRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/academicPerformance", academicPerformanceRoutes);
app.use("/api/participation", participationRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/mentorshipRequests", mentorshipRequestRoutes);
app.use("/api/chat", aiChatRoutes);
app.use("/api/careerBlogs", careerBlogRoutes);

// Not Found Handler
app.use((req, res, next) => {
  res.status(404).send({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(err.status || 500).send({
    error: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit();
});