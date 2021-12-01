import React from "react";

function DatePickerInput(props) {
    const{label,handleChange,values,errors,name,handelBlur,touched} = props; 
  return (
    <div>
      <div>
        <label >
          {label}
        </label>
        <div >
          <input
            className="form-control"
            type="datetime-local"
            name={name}
            value={values}
            onChange={handleChange}
            onBlure={handelBlur}
          />
        </div>
       { (touched && errors) ? (
        <p style={{ color: "red", fontSize: "12px" }}>{errors}</p>
      ):null}
      </div>
    </div>
  );
}

export default DatePickerInput;
