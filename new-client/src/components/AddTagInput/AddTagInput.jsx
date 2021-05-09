import React, { useEffect, useState } from 'react';
import './AddTagInput.css';

export const AddTagInput = ({name, label, type, placeholder, values, onChange, whatToChange, whereToPush}) => {

  const handleChange = (event) => {
    const newValue = { ...values };
    newValue[whatToChange] = event?.target?.value || '';
    onChange(newValue);
  };

  const handleAdd = () => {
    const newValue = {...values};
    newValue[whereToPush].push(values[whatToChange]);
    onChange(newValue);
    handleChange(null);
  }

  const [enoughLength, setEnoughLength] = useState(false);

  const inputValue = values[whatToChange];

  useEffect(() => {
    if (inputValue.length >= 3) {
      setEnoughLength(true);
    } else {
      setEnoughLength(false);
    }
  }, [inputValue]);

  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="add-tag-input">
        <input
          id={name}
          className="input"
          type={type}
          placeholder={values[whereToPush].length >= 3 ? "You can add up to 3 tags" : placeholder}
          value={values[whatToChange]}
          onChange={handleChange}
          disabled={values[whereToPush].length >= 3}
        />
        {enoughLength && (
          <span className="material-icons" onClick={handleAdd}>
            add_circle_outline
          </span>
        )}
      </div>
    </>
  );
}