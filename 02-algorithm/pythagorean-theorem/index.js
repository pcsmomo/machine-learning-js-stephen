const _ = require('lodash');

const pointA = [1, 1];
const pointB = [4, 5];

console.log('pointA', pointA);
console.log('pointB', pointB);

const result =
  _.chain(pointA)
    .zip(pointB)
    .map(([a, b]) => (a - b) ** 2)
    .sum()
    .value() ** 0.5;

console.log(result);

// Print all steps
console.log();
console.log('== step by step ==');

// 1. zip
const zippedOutput = _.zip(pointA, pointB);
console.log('1. zip');
console.log(zippedOutput);

// 2. map
const mappedOutput = _.map(zippedOutput, ([a, b]) => (a - b) ** 2);
console.log('2. map');
console.log(mappedOutput);

// 3. sum
const summedOutput = _.sum(mappedOutput);
console.log('3. sum');
console.log(summedOutput);
