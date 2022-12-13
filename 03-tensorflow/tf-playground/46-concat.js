const tf = require('@tensorflow/tfjs-node');

// 46. Tensor Concatenation
const tensorA = tf.tensor([
  [1, 2, 3],
  [4, 5, 6]
]);

const tensorB = tf.tensor([
  [7, 8, 9],
  [10, 11, 12]
]);

tensorA.concat(tensorB).print();
console.log(tensorA.concat(tensorB).shape);
// Tensor
//     [[1 , 2 , 3 ],
//      [4 , 5 , 6 ],
//      [7 , 8 , 9 ],
//      [10, 11, 12]]
// [ 4, 3 ]

tensorA.concat(tensorB, 1).print();
console.log(tensorA.concat(tensorB, 1).shape);
// Tensor
//     [[1, 2, 3, 7 , 8 , 9 ],
//      [4, 5, 6, 10, 11, 12]]
// [ 2, 6 ]
