import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import './Recipe.css';
import moment from 'moment';
import { Link } from "react-router-dom";

const momentConfig = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "DD/MM/YYYY",
};

const Recipe = () => {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetching = async() => {
      const { data } = await axios.get(`/api/recipe/get?id=${recipeID}`);
      console.log(data);
      setRecipe(data);
    }
    fetching();
  }, []);

  const getDate = () => {
    if (recipe.updatedAt !== recipe.createdAt) {
      const updatedAt = `Updated at ${moment().calendar(recipe.updatedAt, momentConfig)}`;
      return updatedAt;
    }
    const createdAt = `Created at ${moment().calendar(recipe.createdAt, momentConfig)}`;
    return createdAt;
  }

  return (
    <>
      {recipe && (
        <div className="container">
          <div className="recipe-image">
            <img src={`/api/recipe/image?id=${recipeID}`} alt="recipe img" />
            <h1>{recipe.title}</h1>
          </div>
          <div className="meta-data">
            <span>
              By{" "}
              <Link to={`/profile/${recipe.owner.username}`}>
                {recipe.owner.username}
              </Link>
            </span>
            <span>{getDate()}</span>
          </div>
          {/* <div className="meta-data">
            <span>Tags: {recipe.tags.map((tag) => `${tag},`)}</span>
          </div> */}
          <div className="description">
            <p>{recipe.description}</p>
          </div>
          <div className="separator"></div>
          <div className="ingredients">
            <h3>Ingredients</h3>
            {recipe.ingredients.map((ing,index) => {
              return (
                <p key={index}>{index+1}. {ing.ingredient.name} - {ing.amount} {ing.unit}</p>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Recipe
