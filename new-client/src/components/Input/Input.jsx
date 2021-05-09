import React from 'react'
import './Input.css';
export const Input = ({name, label, type, placeholder, values, onChange, whatToChange}) => {
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
      <input
        id={name}
        className="input"
        type={type}
        placeholder={placeholder}
        value={values[whatToChange]}
        onChange={handleChange}
      />
    </>
  );
}