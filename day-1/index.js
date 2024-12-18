const fs = require('fs');
const readline = require('readline');

const [firstNumbers, secondNumbers] = [[], []];

readline.createInterface({ input: fs.createReadStream('input.txt') })
  .on('line', (line) => line.split(/\s+/)
    .map(Number)
    .forEach((n, i) => i ? secondNumbers.push(n) : firstNumbers.push(n)))
  .on('close', () => {
    firstNumbers.sort((a, b) => a - b);
    secondNumbers.sort((a, b) => a - b);

    const totalDistance = firstNumbers.reduce((acc, n, i) =>
      acc + Math.abs(n - secondNumbers[i]), 0);

    const frequencyMap = secondNumbers.reduce((map, n) => {
      map[n] = (map[n] || 0) + 1;
      return map;
    }, {});
    const similarityScore = firstNumbers.reduce((acc, n) =>
      acc + (n * (frequencyMap[n] || 0)), 0);

    console.log(`totalDistance : ${totalDistance} - similarityScore : ${similarityScore}`);
  });