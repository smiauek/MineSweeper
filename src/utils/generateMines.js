function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function generateMines(grid) {
  let mines = [];
  let numOfMines = (grid.length * grid[0].length) / 5;

  while (mines.length < numOfMines) {
    let mine = [getRandomInt(grid.length), getRandomInt(grid[0].length)];
    if (!mines.includes(mine)) {
      mines.push(mine);
    }
  }
  return mines;
}
