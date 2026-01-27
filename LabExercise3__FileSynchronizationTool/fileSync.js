const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

async function syncDirectories(sourceDir, targetDir) {
  try {
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(targetDir, file);

      const srcStat = await fs.stat(srcPath);

      if (srcStat.isDirectory()) {
        await syncDirectories(srcPath, destPath);
      } else {
        try {
          await fs.access(destPath);
        } catch {
          // File does not exist → copy using stream
          await new Promise((resolve, reject) => {
            const readStream = fsSync.createReadStream(srcPath);
            const writeStream = fsSync.createWriteStream(destPath);

            readStream.pipe(writeStream);
            writeStream.on("finish", resolve);
            readStream.on("error", reject);
            writeStream.on("error", reject);
          });
          console.log("Copied:", file);
        }
      }
    }
  } catch (err) {
    console.error("Sync Error:", err.message);
  }
}

// Usage
syncDirectories("./source", "./target");
