const { kernel_impls } = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs-node');

// 47. Summing Values Along an Axis
const jumpData = tf.tensor([
  [60, 70, 80],
  [60, 70, 80],
  [60, 70, 80],
  [60, 70, 80]
]);

const playerData = tf.tensor([
  [1, 160],
  [2, 160],
  [3, 160],
  [4, 160]
]);

jumpData.sum(1).print(); // sum rows
// jumpData.sum(0).print();  // sum columns

jumpData.sum(1).concat(playerData).print();
