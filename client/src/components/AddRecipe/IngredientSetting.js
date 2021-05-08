const IngredientSetting = ({ ingredient, values, setValues, number }) => {

  const deleteIngredient = () => {
    const newValue = { ...values };
    newValue.ingredients = newValue.ingredients.filter(newI => newI._id !== ingredient._id);
    setValues(newValue);
  };

  const changeUnit = (e) => {
    const index = values.ingredients.findIndex(i => i._id === ingredient._id);
    const newValue = { ...values };
    newValue.ingredients[index].unit = e.target.value;
    setValues(newValue);
  }

  const changeAmount = (e) => {
    const index = values.ingredients.findIndex(i => i._id === ingredient._id);
    const newValue = { ...values };
    newValue.ingredients[index].amount = e.target.value;
    setValues(newValue);
  }

  return (
    <div>
      <details>
        <summary>
          {number}. {ingredient.name}
        </summary>
        <div className="ingre-grid">
          <div>
            <label htmlFor={`ingr${number}`}>Amount</label>
            <input
              type="number"
              id={`ingr${number}`}
              value={ingredient.amount}
              onChange={changeAmount}
            />
          </div>
          <div>
            <label htmlFor={`measure${number}`}>Unit</label>
            <select
              id={`measure${number}`}
              value={ingredient.unit}
              onChange={changeUnit}
            >
              <option value="whole">whole</option>
              <option value="mg">mg</option>
              <option value="ml">ml</option>
              <option value="oz">oz</option>
              <option value="tsp">tsp</option>
              <option value="tbsp">tbsp</option>
              <option value="cup">cup</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>
      </details>
      {/* <h4>
        {number}. {ingredient.name}
        <span className="material-icons" onClick={deleteIngredient}>
          delete
        </span>
      </h4> */}
    </div>
  );
};

export default IngredientSetting;
