import React, { useState } from 'react';
import './IngredientSetting.css';

export const IngredientSetting = ({ ingredient, values, onChange, index }) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleAmount = (event) => {
    const newValue = { ...values };
    newValue.ingredients[index].amount = event.target.value;
    onChange(newValue);
  };
  const handleUnit = (event) => {
    const newValue = { ...values };
    newValue.ingredients[index].unit = event.target.value;
    onChange(newValue);
  };

  const handleHide = () => setIsHidden(prev => !prev);

  const handleDelete = () => {
    const newValue = { ...values };
    newValue.ingredients.splice(index,1);
    onChange(newValue);
  }

  return (
    <div className="ingredient-setting">
      <div className="ingredient-header">
        <h4>
          {index + 1}. {ingredient.name}
          {isHidden && (
            <span className="details">
              {" "}
              - {values.ingredients[index].amount}{" "}
              {values.ingredients[index].unit}
            </span>
          )}
        </h4>
        <div>
          <span className="material-icons red" onClick={handleDelete}>
            clear
          </span>
          <span className="material-icons blue" onClick={handleHide}>
            {isHidden ? "visibility" : "visibility_off"}
          </span>
        </div>
      </div>
      {!isHidden && (
        <div className="ingredient-grid">
          <div className="amount">
            <label className="label" htmlFor={`amount${index}`}>
              Amount
            </label>
            <input
              id={`amount${index}`}
              className="input"
              type="text"
              placeholder=""
              value={values.ingredients[index].amount}
              onChange={handleAmount}
            />
          </div>
          <div className="unit">
            <label className="label" htmlFor={`unit${index}`}>
              Unit
            </label>
            <select
              id={`unit${index}`}
              className="dropdown"
              value={values.ingredients[index].unit}
              onChange={handleUnit}
            >
              <option value="mg">mg</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="liters">liters</option>
              <option value="whole">whole</option>
              <option value="tsp">tsp</option>
              <option value="tbsp">tbsp</option>
              <option value="cup">cups</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
