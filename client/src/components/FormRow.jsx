import React from "react";

const FormRow = ({ type, name, labeltext, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labeltext || name}
      </label>
      <input
        type={type}
        id={name}
        onChange={onChange}
        defaultValue={defaultValue || ""}
        required
        name={name}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
