const express = require("express");
const path = require("path");
const { createRequestLogger } = require("./middleware/requestLogger");
const { sanitizeRequestData } = require("./middleware/sanitizeInput");
const { connectDatabase } = require("./db");
const sensitiveRoutes = require("./routes/sensitiveRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  createRequestLogger({
    logDir: path.join(__dirname, "logs"),
    logFileName: "requests.log"
  })
);

app.use(sanitizeRequestData);

app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/sensitive", sensitiveRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  connectDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Assignment server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error.message);
      process.exit(1);
    });
}

module.exports = app;
