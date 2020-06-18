import filesystem from "fs";

function showAndSaveLog(logText: string, hour: string): void {
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

export default showAndSaveLog;
