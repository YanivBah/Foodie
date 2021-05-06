import axios from "axios";
import { useEffect, useState } from "react";
import './AddRecipe.css';
import BasicInput from "./BasicInput";
import IngredientBox from "./IngredientBox";
import TagInput from "./TagInput";
import Step from "./Step";
import TagBox from "./TagBox";
import IngredientSetting from "./IngredientSetting";

const AddRecipe = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    tag: '',
    steps: {step1: ''},
    ingredients: [],
    ingredientSearchTerm: '',
    ingredientFounded: [],
    tagInput: '',
    tags: []
  });

  const addStep = () => {
    const length = Object.keys(values.steps).length;
    const newValues = {...values};
    newValues.steps[`step${length+1}`] = '';
    setValues(newValues);
  };

  useEffect(() => {
    const searchIngredient = async () => {
      const { data } = await axios.get(
        `/api/ingredient/search?value=${values.ingredientSearchTerm}`
      );
      const newValue = { ...values };
      newValue.ingredientFounded = data;
      setValues(newValue);
    };

    const timeoutid = setTimeout(() => {
      if (values.ingredientSearchTerm) {
        searchIngredient();
      }
    }, 500);

    return () => {
      clearTimeout(timeoutid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.ingredientSearchTerm]); 

  return (
    <div className="add-recipe">
      <h1>Add new recipe</h1>

      <BasicInput
        id="title"
        label="Title"
        values={values}
        setValues={setValues}
        whatToChange="title"
      />

      <BasicInput
        id="description"
        label="Description"
        values={values}
        setValues={setValues}
        whatToChange="description"
      />

      <div className="steps-title">
        <h3>Instructions</h3>
        <div onClick={addStep}>
          <span>Add new step</span>
          <span className="material-icons">add_box</span>
        </div>
      </div>

      {Object.keys(values.steps).map((step, index) => (
        <Step
          key={index}
          number={index + 1}
          values={values}
          setValues={setValues}
        />
      ))}

      <div>
        <h3>Ingredients</h3>

        <BasicInput
          id="ingredient"
          label="Search for ingredient"
          values={values}
          setValues={setValues}
          whatToChange="ingredientSearchTerm"
        />

        <div className="ingredient-select">
          {values.ingredientFounded.map((ingredient) => (
            <IngredientBox
              ingredient={ingredient}
              values={values}
              setValues={setValues}
            />
          ))}
        </div>
        <div className="ingredient-grid">
          {values.ingredients.map((ingredient, number) => (
            <IngredientSetting
              ingredient={ingredient}
              number={number + 1}
              values={values}
              setValues={setValues}
            />
          ))}
        </div>
      </div>

      <TagInput values={values} setValues={setValues} />

      <div className="tags">
        {values.tags.map((tag,index) => (
          <TagBox key={index} tag={tag} values={values} setValues={setValues} />
        ))}
      </div>
    </div>
  );
}

export default AddRecipe;
