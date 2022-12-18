const tf = require('@tensorflow/tfjs-node');
const loadCSV = require('./load-csv');
// const LinearRegression = require('./linear-regression-no-tf');
const LinearRegression = require('./linear-regression');

let { features, labels, testFeatures, testLabels } = loadCSV('./cars.csv', {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['horsepower'],
  labelColumns: ['mpg'] // miles per gallon
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.0001,
  iterations: 100
});

regression.train();

// console.log(
//   'Updated M is:',
//   regression.weights.arraySync()[1],
//   'Updated B is:',
//   regression.weights.arraySync()[0]
// );
