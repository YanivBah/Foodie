import React from 'react'
import { NavLink } from 'react-router-dom'
import "./RecipeBox.css";
export const RecipeBox = ({ recipe }) => {
  return (
    <div className="recipe-preview">
      <NavLink to={`/recipe/${recipe._id}`}>
        <div className="recipe-preview--image">
          <img src={`/api/recipe/image?id=${recipe._id}`} alt="recipe" />
          <div className="title">
            <h3>{recipe.title}</h3>
            <span>By {recipe.owner.username}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
