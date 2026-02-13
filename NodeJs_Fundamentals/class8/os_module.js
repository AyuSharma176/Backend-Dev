const os = require("os");
const fs = require("fs");
const path = require("path");

const logfile = path.join(__dirname, "system_info.log");

function logSystemInfo() {
  const timestamp = new Date().toISOString();

  const platform = os.platform();
  const arch = os.arch();
  const cpuCores = os.cpus().length;
  const totalMemory = (os.totalmem() / 1024 ** 3).toFixed(2); 
  const freeMemory = (os.freemem() / 1024 ** 3).toFixed(2); 
  const uptime = (os.uptime() / 3600).toFixed(2); 
  const logEntry = `Time: ${timestamp}
Platform: ${platform}
Architecture: ${arch}
CPU Cores: ${cpuCores}
Total Memory: ${totalMemory} GB
Free Memory: ${freeMemory} GB
Uptime: ${uptime} hours
------------------------
`;
fs.appendFile(logfile, logEntry, (err) => {
  if (err) {
    console.error("Error writing to log file:", err);
  }else{
    console.log("System information logged.");
  }
});
}
setInterval(logSystemInfo, 5000);
console.log(`Logging system information to ${logfile} every 5 seconds.`);