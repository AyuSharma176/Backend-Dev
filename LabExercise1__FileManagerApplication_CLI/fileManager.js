const fs = require("fs/promises");
const path = require("path");

const [, , command, ...args] = process.argv;

async function fileManager() {
  try {
    switch (command) {
      case "read": {
        const filePath = path.resolve(args[0]);
        const data = await fs.readFile(filePath, "utf8");
        console.log(data);
        break;
      }

      case "write": {
        const filePath = path.resolve(args[0]);
        const content = args[1];
        await fs.writeFile(filePath, content, "utf8");
        console.log("File written successfully");
        break;
      }

      case "copy": {
        const src = path.resolve(args[0]);
        const dest = path.resolve(args[1]);
        await fs.copyFile(src, dest);
        console.log("File copied successfully");
        break;
      }

      case "delete": {
        const filePath = path.resolve(args[0]);
        await fs.unlink(filePath);
        console.log("File deleted successfully");
        break;
      }

      case "list": {
        const dirPath = path.resolve(args[0]);
        const files = await fs.readdir(dirPath);
        files.forEach(file => console.log(file));
        break;
      }

      default:
        console.log("Invalid command");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

fileManager();
