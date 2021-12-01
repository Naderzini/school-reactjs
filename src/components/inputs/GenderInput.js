import React from "react";

function GenderInput(props) {
  const { handleChange, values, errors } = props;
  return (
    <div>
      <div className="form-group">
        <label>Genre*</label>
        <div className="custom-control custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            id="customRadio1"
            name="genre"
            value="homme"
            checked={values.genre === "homme"}
            onChange={handleChange}
          />
          <label htmlFor="customRadio1" className="custom-control-label">
            Homme
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            id="customRadio2"
            name="genre"
            value="femme"
            checked={values.genre === "femme"}
            onChange={handleChange}
            defaultChecked
          />
          <label htmlFor="customRadio2" className="custom-control-label">
            Femme
          </label>
        </div>
        
      </div>
      {errors.genre && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.genre}</p>
        )}
    </div>
  );
}

export default GenderInput;
