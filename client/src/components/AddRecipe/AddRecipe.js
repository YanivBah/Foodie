import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './AddRecipe.css';
import BasicInput from "./BasicInput";
import IngredientBox from "./IngredientBox";
import TagInput from "./TagInput";
import Step from "./Step";
import TagBox from "./TagBox";
import IngredientSetting from "./IngredientSetting";
import Context from "../../Context";

const AddRecipe = () => {
  const states = useContext(Context);

  const [values, setValues] = useState({
    title: '',
    description: '',
    tag: '',
    steps: {step1: ''},
    ingredients: [],
    ingredientSearchTerm: '',
    ingredientFounded: [],
    tagInput: '',
    tags: [],
    file: {
      raw: null,
      preview: null
    }
  });

  const handleAddingRecipe = async() => {
    const body = {
      title: values.title,
      description: values.description,
      tags: values.tags,
      instructions: [],
      ingredients: []
    };
    Object.keys(values.steps).forEach(key => {
      body.instructions.push({title: key, description: values.steps[key]});
    });
    values.ingredients.forEach(ingre => {
      body.ingredients.push({ingredient: ingre._id, amount: ingre.amount, unit: ingre.unit});
    });

    const formData = new FormData();
    formData.append('image', values.file.raw);
    formData.append('body', JSON.stringify(body));
    
    const { data } = await axios.post("/api/recipe/add", formData, {
      headers: {'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${states.user.get.token}`}
    });
    console.log(data);
  }

  const handleFileInput = async(e) => {
    if (e.target.files.length) {
      const newValues = {...values};
      newValues.file.raw = e.target.files[0];
      newValues.file.preview = URL.createObjectURL(e.target.files[0]);
      setValues(newValues);
    }
  }

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
      {values.file.preview && (
        <img
          src={values.file.preview}
          alt="Your upload img"
          className="upload-preview"
        />
      )}
      <input
        type="file"
        id="upload"
        className="inputfile"
        onChange={handleFileInput}
      />
      <label htmlFor="upload">
        {!values.file.raw ? "Chose a image" : "Upload different"}
      </label>

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
        {values.tags.map((tag, index) => (
          <TagBox key={index} tag={tag} values={values} setValues={setValues} />
        ))}
      </div>

      <button onClick={handleAddingRecipe}>Send</button>
    </div>
  );
}

export default AddRecipe;
