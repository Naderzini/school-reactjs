import React from "react";

function MessageInput(props) {
  const { handleChange, value, onSubmit, type, placeholder, className, name } =
    props;
  return (
    <div className="type_msg">
      <div className="input_msg_write">
        <input
          type={type}
          className={className}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onClick={onSubmit}
        />
        <button className="msg_send_btn" type="button" onClick={onSubmit}>
          <i className="fa fa-paper-plane-o" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
