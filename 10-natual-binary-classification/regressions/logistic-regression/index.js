const tf = require('@tensorflow/tfjs-node');
const loadCSV = require('../load-csv');

const { features, labels, testFeatures, testLabels } = loadCSV(
  '../data/cars.csv',
  {
    dataColumns: ['horsepower', 'weight', 'displacement'],
    labelColumns: ['passedemissions'],
    shuffle: true,
    splitTest: 50,
    converters: {
      passedemissions: val => (val === 'TRUE' ? 1 : 0)
    }
  }
);

console.log(labels);