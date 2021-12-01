import React from "react";

function GenderInput(props) {
  const { handleChange, values, } = props;
  return (
    <div>
      <div className="form-group">
        <label>Statue*</label>
        <div className="custom-control custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            id="customRadio1"
            name="status"
            value="encour"
            checked={values.status === "encour"}
            onChange={handleChange}
          />
          <label htmlFor="customRadio1" className="custom-control-label">
            Encour
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            id="customRadio2"
            name="status"
            value="resolue"
            checked={values.status === "resolue"}
            onChange={handleChange}
            defaultChecked
          />
          <label htmlFor="customRadio2" className="custom-control-label">
            Résolue
          </label>
        </div>
      </div>
      {/* {errors.genre && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.genre}</p>
        )} */}
    </div>
  );
}

export default GenderInput;
