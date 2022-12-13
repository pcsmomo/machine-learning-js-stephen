const tf = require('@tensorflow/tfjs-node');

const data = tf.tensor([1, 2, 3]);
const otherData = tf.tensor([4, 5, 6]);

console.log(data.shape);

// Elementwise Operation
const addedData = data.add(otherData);
data.print();
otherData.print();
addedData.print();

data.sub(otherData);
data.mul(otherData);
data.div(otherData);

const data2 = tf.tensor([1, 2, 3]);
const otherData2 = tf.tensor([4]);
// Broadcasting Operator
const brodcastedData = data.add(otherData2);

// 44. Tensor Accessors
const data44 = tf.tensor([
  [10, 20, 30],
  [40, 50, 60]
]);

console.log(data44.arraySync()[1][1]); // 50
// data44.array().then(arr => console.log(arr[0][1])); // 20

// 45. Creating Slices of Data
const data45 = tf.tensor([
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

data45.slice([0, 1], [8, 1]).print();
data45.slice([0, 1], [data45.shape[0], 2]).print(); // for dynamic length
data45.slice([0, 0], [-1, 2]).print(); // the same as shape[0]
