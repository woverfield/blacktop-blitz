const { exec } = require("child_process");

const classplayersJSON = require("../data/classplayers.json");
const alltplayersJSON = require("../data/alltplayers.json");
const currplayersJSON = require("../data/currplayers.json");
const fs = require("fs").promises;

const combinedArray = [
  ...classplayersJSON,
  ...alltplayersJSON,
  ...currplayersJSON,
];

const combinedJSON = JSON.stringify(combinedArray, null, 4);

const writeToJson = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
    console.log(`Data written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}: ${error}`);
  }
};

writeToJson("../data/players.json", combinedJSON);
