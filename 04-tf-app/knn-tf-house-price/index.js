require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');

function knn(features, labels, predictionPoint, k) {
  const { mean, variance } = tf.moments(features, 0); // each column(=features)

  const scaledPrediction = predictionPoint.sub(mean).div(variance.pow(0.5));

  return (
    features
      .sub(mean)
      .div(variance.pow(0.5))
      // .sub(predictionPoint)
      .sub(scaledPrediction)
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
    dataColumns: ['lat', 'long', 'sqft_lot', 'sqft_living'],
    labelColumns: ['price']
  }
);

features = tf.tensor(features);
labels = tf.tensor(labels);
// testFeatures = tf.tensor(testFeatures);
// testLabels = tf.tensor(testLabels);

testFeatures.forEach((testPoint, i) => {
  const result = knn(features, labels, tf.tensor(testPoint), 10);
  const expectedValue = testLabels[i][0];
  const err = (expectedValue - result) / expectedValue;
  console.log(
    'Error:',
    `${Math.round(err * 100)}%`,
    'Guess:',
    result,
    ', Expected',
    expectedValue
  );
  // console.log('Error:', `${Math.round(err * 100)}%`);
  // console.log('Guess:', result, ', Expected', expectedValue);
});
