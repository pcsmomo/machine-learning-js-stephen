const tf = require('@tensorflow/tfjs-node');
const _ = require('lodash');

class LinearRegression {
  constructor(features, labels, options) {
    this.features = tf.tensor(features);
    this.labels = tf.tensor(labels);

    this.features = tf
      .ones([this.features.shape[0], 1])
      .concat(this.features, 1);

    // default option
    this.options = Object.assign(
      {
        learningRate: 0.1,
        iterations: 1000
      },
      options
    );

    this.weights = tf.zeros([2, 1]);
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
      // console.log(
      //   'Updated M is:',
      //   this.weights.arraySync()[1],
      //   'Updated B is:',
      //   this.weights.arraySync()[0]
      // );
    }
  }

  test(testFeatures, testLabels) {
    testFeatures = tf.tensor(testFeatures);
    testLabels = tf.tensor(testLabels);

    testFeatures = tf.ones([testFeatures.shape[0], 1]).concat(testFeatures, 1);

    const predictions = testFeatures.matMul(this.weights);
    // predictions.print();

    const res = testLabels.sub(predictions).pow(2).sum().arraySync();
    const tot = testLabels.sub(testLabels.mean()).pow(2).sum().arraySync();
    console.log('res:', res);
    console.log('tot:', tot);

    const coefficientOfDetermination = 1 - res / tot; // = R2
    console.log('1 - res / tot:', coefficientOfDetermination);

    return coefficientOfDetermination;
  }
}

module.exports = LinearRegression;
