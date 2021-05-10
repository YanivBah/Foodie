import React, { useState } from 'react';
import './IngredientView.css';

export const IngredientView = ({ingredient, index}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecking = () => {
    setIsChecked(prev => !prev);
  }
  return (
    <div className="ingredient-view">
      <span className="number" onClick={handleChecking}>{index + 1}</span>
      <span className={`name${isChecked ? ' checked' : ''}`}>{ingredient.ingredient.name}</span>
      <span className={`unit${isChecked ? ' checked' : ''}`}> - {ingredient.amount} {ingredient.unit}</span>

    </div>
  );
}
