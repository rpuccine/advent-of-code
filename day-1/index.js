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

    const totalDifference = firstNumbers.reduce((acc, n, i) =>
      acc + Math.abs(n - secondNumbers[i]), 0);

    console.log('Somme des écarts absolus :', totalDifference);
  });