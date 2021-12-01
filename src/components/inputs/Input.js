import React from "react";

function Input(props) {
    const { handleChange, values, errors,type,placeholder,name,label,defaultValue,handelBlur ,touched} = props;
  return (
    <div>
      <label>{label}</label>
      <input
        defaultValue={defaultValue}
        type={type}
        className="form-control "
        name={name}
        placeholder={placeholder}
        value={values}
        onChange={handleChange}
        onBlur={handelBlur}
      />
      {(touched && errors) ? (
        <p style={{ color: "red", fontSize: "12px" }}>{errors}</p>
      ):null}
    </div>
  );
}

export default Input;
