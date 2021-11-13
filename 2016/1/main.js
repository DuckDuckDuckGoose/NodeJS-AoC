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
  let pos = [0, 0];
  let dirPointer = 0;
  let steps = data.split(`, `);
  steps.forEach((step, i) => {
    if(step[0] == `R`) {
      dirPointer = (dirPointer + 1) % 4;
    } else {
      dirPointer = dirPointer == 0 ? 3 : dirPointer - 1
    }
    for(let i = 0;i < parseInt(step.slice(1), 10);i++) {
      pos[0] += dirs[dirPointer][0];
      pos[1] += dirs[dirPointer][1];
    }
  });
  return Math.abs(pos[0]) + Math.abs(pos[1]);
}

function part2(data) {
  let visited = {};
  let pos = [0, 0];
  let dirPointer = 0;
  let steps = data.split(`, `);
  steps.forEach((step, i) => {
    if(step[0] == `R`) {
      dirPointer = (dirPointer + 1) % 4;
    } else {
      dirPointer = dirPointer == 0 ? 3 : dirPointer - 1
    }
    for(let i = 0;i < parseInt(step.slice(1), 10);i++) {
      if(visited[pos[0] * 100000 + pos[1]] == true) {
        console.log(Math.abs(pos[0]) + Math.abs(pos[1]));
        process.exit(0);
      } else {
        visited[pos[0] * 100000 + pos[1]] = true;
      }
      pos[0] += dirs[dirPointer][0];
      pos[1] += dirs[dirPointer][1];
    }
  });
  return null
}
