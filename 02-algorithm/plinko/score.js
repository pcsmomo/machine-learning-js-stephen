const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // debugger;
  console.log('the length of data: ', outputs.length);

  const testSetSize = 100;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  // Get the accuracy
  // let numberCorrect = 0;
  // console.log(
  //   `testSet: ${testSet.length}, trainingSet: ${trainingSet.length} `
  // );

  // for (let i = 0; i < testSet.length; i++) {
  //   const bucket = knn(trainingSet, testSet[i][0]);
  //   const actualBucket = testSet[i][3];
  //   if (bucket === actualBucket) {
  //     numberCorrect++;
  //   }
  //   console.log(bucket, actualBucket);
  // }

  // console.log('Accuracy:', numberCorrect / testSetSize);

  _.range(1, 20).forEach(k => {
    // Get the accuracy with lodash
    const accuracy = _.chain(testSet)
      .filter(testPoint => knn(trainingSet, testPoint[0], k) === testPoint[3])
      .size()
      .divide(testSetSize)
      .value();

    console.log('For k of', k, 'Accuracy:', accuracy);
  });
}

function knn(data, point, k) {
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
