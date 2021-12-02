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
  let counters = {forward: 0, up: 0, down: 0};
  data.split(`\n`).forEach((item, i) => {
    let split = item.replace(/\r/, ``).split(` `);
    console.log(split)
    counters[split[0]] += parseInt(split[1]);
  });
  return counters.forward * (counters.down - counters.up);
}

function part2(data) {
  let counters = {horizontal: 0, aim: 0, depth: 0};
  data.split(`\n`).forEach((line, index) => {
    let [command, value] = line.replace(/\r/, ``).split(` `);
    switch (command) {
      case `forward`:
        counters.horizontal += parseInt(value);
        counters.depth += parseInt(value) * counters.aim;
        break;
      case `down`:
        counters.aim += parseInt(value);
        break;
      case `up`:
        counters.aim -= parseInt(value);
        break;
    }
  })
  return counters.horizontal * counters.depth;
}
