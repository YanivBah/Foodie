const IngredientBox = ({ ingredient, values, setValues }) => {

  const addIngredient = () => {
    const newValues = { ...values };
    const newIngredient = { ...ingredient };
    newIngredient.amount = 0;
    newIngredient.unit = 'mg';
    newValues.ingredients = [...newValues.ingredients, newIngredient];
    newValues.ingredientSearchTerm = '';
    newValues.ingredientFounded = [];
    setValues(newValues);
  };

  return (
    <div className="ingredient-select--item" onClick={addIngredient}>
      {ingredient.name}
      <span className="material-icons">check</span>
    </div>
  );
};

export default IngredientBox
