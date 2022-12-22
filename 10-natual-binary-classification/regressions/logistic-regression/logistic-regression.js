const tf = require('@tensorflow/tfjs-node');
const _ = require('lodash');

class LogisticRegression {
  constructor(features, labels, options) {
    this.features = this.processFeatures(features);
    this.labels = tf.tensor(labels);
    this.mseHistory = [];

    // default option
    this.options = Object.assign(
      {
        learningRate: 0.1,
        iterations: 1000,
        decisionBoundary: 0.5
      },
      options
    );

    this.weights = tf.zeros([this.features.shape[1], 1]);
  }

  gradientDescent(features, labels) {
    // matMul: matix multiplication
    const currentGuesses = features.matMul(this.weights).sigmoid();
    const differences = currentGuesses.sub(labels);

    const slopes = features
      .transpose()
      .matMul(differences)
      .div(features.shape[0]);
    // .mul(2); // this step can be omitted because we're aiming to find slope change

    this.weights = this.weights.sub(slopes.mul(this.options.learningRate));
  }

  train() {
    const batchQuantity = Math.floor(
      this.features.shape[0] / this.options.batchSize
    );

    for (let i = 0; i < this.options.iterations; i++) {
      for (let j = 0; j < batchQuantity; j++) {
        const { batchSize } = this.options;
        const startIndex = j * batchSize;

        const featureSlice = this.features.slice(
          [startIndex, 0],
          [batchSize, -1]
        );

        const labelSlice = this.labels.slice([startIndex, 0], [batchSize, -1]);

        this.gradientDescent(featureSlice, labelSlice);
      }

      this.recordMSE();
      this.updateLearningRate();
    }
  }

  predict(observations) {
    return this.processFeatures(observations)
      .matMul(this.weights)
      .sigmoid()
      .greater(this.options.decisionBoundary);
    // .cast('float32');  // need this for older version of tf
  }

  test(testFeatures, testLabels) {
    const predictions = this.predict(testFeatures);
    testLabels = tf.tensor(testLabels);

    const incorrect = predictions.sub(testLabels).abs().sum().arraySync();

    return (predictions.shape[0] - incorrect) / predictions.shape[0];
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

module.exports = LogisticRegression;
