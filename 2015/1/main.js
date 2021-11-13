const fs = require(`fs`);

fs.readFile(`./input.txt`, (err, data) => {
  if(err) {
    throw err
  } else {
    switch (process.argv[2]) {
      case `1`:
        console.log(part2(data.toString()));
        break;
      case `2`:
        console.log(part1(data.toString()));
        break;
      default:
        throw new Error(`Invalid input`);
    }
  }
})

function part1(input) {
  let floor = 0;
  for(let i = 0;i < input.length;i++) {
    switch (input[i]) {
      case `(`:
        floor ++;
        break;
      case `)`:
        floor --
        break;
      default:
        throw new Error(`Invalid character: ${input[i]}`);
    }
  }
  return floor;
}
function part2(input) {
  let floor = 0;
  for(let i = 0;i < input.length;i++) {
    switch (input[i]) {
      case `(`:
        floor ++;
        break;
      case `)`:
        floor --
        break;
      default:
        throw new Error(`Invalid character: ${input[i]}`)
    }
    if(floor == -1) {
      return i + 1;
    }
  }
  return null;
}
