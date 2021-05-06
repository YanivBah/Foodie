const IngredientSetting = ({ ingredient, values, setValues, number }) => {

  const deleteIngredient = () => {
    const newValue = { ...values };
    newValue.ingredients = newValue.ingredients.filter(newI => newI._id !== ingredient._id);
    setValues(newValue);
  };

  return (
    <div>
      <h4>
        {ingredient.name}
        <span className="material-icons" onClick={deleteIngredient}>
          delete
        </span>
      </h4>

      <label htmlFor={`ingr${number}`}>Amount</label>
      <input type="number" id={`ingr${number}`} />
      <label htmlFor={`measure${number}`}>Unit</label>
      <select id={`measure${number}`}>
        <option value="mg">mg</option>
        <option value="ml">ml</option>
        <option value="oz">oz</option>
        <option value="tsp">tsp</option>
        <option value="tbps">tbps</option>
        <option value="cup">cup</option>
      </select>
    </div>
  );
};

export default IngredientSetting;
