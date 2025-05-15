const { exec } = require("child_process");
const fs = require("fs").promises;

const runScript = (scriptPath) => {
  console.log(`Starting to run script: ${scriptPath}`);
  return new Promise((resolve, reject) => {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script ${scriptPath}: ${error}`);
        reject(error);
      }
      console.log(`Script ${scriptPath} output:`, stdout);
      resolve(stdout.trim());
    });
  });
};

const writeToJson = async (filePath, data) => {
  try {
    console.log(`Writing data to ${filePath}`);
    await fs.writeFile(filePath, data);
    console.log(`Data written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}: ${error}`);
  }
};

const main = async () => {
  try {
    console.log('Starting update process...');
    const scripts = [
      { scriptPath: "curr.js", outputPath: "../data/currplayers.json" },
      { scriptPath: "class.js", outputPath: "../data/classplayers.json" },
      { scriptPath: "allt.js", outputPath: "../data/alltplayers.json" },
    ];

    for (const { scriptPath, outputPath } of scripts) {
      console.log(`Processing ${scriptPath}...`);
      const scriptOutput = await runScript(scriptPath);
      console.log(`Got output from ${scriptPath}, length: ${scriptOutput.length}`);
      if (scriptOutput.length > 1) {
        await writeToJson(outputPath, scriptOutput);
      } else {
        console.error(`No data received from ${scriptPath}`);
      }
    }
    console.log('Update process completed');
  } catch (error) {
    console.error(`Error during execution: ${error}`);
  }
};

main();
