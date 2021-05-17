import React from 'react';
import './NutritionalValue.css';

export const NutritionalValue = ({ingredient, setNutritionalValue}) => {
  
  const values = () => {
    const keys = Object.keys(ingredient.ingredient.nutrients);
    return keys.map(key => {
      const name = key.charAt(0).toUpperCase() + key.slice(1);
      return (
        <>
          <span>{name}</span>
          <span>{ingredient.ingredient.nutrients[key]}</span>
        </>
      );
    })
  }

  const close = () => setNutritionalValue(null);

  return (
    <div className="nutritional-value">
      <div className="container">
        <span className="material-icons" onClick={close}>
          close
        </span>
        <h4>{ingredient.ingredient.name}</h4>
        <p>Nutritional values are per 100 gram</p>
        {!ingredient.ingredient.nutrients && <p className="red">No values founded.</p>}
        {ingredient.ingredient.nutrients && (
          <div className="grid">{values()}</div>
        )}
      </div>
    </div>
  );
}
