import React from "react";

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  id,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        onChange={onChange}
        name={name}
        id={id}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((items) => {
          return (
            <option value={items} key={items}>
              {items}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
