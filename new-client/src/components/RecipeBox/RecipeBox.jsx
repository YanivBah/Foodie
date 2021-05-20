import React from 'react'
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./RecipeBox.css";
export const RecipeBox = ({ recipe, noName }) => {
  return (
    <div className="recipe-preview">
      <NavLink to={`/recipe/${recipe._id}`}>
        <div className="recipe-preview--image">
          <LazyLoadImage
            alt="recipe"
            height="208"
            src={`/api/recipe/image?id=${recipe._id}`} // use normal <img> attributes as props
          />
          {/* <img src={`/api/recipe/image?id=${recipe._id}`} alt="recipe" /> */}
          <div className="title">
            <h3>{recipe.title}</h3>
            {!noName && <span>By {recipe.owner.username}</span>}
          </div>
        </div>
      </NavLink>
    </div>
  );
};
