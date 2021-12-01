import React from "react";

function FileInput(props) {
  const { label, handleChange, values, type, placeholder, name ,touched,errors} = props;
  return (
    <div>
      <label>{label}</label>
      <div className="input-group">
        <input 
          type={type} 
          name={name}
          placeholder={placeholder}
          value={values}
          onChange={handleChange} />
          {(touched && errors) ? (
        <p style={{ color: "red", fontSize: "12px" }}>{errors}</p>
      ):null}
      </div>
    </div>
  );
}

export default FileInput;
