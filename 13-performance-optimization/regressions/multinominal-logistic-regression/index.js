const tf = require('@tensorflow/tfjs-node');
const plot = require('node-remote-plot'); // generate an image
const _ = require('lodash');
const mnist = require('mnist-data');
const LogisticRegression = require('./logistic-regression');

// wrap the logic in the function,
// so the garbage collector can retrive so much memory
function loadData() {
  const mnistData = mnist.training(0, 10000);
  // console.log(mnistData.images.values);

  // 28px x 28px : 784px
  const features = mnistData.images.values.map(image => _.flatMap(image));
  // console.log(features);
  // console.log(mnistData.labels.values);
  const encodedLabels = mnistData.labels.values.map(label => {
    const row = new Array(10).fill(0);
    row[label] = 1;
    return row;
  });
  // console.log(encodedLabels);

  return { features, labels: encodedLabels };
}

const { features, labels } = loadData();

const regression = new LogisticRegression(features, labels, {
  learningRate: 1,
  iterations: 20,
  batchSize: 100
});

regression.train();

const testMnistData = mnist.testing(0, 1000);
// console.log(testMnistData);
const testFeatures = testMnistData.images.values.map(image => _.flatMap(image));
const testEncodedLabels = testMnistData.labels.values.map(label => {
  const row = new Array(10).fill(0);
  row[label] = 1;
  return row;
});

const accuracy = regression.test(testFeatures, testEncodedLabels);
console.log('Accuracy is', accuracy);

console.log(regression.costHistory);
plot({
  x: regression.costHistory.reverse()
});
