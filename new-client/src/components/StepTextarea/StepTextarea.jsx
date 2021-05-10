import React, { useState } from 'react'
import './StepTextarea.css';
export const StepTextarea = ({ values, onChange, index, maxLength, rows }) => {
  const hiddenOrNot = index > 1 ? true : false;
  const [isHidden, setIsHidden] = useState(hiddenOrNot);
  const handleHide = () => setIsHidden((prev) => !prev);

  const handleChange = (event) => {
    const newValue = {...values};
    newValue.steps[index].content = event.target.value;
    onChange(newValue);
  }

  const handleDelete = () => {
    const newValue = {...values};
    newValue.steps.splice(index,1);
    onChange(newValue);
  }
  
  return (
    <div className="step-textarea">
      <label className="label" htmlFor={`step${index}`}>
        Step {index + 1}
        <div>
          {index > 1 && (
            <span className="material-icons red" onClick={handleDelete}>
              clear
            </span>
          )}
          <span className="material-icons blue" onClick={handleHide}>
            {isHidden ? "visibility" : "visibility_off"}
          </span>
        </div>
      </label>
      {!isHidden && (
        <textarea
          className="textarea"
          id={`step${index}`}
          rows={rows}
          value={values.steps[index].content}
          onChange={handleChange}
          maxLength={maxLength}
        ></textarea>
      )}
    </div>
  );
};

// xport const Textarea = ({name, label, placeholder, values, onChange, whatToChange, maxLength, rows}) => {
//   const handleChange = (event) => {
//     const newValue = {...values};
//     if (Array.isArray(whatToChange)) {
//       newValue[whatToChange[0]][whatToChange[1]][whatToChange[2]] = event.target.value;
//     } else {
//       newValue[whatToChange] = event.target.value;
//     }
//     onChange(newValue);
//   }
//   return (
//     <>
//       <label className="label" htmlFor={name}>
//         {label}
//       </label>
//       <textarea
//         className="textarea"
//         id={name}
//         rows={rows}
//         placeholder={placeholder}
//         value={values[whatToChange]}
//         onChange={handleChange}
//         maxLength={maxLength}
//       ></textarea>
//     </>
//   );
// }