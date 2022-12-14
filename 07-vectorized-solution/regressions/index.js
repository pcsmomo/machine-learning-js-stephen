const tf = require('@tensorflow/tfjs-node');
const loadCSV = require('./load-csv');
// const LinearRegression = require('./linear-regression-no-tf');
const LinearRegression = require('./linear-regression');

let { features, labels, testFeatures, testLabels } = loadCSV('./cars.csv', {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['horsepower', 'weight', 'displacement'],
  labelColumns: ['mpg'] // miles per gallon
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 100
});

regression.train();
const r2 = regression.test(testFeatures, testLabels);

console.log('R2 is', r2);

console.log(regression.mseHistory.length);
console.log(regression.mseHistory);
