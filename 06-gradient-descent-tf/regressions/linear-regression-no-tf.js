const tf = require('@tensorflow/tfjs-node');
const _ = require('lodash');

class LinearRegression {
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

    this.m = 0;
    this.b = 0;
  }

  gradientDescent() {
    // MPG: miles per gallon
    const currentGuessesForMPG = this.features.map(row => {
      // (mx + b)
      return this.m * row[0] + this.b;
    });

    const bSlope =
      _.sum(
        currentGuessesForMPG.map((guess, i) => {
          const actual = this.labels[i][0];
          return guess - actual;
        })
      ) *
      (2 / this.features.length);

    const mSlope =
      _.sum(
        currentGuessesForMPG.map((guess, i) => {
          const x = this.features[i][0];
          const actual = this.labels[i][0];
          return -1 * x * (actual - guess);
        })
      ) *
      (2 / this.features.length);

    // set the next 'm' and 'b'
    this.m = this.m - mSlope * this.options.learningRate;
    this.b = this.b - bSlope * this.options.learningRate;
  }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
      console.log('Updated M is:', this.m, 'Updated B is:', this.b);
    }
  }
}

module.exports = LinearRegression;
