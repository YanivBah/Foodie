import React from 'react'
import './Textarea.css';
export const Textarea = ({name, label, placeholder, values, onChange, whatToChange, maxLength, rows}) => {
  const handleChange = (event) => {
    const newValue = {...values};
    if (Array.isArray(whatToChange)) {
      newValue[whatToChange[0]][whatToChange[1]][whatToChange[2]] = event.target.value;
    } else {
      newValue[whatToChange] = event.target.value;
    }
    onChange(newValue);
  }
  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="textarea"
        id={name}
        rows={rows}
        placeholder={placeholder}
        value={values[whatToChange]}
        onChange={handleChange}
        maxLength={maxLength}
      ></textarea>
    </>
  );
}