const _ = require('lodash');

const pointA = [1, 1];
const pointB = [4, 5];

const result =
  _.chain(pointA)
    .zip(pointB)
    .map(([a, b]) => (a - b) ** 2)
    .sum()
    .value() ** 0.5;

console.log(result);
