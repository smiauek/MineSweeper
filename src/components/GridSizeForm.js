import React from "react";

function GridSizeForm({ formData, handleChange }) {
  return (
    <form id="gridSizeForm">
      <div className="form-row">
        <div className="col-3">
          <input
            id="width"
            name="width"
            type="number"
            className="form-control"
            placeholder="Width"
            onChange={handleChange}
            value={formData.width}
          />
        </div>
        <div className="col-3">
          <input
            id="heigth"
            name="heigth"
            type="number"
            className="form-control"
            placeholder="Heigth"
            onChange={handleChange}
            value={formData.heigth}
          />
        </div>
      </div>
    </form>
  );
}

export default GridSizeForm;
