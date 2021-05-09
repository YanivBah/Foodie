import React, { useContext } from 'react';
import './IngredientBox.css';
import Context from "../../Context";

export const IngredientBox = ({ ingredient, values, onChange, index, whatToFilter }) => {
  const { alertPopup } = useContext(Context);
  const handleAdd = () => {
    const isExist = values.ingredients.find(ing => ing._id === ingredient._id);
    if (isExist) {
      return alertPopup("Sorry","You have this ingredient already in your list.","yellow",3000);
    }
    const newValues = {...values};
    const newIngredient = { ...ingredient };
    newIngredient.amount = 0;
    newIngredient.unit = 'mg';
    newValues.ingredients = [...newValues.ingredients, newIngredient];
    newValues.ingredientSearchTerm = "";
    newValues[whatToFilter].splice(index, 1);
    onChange(newValues);
  };

  return (
    <div className="ingredient-box" onClick={handleAdd}>
      {ingredient.name}
      <span className="material-icons">check_box_outline_blank</span>
    </div>
  );
};
