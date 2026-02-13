const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const outputPath = path.join(__dirname, "output.txt");

const readStream = fs.createReadStream(inputPath, {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream(outputPath);

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Data successfully copied from input.txt to output.txt");
});

readStream.on("error", (err) => {
  console.error("Read error:", err.message);
});

writeStream.on("error", (err) => {
  console.error("Write error:", err.message);
});
