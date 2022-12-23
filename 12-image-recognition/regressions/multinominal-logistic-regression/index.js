const tf = require('@tensorflow/tfjs-node');
const plot = require('node-remote-plot'); // generate an image
const _ = require('lodash');
const mnist = require('mnist-data');

const mnistData = mnist.training(0, 10);

// console.log(mnistData.images.values);

// 28px x 28px : 784px
const features = mnistData.images.values.map(image => _.flatMap(image));
console.log(features);
