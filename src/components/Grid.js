import React, { useState } from "react";

let grid = [
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
];

function handleStart() {
  addMinesToGrid(grid, generateMines());
}

function addMinesToGrid(grid, mines) {
  mines.forEach((mine) => {
    grid[mine[0]][mine[1]] = "M";
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateMines(gridSize = [10, 10]) {
  let mines = [];
  let numOfMines = (Number(gridSize[0]) * Number(gridSize[1])) / 5;

  while (mines.length < numOfMines) {
    let mine =
      String(getRandomInt(gridSize[0])) + String(getRandomInt(gridSize[1]));
    if (!mines.includes(mine)) {
      mines.push(mine);
      console.log(mines);
    }
  }
  return mines;
}

function Grid() {
  const [leftClicks, setLeftClicks] = useState([]);
  const [rightClicks, setRightClicks] = useState([]);

  function handleLeftClick(e) {
    setLeftClicks([
      ...leftClicks,
      e.target.parentNode.parentNode.id + e.target.parentNode.id,
    ]);
    console.log(leftClicks);
    console.log(
      `clicked button ${e.target.parentNode.parentNode.id}, ${e.target.parentNode.id}`
    );
  }

  function handleRightClick(e) {
    const flag =
      e.currentTarget.parentElement.parentElement.id +
      e.currentTarget.parentElement.id;
    if (rightClicks.includes(flag)) {
      const tempRightClicks = rightClicks;
      tempRightClicks.splice(tempRightClicks.indexOf(flag), 1);
      setRightClicks([...tempRightClicks]);
    } else {
      setRightClicks([...rightClicks, flag]);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleStart()}
        >
          Start
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <table className="table-bordered border-dark">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex} id={rowIndex} style={{ height: 30 }}>
                {row.map((square, colIndex) => (
                  <td key={colIndex} id={colIndex} style={{ width: 30 }}>
                    {leftClicks.includes(
                      String(rowIndex) + String(colIndex)
                    ) ? (
                      <p style={{ margin: 1, textAlign: "center" }}>{square}</p>
                    ) : (
                      <button
                        type="button"
                        className="secondary m-0"
                        style={{ width: 27, height: 27 }}
                        onClick={(e) => handleLeftClick(e)}
                        onAuxClick={(e) => handleRightClick(e)}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        {rightClicks.includes(
                          String(rowIndex) + String(colIndex)
                        ) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-flag-fill mb-1"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                          </svg>
                        ) : (
                          <p></p>
                        )}
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Grid;
