import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IngredientView } from '../../components/IngredientView/IngredientView';
import { StepView } from '../../components/StepView/StepView';
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
  const [comments, setComments] = useState([]);

  const fetchComments = async (what = '') => {
    if (what === 'reload') {
      const { data } = await axios.get(
        `/api/comment/get?id=${recipe.comments}&limit=0&skip=2`
      );
      setComments(data);
    } else {
      const moreComments = await axios.get(
        `/api/comment/get?id=${recipe.comments}&limit=${comments.length}&skip=${comments.length+2}`
      );
      setComments((prev) => [...prev, moreComments.data]);
    }
  };

  useEffect(() => {
    const fetchRecipe = async() => {
      const { data } = await axios.get(`/api/recipe/get?id=${recipeID}`);
      console.log(data);
      data.ingredients.sort((ing1, ing2) => {
        if (ing1.ingredient.name.length < ing2.ingredient.name.length) return -1
        if (ing1.ingredient.name.length > ing2.ingredient.name.length) return 1
        return 0;
      });
      setRecipe(data)
    }
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe) {
      fetchComments('reload');
    }
  },[recipe])

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
            {recipe.ingredients.map((ing, index) => <IngredientView key={index} ingredient={ing} index={index}/>)}
          </div>
          <div className="instructions">
            <h3>Instructions</h3>
            <p>Follow the steps carefully or you'll be sorry.</p>
            {recipe.instructions.map((ins,index) => (
              <StepView instruction={ins} key={index} index={index}/>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
