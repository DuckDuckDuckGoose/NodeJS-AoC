const fs = require(`fs`);

let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

fs.readFile(`./input.txt`, (err, data) => {
  if(err) {
    throw err
  } else {
    switch (process.argv[2]) {
      case `1`:
        console.log(part1(data.toString()));
        break;
      case `2`:
        console.log(part2(data.toString()));
        break;
      default:
        throw new Error(`Invalid input`);
    }
  }
})

function part1(data) {
  let values = data.split(`\n`).map(str => parseInt(str));
  let counter = 0;
  pValue = null;
  values.forEach((value) => {
    if(pValue && pValue < value) {
      counter++;
    }
    pValue = value;
  });
  return counter;
}

function part2(data) {
  let values = data.split(`\n`).map(str => parseInt(str));
  let counter = 0;
  let pValue = null;
  let tValue;
  for(let i = 1;i < values.length - 1;i++) {
    tValue = values.slice(i-1, i+2).reduce((accum, val) => accum + val);
    if(pValue && pValue < tValue) {
      counter++;
    }
    pValue = tValue;
  }
  return counter;
}
