const readline = require('readline');
const fs = require("fs");

let baseSafeReports = 0;
let safeReportsWithModule = 0;

const rl = readline.createInterface({ input: fs.createReadStream('input.txt') });

rl.on('line', (line) => {
  const reports = line.split(' ').map(Number);

  const baseSafe = isSafeReports(reports);
  const moduleSafe = baseSafe || isSafeReportsWithModule(reports);

  if (baseSafe) baseSafeReports++;
  if (moduleSafe) safeReportsWithModule++;
});

rl.on('close', () => {
  console.log(`Base safe reports: ${baseSafeReports} - With Module: ${safeReportsWithModule}`);
});

const isAllIncreasingAndStepsOk = (reports) =>
  reports.every(
    (_, i, arr) => i === 0 ||
      (arr[i] - arr[i - 1] >= 1 && arr[i] - arr[i - 1] <= 3)
  );

const isAllDecreasingAnsStepsOk = (reports) =>
  reports.every(
    (_, i, arr) => i === 0 ||
      (arr[i - 1] - arr[i] >= 1 && arr[i - 1] - arr[i] <= 3)
  );

const isSafeReports = (reports) =>
  isAllIncreasingAndStepsOk(reports) || isAllDecreasingAnsStepsOk(reports);

const isSafeReportsWithModule = (reports) =>
  reports.some((_, i) =>
    isSafeReports(reports.filter((_, index) => index !== i))
  );