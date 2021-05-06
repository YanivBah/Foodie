const IngredientBox = ({ ingredient, values, setValues }) => {

  const addIngredient = () => {
    const newValues = { ...values };
    newValues.ingredients = [...newValues.ingredients, ingredient];
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
