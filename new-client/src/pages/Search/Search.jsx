import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input/Input';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { IngredientBox } from "../../components/IngredientBox/IngredientBox";
import './Search.css';
import axios from 'axios';
import { Button } from '../../components/Button/Button';
import { RecipeBox } from '../../components/RecipeBox/RecipeBox';

export const Search = () => {
  const [viewAdvanced, setViewAdvanced] = useState(false);
  const [viewResults, setViewResults] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [maxRecipes, setMaxRecipes] = useState(null);
  const [savedParams, setSavedParams] = useState({});
  const [inputValues, setInputValues] = useState({
    basic: "",
    parameter: "Title",
    ingredientSearch: "",
    ingredientsFounded: [],
    ingredients: [],
    title: "",
    tags: "",
  });

  const switchSearch = () => {
    setViewAdvanced((prev) => !prev);
    setInputValues(prev => {
      const newVal = {...prev};
      newVal.ingredientsFounded = [];
      newVal.ingredientSearch = "";
      newVal.ingredients = [];
      newVal.basic = "";
      newVal.parameter = "Title";
      newVal.tags = "";
      return newVal
    })
  };

  useEffect(() => {
    const searchIngredient = async () => {
      const { data } = await axios.get(
        `/api/ingredient/search?value=${inputValues.ingredientSearch}`
      );
      const newValue = { ...inputValues };
      const filteredData = data.filter((ing) => {
        const isExist = inputValues.ingredients.find(
          (ing2) => ing2._id === ing._id
        );
        return isExist ? false : true;
      });
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

  const ingredientDelete = (id) => {
    const filteredIng = {...inputValues};
    filteredIng.ingredients = filteredIng.ingredients.filter(ing => ing._id !== id);
    setInputValues(filteredIng);
  }

  const inputLabel = () => {
    if (inputValues.parameter === "Title") {
      return "Free text"
    }
    if (inputValues.parameter === "Tags") {
      return "Tags separated by comma ( , )"
    }
  }

  const handleSearch = async (type) => {
    let params = {};
    if (type === 'new') {
      if (!viewAdvanced) {
        if (inputValues.parameter === "Title") {
          params.title = inputValues.basic;
        } else if (inputValues.parameter === "Tags") {
          const tags = inputValues.basic.split(",");
          params.tags = tags;
        } else if (inputValues.parameter === "Ingredients") {
          const ingredients = [];
          inputValues.ingredients.forEach((ing) => ingredients.push(ing._id));
          params.ingredients = ingredients;
        }
      } else {
        if (inputValues.title !== "") {
          params.title = inputValues.title;
        }
        if (inputValues.tags !== "") {
          const tags = inputValues.tags.split(",");
          params.tags = tags;
        }
        if (inputValues.ingredients.length > 0) {
          const ingredients = [];
          inputValues.ingredients.forEach((ing) => ingredients.push(ing._id));
          params.ingredients = ingredients;
        }
      }
    } else if (type === 'more') {
      params = { ...savedParams };
    }

    setInputValues(prev => {
      const newVal = {...prev};
      newVal.ingredientsFounded = [];
      return newVal;
    });
    
    params.limit = 6;
    setSavedParams(params);
    if (type === 'new') {
      params.skip = 0;
    } else if (type === 'more') {
      params.skip = recipes.length;
    }

    try {
      const { data } = await axios.get(`/api/recipe/searchIngredient`,
      { params }
      );
      if (type === 'new') {
        setMaxRecipes(data.recipesLength);
        setRecipes(data.recipes);
        setSavedParams(params);
      } else if (type === 'more') {
        setRecipes(prev => prev.concat(data.recipes));
      }
      if (!viewResults) setViewResults(prev => !prev);
    } catch (error) {
      
    }
  }

  return (
    <div className="search">
      {!viewAdvanced && (
        <>
          <div className="header">
            <h1>Search for recipes</h1>
            <p>
              Want a more specific search?{" "}
              <span onClick={switchSearch}>Click for advanced search.</span>
            </p>
          </div>
          <div className="basic">
            <div className="input-container">
              {inputValues.parameter !== "Ingredients" && (
                <Input
                  name="title"
                  label={inputLabel()}
                  type="text"
                  placeholder={`Enter ${inputValues.parameter}`}
                  values={inputValues}
                  onChange={setInputValues}
                  whatToChange="basic"
                />
              )}
              {inputValues.parameter === "Ingredients" && (
                <Input
                  name="ingredientSearch"
                  label="Search ingredient"
                  type="text"
                  placeholder="Enter ingredient name"
                  values={inputValues}
                  onChange={setInputValues}
                  whatToChange="ingredientSearch"
                />
              )}
            </div>
            <div className="dropdown-container">
              <Dropdown
                name="parameter"
                label="Parameter"
                values={inputValues}
                onChange={setInputValues}
                whatToChange="parameter"
                options={["Title", "Tags", "Ingredients"]}
              />
            </div>
          </div>
          {inputValues.parameter === "Ingredients" &&
            inputValues.ingredients.length > 0 && (
              <div className="ingredients-selected">
                <h3>Selected:</h3>
                {inputValues.ingredients.map((ing, index) => (
                  <span key={index} className="selected">
                    {ing.name}
                    <span
                      className="material-icons"
                      onClick={() => ingredientDelete(ing._id)}
                    >
                      clear
                    </span>
                  </span>
                ))}
              </div>
            )}
          {inputValues.parameter === "Ingredients" && (
            <div className="ingredientsFounded">
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
            </div>
          )}
        </>
      )}

      {viewAdvanced && (
        <>
          <div className="header">
            <h1>Advanced search for recipes</h1>
            <p>
              Want a less specific search?{" "}
              <span onClick={switchSearch}>Click for simple search.</span>
            </p>
          </div>
          <Input
            name="title"
            label="Title"
            type="text"
            placeholder={`Enter Title`}
            values={inputValues}
            onChange={setInputValues}
            whatToChange="title"
          />
          <Input
            name="tags"
            label="Tags separated by comma ( , )"
            type="text"
            placeholder={`Enter Tags`}
            values={inputValues}
            onChange={setInputValues}
            whatToChange="tags"
          />
          <Input
            name="ingredientSearch"
            label="Search ingredient"
            type="text"
            placeholder="Enter ingredient name"
            values={inputValues}
            onChange={setInputValues}
            whatToChange="ingredientSearch"
          />
          {inputValues.ingredients.length > 0 && (
            <div className="ingredients-selected">
              <h3>Selected:</h3>
              {inputValues.ingredients.map((ing, index) => (
                <span key={index} className="selected">
                  {ing.name}
                  <span
                    className="material-icons"
                    onClick={() => ingredientDelete(ing._id)}
                  >
                    clear
                  </span>
                </span>
              ))}
            </div>
          )}
          {
            <div className="ingredientsFounded">
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
            </div>
          }
        </>
      )}
      <Button text="Search" onClick={() => handleSearch("new")} />
      {viewResults && (
        <>
          {recipes.length === 0 && <h2>Sorry but not recipes found.</h2>}
          {recipes.length > 0 && (
            <>
              <h2>{maxRecipes} recipes founded.</h2>
              {recipes.map((recipe, index) => (
                <RecipeBox recipe={recipe} key={index} noName={true} />
              ))}
            </>
          )}
          {maxRecipes !== 0 && maxRecipes > recipes.length && (
            <Button text="Load More" onClick={() => handleSearch('more')} />
          )}
        </>
      )}
    </div>
  );
}