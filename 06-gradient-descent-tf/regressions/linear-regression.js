const tf = require('@tensorflow/tfjs-node');
const _ = require('lodash');

class LinearRegression {
  constructor(features, labels, options) {
    this.features = this.processFeatures(features);
    this.labels = tf.tensor(labels);
    this.mseHistory = [];

    // default option
    this.options = Object.assign(
      {
        learningRate: 0.1,
        iterations: 1000
      },
      options
    );

    this.weights = tf.zeros([this.features.shape[1], 1]);
  }

  gradientDescent() {
    // matMul: matix multiplication
    const currentGuesses = this.features.matMul(this.weights);
    const differences = currentGuesses.sub(this.labels);

    const slopes = this.features
      .transpose()
      .matMul(differences)
      .div(this.features.shape[0]);
    // .mul(2); // this step can be omitted because we're aiming to find slope change

    this.weights = this.weights.sub(slopes.mul(this.options.learningRate));
  }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
      // const weights = this.weights.arraySync();
      // console.log('Updated M is:', weights[1], 'Updated B is:', weights[0]);

      this.recordMSE();
      this.updateLearningRate();
    }
  }

  test(testFeatures, testLabels) {
    testFeatures = this.processFeatures(testFeatures);
    testLabels = tf.tensor(testLabels);

    const predictions = testFeatures.matMul(this.weights);
    // predictions.print();

    const res = testLabels.sub(predictions).pow(2).sum().arraySync();
    const tot = testLabels.sub(testLabels.mean()).pow(2).sum().arraySync();
    // console.log('res:', res);
    // console.log('tot:', tot);

    const coefficientOfDetermination = 1 - res / tot; // = R2

    return coefficientOfDetermination;
  }

  processFeatures(features) {
    features = tf.tensor(features);

    if (this.mean && this.variance) {
      features = features.sub(this.mean).div(this.variance.pow(0.5));
    } else {
      features = this.standardize(features);
    }

    features = tf.ones([features.shape[0], 1]).concat(features, 1);

    return features;
  }

  standardize(features) {
    const { mean, variance } = tf.moments(features, 0);

    this.mean = mean;
    this.variance = variance;

    return features.sub(mean).div(variance.pow(0.5));
  }

  recordMSE() {
    // Vectorized MSE (Mean Squared Error)
    const mse = this.features
      .matMul(this.weights)
      .sub(this.labels)
      .pow(2)
      .sum()
      .div(this.features.shape[0])
      .arraySync();

    this.mseHistory.unshift(mse);
  }

  updateLearningRate() {
    if (this.mseHistory.length < 2) {
      return;
    }

    if (this.mseHistory[0] > this.mseHistory[1]) {
      // when mse is increased
      this.options.learningRate /= 2;
    } else {
      // when mse went down
      this.options.learningRate *= 1.05;
    }
  }
}

module.exports = LinearRegression;
