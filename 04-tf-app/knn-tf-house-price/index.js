require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');

function knn(features, labels, predictionPoint, k) {
  return (
    features
      .sub(predictionPoint)
      .pow(2)
      .sum(1)
      .pow(0.5)
      .expandDims(1)
      .concat(labels, 1)
      .unstack()
      .sort((a, b) => (a.arraySync()[0] > b.arraySync()[0] ? 1 : -1))
      .slice(0, k)
      .reduce((acc, pair) => {
        return acc + pair.arraySync()[1]; // the house value
      }, 0) / k
  );
}

let { features, labels, testFeatures, testLabels } = loadCSV(
  'kc_house_data.csv',
  {
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat', 'long'],
    labelColumns: ['price']
  }
);

features = tf.tensor(features);
labels = tf.tensor(labels);
// testFeatures = tf.tensor(testFeatures);
// testLabels = tf.tensor(testLabels);

// let's start it with only one predictionPoint
predictionPoint = tf.tensor(testFeatures[0]);

testFeatures.forEach((testPoint, i) => {
  const result = knn(features, labels, testPoint, 10);
  const expectedValue = testLabels[i][0];
  const err = (expectedValue - result) / expectedValue;
  console.log('Error:', `${Math.round(err * 100)}%`);
  console.log('Guess:', result, ', Expected', expectedValue);
});
