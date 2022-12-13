const tf = require('@tensorflow/tfjs-node');

const features = tf.tensor([
  [-121, 47],
  [-121.2, 46.5],
  [-122, 46.4],
  [-120.9, 46.7]
]);

const labels = tf.tensor([[200], [250], [215], [240]]);

const predictionPoint = tf.tensor([-121, 47]);

features.print();
labels.print();
predictionPoint.print();

const k = 2;

console.log('== all in one ==');
const average =
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
    }, 0) / k;
console.log('average:', average);

console.log('\n == details ==');
// 51. KNN with Tensorflow
// distance = ((lon - lon) ** 2 + (lat - lat) ** 2) \*\* 0.5
const distances = features.sub(predictionPoint).pow(2).sum(1).pow(0.5);
console.log('diatance >');
distances.print();

// 52. Maintaining Order Relationships
const pairedData = distances.expandDims(1).concat(labels, 1);
console.log('pairedData >');
pairedData.print();

// 53. Sorting Tensors
// pairedData.unstack();
// pairedData.unstack()[0].print();
// pairedData.unstack()[1].print();
// pairedData.unstack()[2].print();
// pairedData.unstack()[3].print();

// now the list is a normal javascript array, Tensor[]
// but the elements are Tensor object
const sorted = pairedData
  .unstack()
  .sort((a, b) => (a.arraySync()[0] > b.arraySync()[0] ? 1 : -1)); // ascending
console.log('sorted >');
sorted[0].print();
sorted[1].print();
sorted[2].print();
sorted[3].print();

// 54. Averaging Top Values
console.log('k:', k);
const sliced = sorted.slice(0, k);
// sliced[0].print();
// sliced[1].print();

const acc = sliced.reduce((acc, pair) => {
  return acc + pair.arraySync()[1]; // the house value
}, 0);
console.log('acc:', acc);

const avg = acc / k;
console.log('avg:', avg);
