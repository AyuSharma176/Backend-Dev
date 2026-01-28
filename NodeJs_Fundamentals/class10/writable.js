const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "output.txt");

const writeStream = fs.createWriteStream(filePath);

writeStream.write("Hello from writable stream \n");
writeStream.write("This data is written using Node.js\n");

writeStream.end(() => {
  console.log("Writing completed.");
});

writeStream.on("error", (err) => {
  console.error("Error writing file:", err.message);
});
