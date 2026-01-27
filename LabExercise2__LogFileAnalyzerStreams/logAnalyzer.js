const fs = require("fs");
const readline = require("readline");
const path = require("path");

const logFilePath = path.join(__dirname, "app.log");

const stats = {
  INFO: 0,
  WARNING: 0,
  ERROR: 0,
};

const readStream = fs.createReadStream(logFilePath, { encoding: "utf8" });

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  if (line.includes("INFO")) stats.INFO++;
  else if (line.includes("WARNING")) stats.WARNING++;
  else if (line.includes("ERROR")) stats.ERROR++;
});

rl.on("close", () => {
  console.log("Log Summary Report");
  console.log("------------------");
  console.log("INFO:", stats.INFO);
  console.log("WARNING:", stats.WARNING);
  console.log("ERROR:", stats.ERROR);
});

rl.on("error", (err) => {
  console.error("Stream Error:", err.message);
});
