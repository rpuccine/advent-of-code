const readline = require('readline');
const fs = require('fs');

// Initialization
const rl = readline.createInterface(fs.createReadStream('input.txt'));
const rulesMap = new Map();
let sumCorrectUpdates = 0;
let sumIncorrectUpdates = 0;

// Retrieves or initializes the array associated with a given key
const getArrayOfKey = (key) => rulesMap.get(key) || rulesMap.set(key, []).get(key);

// Checks if pages are sorted correctly according to the rules
const checkPagesAreSorted = (pages) =>
  pages.every((val, index, arr) => {
    const setPagesBefore = new Set(arr.slice(0, index));
    return getArrayOfKey(val).every(rule => !setPagesBefore.has(rule));
  });

// Sorts pages to comply with the rules
const sortPages = (pages) => {
  let sortedPages = [...pages];
  let isSorted = false;

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < sortedPages.length; i++) {
      const val = sortedPages[i];
      const setPagesBefore = new Set(sortedPages.slice(0, i));
      const unsortedPagesBefore = getArrayOfKey(val).filter(rule => setPagesBefore.has(rule));

      if (unsortedPagesBefore.length > 0) {
        isSorted = false;
        const indexToInsertBefore = sortedPages.indexOf(unsortedPagesBefore[0]);

        // Recreate the sorted array
        sortedPages = [
          ...sortedPages.slice(0, i),
          ...sortedPages.slice(i + 1),
        ];
        sortedPages.splice(indexToInsertBefore, 0, val);
        break;
      }
    }
  }
  return sortedPages;
};

// Extracts the median value from an array (useful for calculations)
const getMedianValue = (pages) =>
  parseInt(pages[Math.floor(pages.length / 2)], 10);

// Main processing of the input file
const processInputFile = async () => {
  let processingRules = true;

  for await (const line of rl) {
    if (!line.trim()) {
      processingRules = false; // Transition between rules and page updates
      continue;
    }

    if (processingRules) {
      // Add rules to the Map
      const [key, value] = line.split('|');
      getArrayOfKey(key).push(value);
    } else {
      // Verify or sort the pages
      const pages = line.split(',');

      if (checkPagesAreSorted(pages)) {
        sumCorrectUpdates += getMedianValue(pages);
      } else {
        const sortedPages = sortPages(pages);
        sumIncorrectUpdates += getMedianValue(sortedPages);
      }
    }
  }

  // Display the final results
  console.log('sumCorrectUpdates:', sumCorrectUpdates);
  console.log('sumIncorrectUpdates:', sumIncorrectUpdates);
};

// Start processing
processInputFile();