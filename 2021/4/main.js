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
let boardTestIndexes = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24]
]

function part1(data) {
  let inputs = data.split(`\n`)[0].replace(/\r/g, ``).split(`,`).map((i) => parseInt(i));
  let boardvalues = data.replace(/\r/g, ``).split(`\n\n`).map((board) => board.replace(/\n/g, ` `).split(` `).filter((char) => char.length > 0).map(i => parseInt(i))).slice(1);
  let Board = function (values) {
    this.values = values;
    this.blocker = [];
    for(let i = 0;i < 25;i++) {
      this.blocker.push(false);
    }
    return this;
  }
  let updateBoard = (board, inValue) => {
    let indexes = board.values.reduce((accum, value, index) => {
      if(index == 0) {
        return value == inValue ? [index] : [];
      }
      return value == inValue ? accum.concat([index]) : accum;
    }, 0)
    for(let i = 0;i < indexes.length;i++) {
      board.blocker[indexes[i]] = true;
    }
  }
  let testBoard = (board) => {
    for(let i = 0;i < boardTestIndexes.length;i++) {
      let blocks = boardTestIndexes[i].map((index) => board.blocker[index]);
      if(blocks.every(value => value)) {
        return true;
      }
    }
  }
  let scoreBoard = (board) => {
    console.log(board)
    let unmarked = board.values.filter((e, i) => !board.blocker[i]);
    console.log(unmarked)
    return unmarked.reduce((accum, value) => accum + value);
  }
  let boards = boardvalues.map((boardValue) => new Board(boardValue));
  for(let i = 0;i < inputs.length;i++) {
    for(let j = 0;j < boards.length;j++) {
      updateBoard(boards[j], inputs[i]);
      if(testBoard(boards[j])) {
        return [scoreBoard(boards[j]), inputs[i]];
      }
    }
  }
}
function part2(data) {
  let inputs = data.split(`\n`)[0].replace(/\r/g, ``).split(`,`).map((i) => parseInt(i));
  let boardvalues = data.replace(/\r/g, ``).split(`\n\n`).map((board) => board.replace(/\n/g, ` `).split(` `).filter((char) => char.length > 0).map(i => parseInt(i))).slice(1);
  let Board = function (values) {
    this.values = values;
    this.blocker = [];
    for(let i = 0;i < 25;i++) {
      this.blocker.push(false);
    }
    return this;
  }
  let updateBoard = (board, inValue) => {
    let indexes = board.values.reduce((accum, value, index) => {
      if(index == 0) {
        return value == inValue ? [index] : [];
      }
      return value == inValue ? accum.concat([index]) : accum;
    }, 0)
    for(let i = 0;i < indexes.length;i++) {
      board.blocker[indexes[i]] = true;
    }
  }
  let testBoard = (board) => {
    for(let i = 0;i < boardTestIndexes.length;i++) {
      let blocks = boardTestIndexes[i].map((index) => board.blocker[index]);
      if(blocks.every(value => value)) {
        return true;
      }
    }
  }
  let scoreBoard = (board) => {
    let unmarked = board.values.filter((e, i) => !board.blocker[i]);
    if(unmarked.length > 0) {
      return unmarked.reduce((accum, value) => accum + value);
    }
    console.log(board);
    return 0;
  }
  let boards = boardvalues.map((boardValue) => new Board(boardValue));
  let blockedBoards = [];
  for(let i = 0;i < boards.length;i++) {
    blockedBoards.push(false);
  }
  let answers = []
  for(let i = 0;i < inputs.length;i++) {
    for(let j = 0;j < boards.length;j++) {
      if(!blockedBoards[j]) {
        updateBoard(boards[j], inputs[i]);
        if(testBoard(boards[j])) {
          blockedBoards[j] = true;
          answers.push(scoreBoard(boards[j]) * inputs[i]);
        }
      }
    }
  }
  return answers[answers.length - 1];
}
