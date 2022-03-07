export default function checkAround(row, col, arr) {
  let count = 0;
  let fieldsToCheck = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  fieldsToCheck.forEach((field) => {
    let row = Number(field[0]);
    let col = Number(field[1]);
    if (row >= 0 && col >= 0 && row < arr.length && col < arr[0].length) {
      if (arr[row][col] === "M") {
        count++;
      }
    }
  });
  return count;
}
