const fs = require("fs");
const readline = require("readline");

const processFile = async (filePath) => {
  const regEx = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g;
  let finalSum = 0;
  let enable = true;

  const rl = readline.createInterface(fs.createReadStream(filePath));

  for await (const line of rl) {
    for (const match of line.matchAll(regEx)) {
      if (match[1] && match[2] && enable) {
        finalSum += parseInt(match[1], 10) * parseInt(match[2], 10);
      }
      if (match[0] === "don't()") enable = false;
      if (match[0] === "do()") enable = true;
    }
  }

  console.log("Final Sum:", finalSum);
};

processFile("input.txt");