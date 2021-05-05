import React from 'react';
import { NavLink } from 'react-router-dom';
import './RecipeBox.css';

// import moment from 'moment';
// const momentConfig = {
//   sameDay: "[Today]",
//   nextDay: "[Tomorrow]",
//   nextWeek: "dddd",
//   lastDay: "[Yesterday]",
//   lastWeek: "[Last] dddd",
//   sameElse: "DD/MM/YYYY",
// };

const RecipeBox = ({ recipes }) => {

  const recipesMap = () => {
    return recipes.map((recipe, i) => {
      return (
        <NavLink to={`/recipe/${recipe._id}`} key={i}>
          <div className="recipe-box">
            <div className="recipe-box--image">
              <img
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-chicken-tikka-masala-jpg-1526059261.jpg"
                alt={`${recipe.title} img`}
              />
              <div className="recipe-box--overlay-bottom">
                <h3>{recipe.title}</h3>
                <span>By {recipe.owner.username}</span>
              </div>
            </div>
          </div>
        </NavLink>
      );
    })
  }

  return (
  <div>
    {recipes && recipesMap()}
  </div>
  );
};

export default RecipeBox
