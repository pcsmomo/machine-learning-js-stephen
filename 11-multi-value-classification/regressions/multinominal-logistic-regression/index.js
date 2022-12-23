const tf = require('@tensorflow/tfjs-node');
const plot = require('node-remote-plot'); // generate an image
const loadCSV = require('../load-csv');
const LogisticRegression = require('./logistic-regression');

const { features, labels, testFeatures, testLabels } = loadCSV(
  '../data/cars.csv',
  {
    dataColumns: ['horsepower', 'displacement', 'weight'],
    labelColumns: ['mpg'],
    shuffle: true,
    splitTest: 50,
    converters: {
      mpg: value => {
        const mpg = parseFloat(value);

        if (mpg < 15) {
          return [1, 0, 0];
        } else if (mpg < 30) {
          return [0, 1, 0];
        } else {
          return [0, 1, 1];
        }
      }
    }
  }
);

console.log(labels);

// const regression = new LogisticRegression(features, labels, {
//   learningRate: 0.5,
//   iterations: 100,
//   batchSize: 5, // 50
//   decisionBoundary: 0.5
// });

// regression.train();

// dataColumns: ['horsepower', 'displacement', 'weight'],
// regression
//   .predict([
//     [130, 307, 1.75],
//     [88, 97, 1.07]
//   ])
//   .print();

// console.log(regression.test(testFeatures, testLabels)); // percentage: 88% (not bad!)

// console.log(regression.costHistory);
// plot({
//   x: regression.costHistory.reverse()
// });
