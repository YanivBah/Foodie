import React, { useContext, useEffect, useState } from 'react';
import './AddRecipe.css';
import Context from "../../Context";
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { AddTagInput } from '../../components/AddTagInput/AddTagInput';
import { Tagbox } from '../../components/TagBox/Tagbox';
import { ImageUploadPlusPreview } from '../../components/ImageUploadPlusPreview/ImageUploadPlusPreview';
import { Button } from '../../components/Button/Button';
import axios from 'axios';
import { IngredientBox } from '../../components/IngredientBox/IngredientBox';
import { IngredientSetting } from '../../components/IngredientSetting/IngredientSetting';
import { StepTextarea } from '../../components/StepTextarea/StepTextarea';
import { PreviewRecipe } from '../../components/PreviewRecipe/PreviewRecipe';
import { useHistory } from 'react-router';

export const AddRecipe = () => {
  const { user, alertPopup } = useContext(Context);
  const [page, setPage] = useState(0);
  const history = useHistory();
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    steps: [{ content: "" }, { content: "" }],
    ingredients: [],
    ingredientSearch: "",
    ingredientsFounded: [],
    tagInput: "",
    tags: [],
    file: {
      raw: null,
      preview: null,
    },
  });
  // Here is the Error Handing
  const changePage = (type) => {
    if (type === "increase") {
      switch (page) {
        case 0:
          if (
            inputValues.title === "" ||
            inputValues.description === "" ||
            inputValues.file.raw === null
          ) {
            return alertPopup(
              "Empty field/s",
              "You have one or more empty fields.",
              "red",
              2500
            );
          }
          if (inputValues.tags.length === 0) {
            alertPopup(
              "Suggestion",
              "We suggesting you to add at least one tag.",
              "yellow",
              3000
            );
          }
            break;

        case 1:
          if (inputValues.ingredients.length < 2) {
            return alertPopup(
              "No ingredients added",
              "You have to add at least 2 ingredients.",
              "red",
              2500
            );
          }
          if (inputValues.ingredients.some((ing) => ing.amount === 0 || ing.amount === '0')) {
            return alertPopup(
              "Missing amount",
              "One or more of your ingredients missing amount field.",
              "red",
              2500
            );
          }
            break;
        case 2:
          if (inputValues.steps.some((step) => step.content.length === 0)) {
            return alertPopup(
              "Missing instructions",
              "One or more of the steps is missing.\nDelete one or add text.",
              "red",
              2500
            );
          }
            break;
      
        default:
          break;
      }
      setPage(prev => prev+1);
    } else if (type === "decrease") {
      setPage((prev) => prev - 1);
    }
  }
  // Search Ingredients from Database
  useEffect(() => {
    const searchIngredient = async () => {
      const { data } = await axios.get(
        `/api/ingredient/search?value=${inputValues.ingredientSearch}`
      );
      const newValue = { ...inputValues };
      const filteredData = data.filter(ing => {
        const isExist = inputValues.ingredients.find(ing2 => ing2._id === ing._id);
        return isExist ? false : true;
      })
      newValue.ingredientsFounded = filteredData;
      setInputValues(newValue);
    };
    const timeoutID = setTimeout(() => {
      if (inputValues.ingredientSearch) {
        searchIngredient();
      }
    }, 500);

    return () => {
      clearTimeout(timeoutID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues.ingredientSearch]);

  const addStep = () => {
    const newValues = {...inputValues};
    newValues.steps = [...inputValues.steps, { content: "" }];
    setInputValues(newValues);
  }

  const sendRecipe = async() => {
    const body = {
      title: inputValues.title,
      description: inputValues.description,
      tags: inputValues.tags,
      instructions: inputValues.steps,
      ingredients: [],
    };
    inputValues.ingredients.forEach(ingre => {
      body.ingredients.push({ingredient: ingre._id, amount: ingre.amount, unit: ingre.unit});
    });
    console.log(body);
    const formData = new FormData();
    formData.append("image", inputValues.file.raw);
    formData.append("body", JSON.stringify(body));
    try {
      const { data } = await axios.post("/api/recipe/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${user.get.token}`,
        },
      });
      console.log(data);
      history.push(`/recipe/${data._id}`);
    } catch (error) {
      console.dir(error);
    }
  }

  return (
    <div className="add-recipe">
      <h1>Add a new recipe</h1>
      {/* This will be in page 0 */}
      {page === 0 && (
        <>
          <p>
            You can share your recipes with our community.
            <br />
            Use the best image and title you can for more exposure.
          </p>
          <ImageUploadPlusPreview
            name="fileupload"
            values={inputValues}
            whatToChange={"file"}
            onChange={setInputValues}
          />
          <Input
            name="title"
            label="Title"
            type="text"
            placeholder="The recipe title"
            values={inputValues}
            onChange={setInputValues}
            whatToChange="title"
          />
          <Textarea
            name="description"
            label="description"
            placeholder="How can you describe this recipe the best way?"
            onChange={setInputValues}
            values={inputValues}
            whatToChange="description"
            maxLength="160"
            rows="3"
          />
          <AddTagInput
            name="tag"
            label="Add tags (up to 3)"
            type="text"
            placeholder="Users can find your recipe using tags"
            values={inputValues}
            whatToChange="tagInput"
            whereToPush="tags"
            onChange={setInputValues}
          />
          <div className="tags-container">
            {inputValues.tags.map((tag, index) => (
              <Tagbox
                key={index}
                name={tag}
                values={inputValues}
                whatToChange="tags"
                onChange={setInputValues}
              />
            ))}
          </div>
          <div className="buttons">
            <Button text="Next Page" onClick={() => changePage("increase")} />
          </div>
        </>
      )}
      {/* This will be in page 1 */}
      {page === 1 && (
        <>
          <p>Add all the ingredients used for your recipe.</p>
          <Input
            name="ingredientSearch"
            label="Search ingredient"
            type="text"
            placeholder="Ingredient name"
            values={inputValues}
            onChange={setInputValues}
            whatToChange="ingredientSearch"
          />
          {inputValues.ingredientsFounded.map((ing, index) => (
            <IngredientBox
              index={index}
              key={ing._id}
              ingredient={ing}
              values={inputValues}
              onChange={setInputValues}
              whatToChange="ingredients"
              whatToFilter="ingredientsFounded"
            />
          ))}
          <h3 className="heading-tertiary">
            Your ingredients <span>({inputValues.ingredients.length})</span>
          </h3>
          {inputValues.ingredients.map((ing, index) => (
            <IngredientSetting
              key={ing._id}
              ingredient={ing}
              index={index}
              values={inputValues}
              onChange={setInputValues}
            />
          ))}
          <div className="buttons">
            <Button
              text="Previous Page"
              onClick={() => changePage("decrease")}
            />
            <Button text="Next Page" onClick={() => changePage("increase")} />
          </div>
        </>
      )}
      {page === 2 && (
        <>
          <p>Add all the instructions for the recipe</p>
          <p className="add-step" onClick={addStep}>
            Add Step<span className="material-icons">add_circle</span>
          </p>

          {inputValues.steps.map((step, index) => (
            <StepTextarea
              key={index}
              values={inputValues}
              onChange={setInputValues}
              index={index}
              maxLength="600"
              rows="3"
            />
          ))}

          <div className="buttons">
            <Button
              text="Previous Page"
              onClick={() => changePage("decrease")}
            />
            <Button text="Preview" onClick={() => changePage("increase")} />
          </div>
        </>
      )}
      {page === 3 && (
        <>
          <p>
            Look how your recipe will look like. <br />
            Check if you need to fix something.
          </p>
          <PreviewRecipe values={inputValues} />
          <div className="buttons">
            <Button
              text="Previous Page"
              onClick={() => changePage("decrease")}
            />
            <Button text="Send" onClick={sendRecipe} />
          </div>
        </>
      )}
    </div>
  );
}
