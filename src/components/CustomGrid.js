import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GridSizeForm from "./GridSizeForm";

function CustomGrid() {
  const navigate = useNavigate();

  const initialFormState = {
    width: "",
    heigth: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    let value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  return (
    <div className="row m-0">
      <button
        form="gridSizeForm"
        type="submit"
        className="btn btn-danger mr-2"
        onClick={() =>
          navigate(`/play?width=${formData.width}&heigth=${formData.heigth}`)
        }
      >
        Custom
      </button>
      <GridSizeForm formData={formData} handleChange={handleChange} />
    </div>
  );
}

export default CustomGrid;
