const tf = require('@tensorflow/tfjs-node');

// 45. Creating Slices of Data
const data = tf.tensor([
  [10, 20, 30],
  [40, 50, 60],
  [10, 20, 30],
  [40, 50, 60],
  [10, 20, 30],
  [40, 50, 60],
  [10, 20, 30],
  [40, 50, 60],
  [10, 20, 30],
  [40, 50, 60]
]);

data.slice([0, 1], [8, 1]).print();
data.slice([0, 1], [data.shape[0], 2]).print(); // for dynamic length
data.slice([0, 0], [-1, 2]).print(); // the same as shape[0]
