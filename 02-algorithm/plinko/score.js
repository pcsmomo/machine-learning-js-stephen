const outputs = [];
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // debugger;
  console.log('the length of data: ', outputs.length);

  const [testSet, trainingSet] = splitDataset(outputs, 10);

  console.log(
    `testSet: ${testSet.length}, trainingSet: ${trainingSet.length} `
  );

  for (let i = 0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0]);
    console.log(bucket, testSet[i][3]);
  }

  // console.log('Your point will probably fall into', bucket);
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
