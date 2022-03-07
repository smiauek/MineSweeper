function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function generateMines(grid) {
  let mines = [];
  let numOfMines = (grid.length * grid[0].length) / 5;

  while (mines.length < numOfMines) {
    let mine = [getRandomInt(grid.length), getRandomInt(grid[0].length)];

    //this if statement doesn't work right as icludes method doesn't find array in array of arrays
    if (!mines.includes(mine)) {
      mines.push(mine);
    }
  }
  return mines;
}
