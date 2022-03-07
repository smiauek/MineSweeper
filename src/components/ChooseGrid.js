import React from "react";
import { useNavigate } from "react-router-dom";
import CustomGrid from "./CustomGrid";

function ChooseGrid() {
    const navigate = useNavigate()


  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <div>
            <div className="row m-2">
              <h2>Choose your grid:</h2>
            </div>
            <div className="row m-2">
              <button type="button" className="btn btn-success"  onClick={() => navigate("/play?width=15&heigth=15")}>
                Small 15x15
              </button>
              <button type="button" className="btn btn-primary ml-2 mr-2" onClick={() => navigate("/play?width=30&heigth=20")}>
                Medium 30x20
              </button>
              <button type="button" className="btn btn-warning" onClick={() => navigate("/play?width=60&heigth=40")}>
                Large 60x40
              </button>
            </div>
            <div className="row m-2">
              <CustomGrid />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChooseGrid;
