const tf = require('@tensorflow/tfjs-node');

const data = tf.tensor([1, 2, 3]);
const otherData = tf.tensor([4, 5, 6]);

console.log(data.shape);

// Elementwise Operation
const addedData = data.add(otherData);
console.log(data);
console.log(otherData);
console.log(addedData);

// Elementwise Operation
data.sub(otherData);
data.mul(otherData);
data.div(otherData);
