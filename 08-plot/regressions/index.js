const tf = require('@tensorflow/tfjs-node');
const plot = require('node-remote-plot');
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

console.log(regression.mseHistory);
console.log('MSE History:', regression.mseHistory.length);

// generate plot.png file
plot({
  x: regression.mseHistory.reverse(),
  xLabel: 'Iteration #',
  yLabel: 'Mean Squared Error'
});

console.log('R2 is', r2);
