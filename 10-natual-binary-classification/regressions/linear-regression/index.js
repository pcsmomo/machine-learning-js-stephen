const tf = require('@tensorflow/tfjs-node');
const plot = require('node-remote-plot'); // generate an image
// const { plot: plotlib } = require('nodeplotlib'); // plotting on the Nest server

const loadCSV = require('../load-csv');
const LinearRegression = require('./linear-regression');

let { features, labels, testFeatures, testLabels } = loadCSV(
  '../data/cars.csv',
  {
    shuffle: true,
    splitTest: 50,
    dataColumns: ['horsepower', 'weight', 'displacement'],
    labelColumns: ['mpg'] // miles per gallon
  }
);

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 3, // 100
  batchSize: 10
});

regression.train();
const r2 = regression.test(testFeatures, testLabels);

// console.log(regression.mseHistory);
// console.log('MSE History:', regression.mseHistory.length);

// generate plot.png file
const reversedMseHistory = [...regression.mseHistory].reverse();
// plot({
//   x: reversedMseHistory,
//   xLabel: 'Iteration #',
//   yLabel: 'Mean Squared Error'
// });

console.log('R2 is', r2);
// plot on the browser
// plotlib([{ y: reversedMseHistory }], {
//   xaxis: { title: { text: 'Iteration #' } },
//   yaxis: { title: { text: 'Mean Squared Error' } }
// });

// dataColumns: ['horsepower', 'weight', 'displacement'],
regression.predict([[120, 2, 380]]).print();
