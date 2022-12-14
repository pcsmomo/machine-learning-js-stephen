const tf = require('@tensorflow/tfjs-node');

const numbers = tf.tensor([
  [1, 2],
  [3, 4],
  [5, 6]
]);

// const { mean, variance } = tf.moments(numbers);  // all
// const { mean, variance } = tf.moments(numbers, 1);  // each row
const { mean, variance } = tf.moments(numbers, 0); // each column

mean.print(); // average

variance.print();

const result = numbers.sub(mean).div(variance.pow(0.5));
result.print();
