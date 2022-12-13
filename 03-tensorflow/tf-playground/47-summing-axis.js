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

console.log();
console.log(jumpData.shape);
console.log(jumpData.sum(1).shape);

// way 1
jumpData.sum(1, true).print();
jumpData.sum(1, true).concat(playerData, 1).print();

// way 2
jumpData.sum(1).expandDims(1).print();
jumpData.sum(1).expandDims(1).concat(playerData, 1).print();
