const readline = require("readline");
const fs = require("fs");

const map = [];
let xmasCount = 0;
let x_masCount = 0;

const countCorrectDirections = (checkMatrix, raw, col) => {
  let nbGoodDirections = 0;

  for (const direction of checkMatrix) {
    for (const charIndexes of direction) {
      const newRaw = raw + charIndexes[0];
      const newCol = col + charIndexes[1];

      if (
        newRaw >= map.length ||
        newRaw < 0 ||
        newCol >= map[newRaw].length ||
        newCol < 0
      ) break; // check new index not out of bound, if not go to next direction
      if (map[newRaw][newCol] !== charIndexes[2]) break; // check if char ok, if not go to next direction
      if (charIndexes[2] === 'S') nbGoodDirections++; // if last char of direction ok, count ++
    }
  }

  return nbGoodDirections;
};

const xmasCheck = (raw) => {
  const xmasDirectionsMatrix = [
    [[0, 1,'M'], [0, 2,'A'], [0, 3,'S']], // E
    [[1, 1,'M'], [2, 2,'A'], [3, 3,'S']], // SE
    [[1, 0,'M'], [2, 0,'A'], [3, 0,'S']], // S
    [[1,-1,'M'], [2,-2,'A'], [3,-3,'S']], // SO
    [[0,-1,'M'], [0,-2,'A'], [0,-3,'S']], // O
    [[-1,-1,'M'],[-2,-2,'A'],[-3,-3,'S']],// NO
    [[-1,0,'M'], [-2,0,'A'], [-3,0,'S']], // N
    [[-1,1,'M'], [-2,2,'A'], [-3,3,'S']], // NE
  ];

  let startSearchFrom = 0;
  let currentXIndexInRaw = map[raw].indexOf('X', startSearchFrom);

  while (currentXIndexInRaw !== -1) {
    xmasCount += countCorrectDirections(xmasDirectionsMatrix, raw, currentXIndexInRaw);
    startSearchFrom = currentXIndexInRaw + 1;
    currentXIndexInRaw = map[raw].indexOf('X', startSearchFrom);
  }
};

const x_masCheck = (raw) => {
  const x_masDirectionsMatrix = [
    [[1,1,'M'], [-1, -1,'S']], // SE
    [[-1,-1,'M'],[1, 1,'S']],  // NO
    [[1,-1,'M'], [-1, 1,'S']], // SO
    [[-1,1,'M'], [1,-1,'S']],  // NE
  ];

  let startSearchFrom = 0;
  let currentAIndexInRaw = map[raw].indexOf('A', startSearchFrom);

  while (currentAIndexInRaw !== -1) {
    if (countCorrectDirections(x_masDirectionsMatrix, raw, currentAIndexInRaw) === 2) x_masCount++;
    startSearchFrom = currentAIndexInRaw + 1;
    currentAIndexInRaw = map[raw].indexOf('A', startSearchFrom);
  }
};



const processFile = async (filepath) => {
  // build map
  const rl = readline.createInterface(fs.createReadStream(filepath));
  for await (const line of rl) {
    map.push([...line]);
  }

  // iterate raw and search x in it
  for (let raw = 0; raw < map.length; raw++) {
    xmasCheck(raw);
    x_masCheck(raw);
  }

  console.log('XMAS count : ', xmasCount);
  console.log('X_MAS count : ', x_masCount);
};

processFile('input.txt');