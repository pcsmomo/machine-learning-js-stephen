const outputs = [];
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // debugger;
  console.log('the length of data: ', outputs.length);

  const testSetSize = 10;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  // Get the accuracy with lodash
  const accuracy = _.chain(testSet)
    .filter(testPoint => knn(trainingSet, testPoint[0]) === testPoint[3])
    .size()
    .divide(testSetSize)
    .value();

  console.log('Accuracy:', accuracy);
}

function knn(data, point) {
  return _.chain(data)
    .map(row => [distance(row[0], point), row[3]])
    .sortBy(row => row[0])
    .slice(0, k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  // after learning, we could verify the result comparing to this testSet
  const testSet = _.slice(shuffled, 0, testCount); // to testCount
  // the algorithm actually guesses after learning trainingSet
  const trainingSet = _.slice(shuffled, testCount); // from testCount to the end

  return [testSet, trainingSet];
}
