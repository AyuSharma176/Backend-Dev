const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

const readStream = fs.createReadStream(filePath, {
  encoding: "utf8",
});

readStream.on("data", (chunk) => {
  console.log("Received chunk:\n", chunk);
});

readStream.on("end", () => {
  console.log("No more data to read.");
});

readStream.on("error", (err) => {
  console.error("Error reading file:", err.message);
});
