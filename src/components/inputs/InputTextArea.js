import React from "react";

function InputTextArea(props) {
    const{label,handleChange,values,errors,name,handelBlur,touched} = props; 
  return (
    <div>
      <label htmlFor="exampleTextarea">{label}</label>
      <textarea
        className="form-control"
        name={name}
        value={values}
        errors={errors}
        onChange={handleChange}
        rows={4}
        onBlur={handelBlur}
      />
      {(touched && errors) ? (
        <p style={{ color: "red", fontSize: "12px" }}>{errors}</p>
      ):null}
    </div>
    
  );
}

export default InputTextArea;
