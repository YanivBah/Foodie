import React from 'react';
import './Tagbox.css';

export const Tagbox = ({name, values, whatToChange, onChange}) => {

  const handleDelete = () => {
    const newValues = {...values};
    const index = newValues[whatToChange].findIndex(tag => tag === name);
    newValues[whatToChange].splice(index,1);
    onChange(newValues);
  }

  return (
    <div className="tag-box">
      {name}
      <span className="material-icons" onClick={handleDelete}>clear</span>
    </div>
  );
}
