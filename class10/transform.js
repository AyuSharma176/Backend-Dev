const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const inputPath = path.join(__dirname, "input.txt");
const outputPath = path.join(__dirname, "output.txt");
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperChunk = chunk.toString().toUpperCase();
    callback(null, upperChunk);
  },
});

const readStream = fs.createReadStream(inputPath);
const writeStream = fs.createWriteStream(outputPath);

readStream
  .pipe(upperCaseTransform)
  .pipe(writeStream);

writeStream.on("finish", () => {
  console.log("File transformed to UPPERCASE successfully");
});

readStream.on("error", (err) => {
  console.error("Read error:", err.message);
});

writeStream.on("error", (err) => {
  console.error("Write error:", err.message);
});
