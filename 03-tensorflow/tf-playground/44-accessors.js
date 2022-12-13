const tf = require('@tensorflow/tfjs-node');

// 44. Tensor Accessors
const data = tf.tensor([
  [10, 20, 30],
  [40, 50, 60]
]);

console.log(data.arraySync()[1][1]); // 50
// data.array().then(arr => console.log(arr[0][1])); // 20
