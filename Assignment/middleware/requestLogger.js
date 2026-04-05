const fs = require("fs");
const path = require("path");

function createRequestLogger(options = {}) {
  const logDir = options.logDir || path.join(__dirname, "..", "logs");
  const logFileName = options.logFileName || "requests.log";
  const logPath = path.join(logDir, logFileName);

  fs.mkdirSync(logDir, { recursive: true });

  return function requestLogger(req, res, next) {
    const start = process.hrtime.bigint();

    res.on("finish", () => {
      const end = process.hrtime.bigint();
      const responseTimeMs = Number(end - start) / 1e6;
      const timestamp = new Date().toISOString();

      const line = [
        `[${timestamp}]`,
        `${req.method}`,
        `${req.originalUrl || req.url}`,
        `status=${res.statusCode}`,
        `time=${responseTimeMs.toFixed(2)}ms`
      ].join(" | ");

      fs.promises
        .appendFile(logPath, line + "\n", "utf8")
        .catch((error) => {
          console.error("Failed to write request log:", error.message);
        });
    });

    next();
  };
}

module.exports = {
  createRequestLogger
};
