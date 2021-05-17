import React, { useState } from 'react';
import './IngredientView.css';

export const IngredientView = ({ ingredient, index, setNutritionalValue }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecking = () => {
    setIsChecked((prev) => !prev);
  };

  const handleNutritional = () => setNutritionalValue(ingredient);

  return (
    <div className="ingredient-view">
      <span className="number" onClick={handleChecking}>
        {index + 1}
      </span>
      {ingredient?.ingredient ? (
        <>
          <span
            className={`name${isChecked ? " checked" : ""}`}
            onClick={handleNutritional}
          >
            {ingredient.ingredient.name}
          </span>
          <span className={`unit${isChecked ? " checked" : ""}`}>
            {" "}
            - {ingredient.amount} {ingredient.unit}
          </span>
        </>
      ) : (
        <>
          <span
            className={`name${isChecked ? " checked" : ""}`}
            onClick={handleNutritional}
          >
            {ingredient.name}
          </span>
          <span className={`unit${isChecked ? " checked" : ""}`}>
            {" "}
            - {ingredient.amount} {ingredient.unit}
          </span>
        </>
      )}
    </div>
  );
};
