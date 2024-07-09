const { exec } = require("child_process");
const fs = require("fs").promises;

const runScript = (scriptPath) => {
  return new Promise((resolve, reject) => {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error}`);
        reject(error);
      }
      resolve(stdout.trim());
    });
  });
};

const writeToJson = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
    console.log(`Data written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}: ${error}`);
  }
};

const main = async () => {
  try {
    const scripts = [
      { scriptPath: "curr.js", outputPath: "../data/currplayers.json" },
      { scriptPath: "class.js", outputPath: "../data/classplayers.json" },
      { scriptPath: "allt.js", outputPath: "../data/alltplayers.json" },
    ];

    for (const { scriptPath, outputPath } of scripts) {
      const scriptOutput = await runScript(scriptPath);
      if (scriptOutput.length > 1) {
        await writeToJson(outputPath, scriptOutput);
      }
    }
  } catch (error) {
    console.error(`Error during execution: ${error}`);
  }
};

main();
