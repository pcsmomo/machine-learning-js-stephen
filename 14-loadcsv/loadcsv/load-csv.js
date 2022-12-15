const fs = require('fs');

function loadCSV(filename, options) {
  const data = fs.readFileSync(filename, { encoding: 'utf-8' });
  console.log(data);
}

loadCSV('data.csv');
