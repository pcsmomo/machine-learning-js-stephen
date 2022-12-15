const fs = require('fs');
const _ = require('lodash');

function loadCSV(filename, options) {
  let data = fs.readFileSync(filename, { encoding: 'utf-8' });
  data = data.split('\n').map(row => row.split(','));
  data = data.map(row => _.dropRightWhile(row, val => val === '')); // drop trailing commas
  console.log(data);
}

loadCSV('data.csv');
