const filesystem = require("fs");

function showAndSaveLog(logText, hour) {
  const string = `[${hour}] ${logText}`;

  filesystem.writeFile(
    "src/log/logs.txt",
    `${string}\n`,
    { flag: "a" },
    (err) => {
      if (err) {
        throw err;
      }
    },
  );

  console.log(string);
}

module.exports = showAndSaveLog;
