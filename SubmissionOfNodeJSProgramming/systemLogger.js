const os = require('os');
const fs = require('fs');

setInterval(() => {
  const log = `
Time: ${new Date().toISOString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Total Memory: ${(os.totalmem() / 1024 ** 3).toFixed(2)} GB
Free Memory: ${(os.freemem() / 1024 ** 3).toFixed(2)} GB
------------------------
`;

  fs.appendFile('system.log', log, (err) => {
    if (err) console.error('Logging failed:', err);
  });

}, 5000);
