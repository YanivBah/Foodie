import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IngredientView } from '../../components/IngredientView/IngredientView';
import './Recipe.css';

const momentConfig = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "DD/MM/YYYY",
};

export const Recipe = () => {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async() => {
      const { data } = await axios.get(`/api/recipe/get?id=${recipeID}`);
      console.log(data);
      data.ingredients.sort((ing1, ing2) => {
        if (ing1.ingredient.name.length < ing2.ingredient.name.length) return -1
        if (ing1.ingredient.name.length > ing2.ingredient.name.length) return 1
        return 0;
      })
      setRecipe(data);
    }
    fetchRecipe();
  }, []);

  const getDate = () => {
    if (recipe.updatedAt !== recipe.createdAt) {
      const updatedAt = `Updated at \n${moment().calendar(recipe.updatedAt, momentConfig)}`
      return updatedAt;
    }
    const createdAt = `Uploaded at \n${moment().calendar(recipe.createdAt, momentConfig)}`
    return createdAt;
  }

  return (
    <div className="recipe">
      {recipe && (
        <main>
          <img
            className="recipe--image"
            src={`/api/recipe/image?id=${recipeID}`}
            alt="recipe img"
          />
          <h1>{recipe.title}</h1>
          <p className="description">{recipe.description}</p>
          <div className="meta">
            <div className="user">
              <img
                src="https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj"
                alt="Literally avatar"
              />
              <span>
                By <Link to="/">{recipe.owner.username}</Link>
              </span>
            </div>
            <p>{getDate()}</p>
          </div>
          <div className="ingredients">
            <h3>Ingredients</h3>
            <p>Click on the number to check the ingredient.</p>
            {recipe.ingredients.map((ing, index) => <IngredientView ingredient={ing} index={index}/>)}
          </div>
        </main>
      )}
    </div>
  );
}
