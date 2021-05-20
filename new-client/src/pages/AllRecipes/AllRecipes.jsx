/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { RecipeBox } from '../../components/RecipeBox/RecipeBox';
import './AllRecipes.css';

export const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesLength, setRecipesLength] = useState([]);

  const fetchRecentRecipes = async () => {
    const { data } = await axios.get(`/api/recipe/recent?limit=6&skip=${recipes.length}`);
    setRecipes((prev) => prev.concat(data.recipes));
    setRecipesLength(data.recipesLength);
  };
  
  useEffect(() => {
    document.title = "Foodie - All Recipes";
    fetchRecentRecipes()
  }, []);

  return (
    <div className="all-recipes">
      <h2>All Recipes</h2>
      <div className="grid-preview">
        {recipes.map(recipe => <RecipeBox recipe={recipe} key={recipe._id}/>)}
      </div>
      {recipesLength && recipesLength > recipes.length && <Button text="Load More" onClick={fetchRecentRecipes}/>}
    </div>
  )
}
