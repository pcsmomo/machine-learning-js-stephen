const _ = require('lodash');
// import _ from 'lodash';  // "type": "module" in package.json is needed

const outputs = [
  [10, 0.5, 16, 1],
  [200, 0.5, 16, 4],
  [350, 0.5, 16, 4],
  [600, 0.5, 16, 5]
];
const predictionPoint = 300;
const k = 3;

function distance(point) {
  return Math.abs(point - predictionPoint);
}

const result = _.chain(outputs)
  .map(row => [distance(row[0]), row[3]])
  .sortBy(row => row[0])
  .slice(0, k)
  .countBy(row => row[1])
  .toPairs()
  .sortBy(row => row[1])
  .last()
  .first()
  .parseInt()
  .value();

console.log(result);

// Print all steps
console.log('\n== step by step ==');
console.log(outputs);
// 1. map the output
const mappedOutput = _.map(outputs, row => [distance(row[0]), row[3]]);
console.log('1. map to get distances');
console.log(mappedOutput);

// 2. sorted
const sortedOutput = _.sortBy(mappedOutput, row => row[0]);
console.log('2. sortBy distance');
console.log(sortedOutput);

// 3. sliced
const slicedOutput = _.slice(sortedOutput, 0, k);
console.log('3. slice');
console.log(slicedOutput);

// 4. counted
const countedOutput = _.countBy(slicedOutput, row => row[1]);
console.log('4. countBy');
console.log(countedOutput);

// 5. to Pairs
const pairedOutput = _.toPairs(countedOutput);
console.log('5. toPairs');
console.log(pairedOutput);

// 6. sorted
const sortedByRow1Output = _.sortBy(pairedOutput, row => row[1]);
console.log('6. sortBy count');
console.log(sortedByRow1Output);

// 7. last
const lastOutput = _.last(sortedByRow1Output);
console.log('7. last');
console.log(lastOutput);

// 8. first
const firstOutput = _.first(lastOutput);
console.log('8. first');
console.log(firstOutput);

// 9. parseInt
const numberedOutput = _.parseInt(firstOutput);
console.log('9. parseInt');
console.log(numberedOutput);
