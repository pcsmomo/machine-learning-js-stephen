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
      .filter(
        testPoint => knn(trainingSet, _.initial(testPoint), k) === testPoint[3]
      )
      .size()
      .divide(testSetSize)
      .value();

    console.log('For k of', k, 'Accuracy:', accuracy);
  });
}

function knn(data, point, k) {
  // point has 3 values!!
  return _.chain(data)
    .map(row => {
      return [distance(_.initial(row), point), _.last(row)];
    })
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
  // pointA = 300, pointB = 350
  // pointA = [300, .5, 16], pointB = [350, .55, 16]
  // return Math.abs(pointA - pointB);

  // pythagorean-theorem
  // const pointA = [1, 1];
  // const pointB = [4, 5];
  const result =
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5;

  // console.log(result);
  return result;
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  // after learning, we could verify the result comparing to this testSet
  const testSet = _.slice(shuffled, 0, testCount); // to testCount
  // the algorithm actually guesses after learning trainingSet
  const trainingSet = _.slice(shuffled, testCount); // from testCount to the end

  return [testSet, trainingSet];
}

function minMax(data, featureCount) {
  // [
  //   [10, 0.5, 16, 1],
  //   [200, 0.5, 16, 4],
  //   [350, 0.5, 16, 4],
  //   [600, 0.5, 16, 5]
  // ];
  const clonedData = _.cloneDeep(data);

  for (let i = 0; i < featureCount; i++) {
    const column = clonedData.map(row => row[i]);

    const min = _.min(column);
    const max = _.max(column);

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }

  return clonedData;
}
