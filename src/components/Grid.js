import React, { useState } from "react";
import generateGrid from "../utils/generateGrid";
import generateMines from "../utils/generateMines";
import checkAround from "../utils/checkAround";

function Grid({ width, heigth }) {
  let newGrid = generateGrid(width, heigth);

  const [leftClicks, setLeftClicks] = useState([]);
  const [rightClicks, setRightClicks] = useState([]);
  const [grid, setGrid] = useState(newGrid);
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);

  function emptyGrid(grid, val = "") {
    let tempGrid = [...grid];
    for (let i = 0; i < tempGrid.length; i++) {
      for (let j = 0; j < tempGrid[i].length; j++) {
        tempGrid[i][j] = val;
      }
    }
    return tempGrid;
  }

  function checkWin() {
    let maxClicks = Number(width) * Number(heigth);
    let currentClicks = leftClicks.length + rightClicks.length;

    if (currentClicks + 1 === maxClicks) {
      setWin(true);
    }
  }

  function addMinesToGrid(mines) {
    let tempGrid = [...grid];
    mines.forEach((mine) => {
      tempGrid[mine[0]][mine[1]] = "M";
    });
    setGrid(tempGrid);
  }

  function addNumsToGrid() {
    let tempGrid = [...grid];
    tempGrid.forEach((row, rowIndex) =>
      row.forEach((square, squareIndex) => {
        if (square !== "M") {
          tempGrid[rowIndex][squareIndex] = String(
            checkAround(rowIndex, squareIndex, tempGrid)
          );
        }
      })
    );
    setGrid(tempGrid);
  }

  function handleStart() {
    setLose(false);
    setWin(false);
    setLeftClicks([]);
    setRightClicks([]);
    setGrid(emptyGrid(grid));
    addMinesToGrid(generateMines(grid));
    addNumsToGrid();
  }

  function handleLeftClick(e) {
    let row = e.target.parentNode.parentNode.id;
    let col = e.target.parentNode.id;
    setLeftClicks([...leftClicks, `${row}:${col}`]);
    if (grid[row][col] === "M") {
      setLose(true);
    } else {
      checkWin();
    }
  }

  function handleRightClick(e) {
    const flag = `${e.currentTarget.parentElement.parentElement.id}:${e.currentTarget.parentElement.id}`;
    if (rightClicks.includes(flag)) {
      const tempRightClicks = rightClicks;
      tempRightClicks.splice(tempRightClicks.indexOf(flag), 1);
      setRightClicks([...tempRightClicks]);
    } else {
      setRightClicks([...rightClicks, flag]);
    }
    checkWin();
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleStart()}
        >
          {lose ? "Restart" : "Start"}
        </button>
      </div>
      {lose ? (
        <div
          className="alert alert-danger d-flex justify-content-center"
          role="alert"
        >
          Kaboom!!! You hit a mine!!!
        </div>
      ) : (
        <></>
      )}
      {win ? (
        <div
          className="alert alert-success d-flex justify-content-center"
          role="alert"
        >
          Succes!!! You found all the mines!
        </div>
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-center">
        <table className="table-bordered border-dark ">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex} id={rowIndex} style={{ height: 30 }}>
                {row.map((square, colIndex) => (
                  <td key={colIndex} id={colIndex} style={{ width: 30 }}>
                    {leftClicks.includes(
                      `${String(rowIndex)}:${String(colIndex)}`
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
                        disabled={lose}
                      >
                        {rightClicks.includes(
                          `${String(rowIndex)}:${String(colIndex)}`
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
      <div className="mt-20">
        <p> </p>
      </div>
    </>
  );
}

export default Grid;
