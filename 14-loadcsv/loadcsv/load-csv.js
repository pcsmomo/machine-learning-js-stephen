const fs = require('fs');
const _ = require('lodash');
const shuffleSeed = require('shuffle-seed');

function extractColumns(data, columnNames) {
  const headers = _.first(data);

  const indexes = _.map(columnNames, column => headers.indexOf(column));
  const extracted = _.map(data, row => _.pullAt(row, indexes)); // Returns the new array of elements at indexes

  return extracted;
}

function loadCSV(
  filename,
  {
    converters = {},
    dataColumns = [],
    labelColumns = [],
    shuffle = true,
    splitTest = false
  }
) {
  let data = fs.readFileSync(filename, { encoding: 'utf-8' });
  data = data.split('\n').map(row => row.split(','));
  data = data.map(row => _.dropRightWhile(row, val => val === '')); // drop trailing commas
  const headers = _.first(data);

  data = data.map((row, index) => {
    if (index === 0) {
      return row;
    }

    return row.map((element, index) => {
      if (converters[headers[index]]) {
        const converted = converters[headers[index]](element);
        return _.isNaN(converted) ? element : converted;
      }

      const result = parseFloat(element);
      return _.isNaN(result) ? element : result;
    });
  });

  let labels = extractColumns(data, labelColumns);
  data = extractColumns(data, dataColumns);

  // remove the first element which is [headers]
  data.shift();
  labels.shift();

  // Shuffle an Array with seed
  // for when more than two array need to be suffled in the same order
  if (shuffle) {
    data = shuffleSeed.shuffle(data, 'phrase'); // 'phrase' can be any string as long as using the same seed
    labels = shuffleSeed.shuffle(labels, 'phrase');
  }

  console.log(labels);
  console.log(data);

  if (splitTest) {
    const trainSize = _.isNumber(splitTest)
      ? splitTest
      : Math.floor(data.length / 2); // half

    return {
      features: data.slice(0, trainSize),
      labels: labels.slice(0, trainSize),
      testFeatures: data.slice(trainSize),
      testLabels: labels.slice(trainSize)
    };
  } else {
    return { features: data, labels };
  }
}

const { features, labels, testFeatures, testLabels } = loadCSV('data.csv', {
  dataColumns: ['height', 'value'],
  labelColumns: ['passed'],
  shuffle: true,
  splitTest: false, // number | boolean
  converters: {
    passed: val => val === 'TRUE' // ? true : false
    // passed: val => (val === 'TRUE' ? 1 : 0)
  }
});

console.log('Features', features);
console.log('Labels', labels);
console.log('testFeatures', testFeatures);
console.log('testLabels', testLabels);
