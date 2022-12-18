const tf = require('@tensorflow/tfjs-node');
const _ = require('lodash');

class LinearRegression {
  constructor(features, labels, options) {
    this.features = tf.tensor(features);
    this.labels = tf.tensor(labels);

    this.features = tf
      .ones([this.features.shape[0], 1])
      .concat(this.feature, 1);

    // default option
    this.options = Object.assign(
      {
        learningRate: 0.1,
        iterations: 1000
      },
      options
    );

    this.weight = tf.zeros([2, 1]);
  }

  gradientDescent() {
    // matMul: matix multiplication
    const currentGuesses = this.features.matMul(this.weight);
    const differences = currentGuesses.sub(this.labels);

    const slopes = this.features
      .transpose()
      .matMul(differences)
      .div(this.features.shape[0]);
    // .mul(2) // this step can be omitted because we're aiming to find slope change
  }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
      console.log('Updated M is:', this.m, 'Updated B is:', this.b);
    }
  }
}

module.exports = LinearRegression;
