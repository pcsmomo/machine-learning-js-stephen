const _ = require('lodash');

const outputs = [
  [10, 0.5, 16, 1],
  [200, 0.5, 16, 4],
  [350, 0.5, 16, 4],
  [600, 0.5, 16, 5]
];
const predictionPoint = 3000;
const k = 3;

function distance(point) {
  return Math.abs(point - predictionPoint);
}

_.chain(outputs)
  .map(row => [distance(row[0]), row[3]])
  .sortBy(row => row[0])
  .slice(0, k);
