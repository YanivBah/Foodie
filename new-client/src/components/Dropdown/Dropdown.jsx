import React from 'react'
import './Dropdown.css';
export const Dropdown = ({name, label, values, onChange, whatToChange, options, group}) => {
  const handleChange = (event) => {
    const newValue = {...values};
    newValue[whatToChange] = event.target.value;
    onChange(newValue)
  }
  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select id={name} className="dropdown" onChange={handleChange}>
        {group && (
          <optgroup label={group}>
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </optgroup>
        )}
        {!group &&
          options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
      </select>
    </>
  );
}

      // <input
      //   id={name}
      //   className="input"
      //   type={type}
      //   placeholder={placeholder}
      //   value={values[whatToChange]}
      //   onChange={handleChange}
      // />