const tf = require('@tensorflow/tfjs-node');

class LinearRegression {
  // assuming features, label are tensorflow objects
  constructor(features, labels, options) {
    this.features = features;
    this.labels = labels;

    // default option
    this.options = Object.assign(
      {
        learningRate: 0.1,
        iterations: 1000
      },
      options
    );
  }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
    }
  }
}

module.exports = LinearRegression;
