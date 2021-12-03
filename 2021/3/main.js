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
  let counter = {};
  let values = data.replace(/\r/g, ``).split(`\n`).filter(e => e.length > 0);
  values.forEach((value, i) => {
    for(let j = 0;j < value.length;j++) {
      if(!counter[j]) {
        counter[j] = 0;
      }
      counter[j] += parseInt(value[j]);
    }
  });
  let gamma = Object.values(counter).reduce((accum, count) => {
    let bit = count > (values.length / 2)? `1`: `0`;
    if(accum) {
      return accum + bit;
    } else {
      return bit;
    }
  }, 0);
  let epsilon = gamma.split(``).map(e => e == `1`? 0 : 1).join(``);
  [gamma, epsilon] = [gamma, epsilon].map(i => parseInt(i, 2));
  return gamma * epsilon;
}

function part2(data) {
  let getCommonBit = (values, index) => {
    let counter = values.reduce((accum, value) => accum ? accum + (value[index] == `1` ? 1 : 0) : (value[index] == `1` ? 1 : 0), 0);
    return counter < (values.length / 2) ? `0` : `1`;
  }
  let cleanValues = data.replace(/\r/g, ``).split(`\n`).filter(e => e.length > 0);
  let filterValues = (values, index, fn) => {
    let requBit = fn(getCommonBit(values, index));
    let filteredValues = values.filter((value) => value[index] == requBit);
    if(filteredValues.length == 1) {
      return filteredValues[0];
    }
    return filterValues(filteredValues, index + 1, fn);
  }
  let OGR = filterValues(cleanValues, 0, ((i) => i));
  let CSR = filterValues(cleanValues, 0, ((i) => i == `1` ? `0` : `1`));
  [OGR, CSR] = [OGR, CSR].map((i) => parseInt(i, 2));
  return OGR * CSR;
}
