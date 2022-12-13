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

// 51. KNN with Tensorflow
// distance = ((lon - lon) ** 2 + (lat - lat) ** 2) \*\* 0.5
const distances = features.sub(predictionPoint).pow(2).sum(1).pow(0.5);
distances.print();

// 52. Maintaining Order Relationships
distances.expandDims(1).concat(labels, 1);
distances.expandDims(1).concat(labels, 1).print();
