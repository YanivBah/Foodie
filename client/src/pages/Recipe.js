import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import './Recipe.css';
import moment from 'moment';
import { Link } from "react-router-dom";
import Context from "../Context";

const momentConfig = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "DD/MM/YYYY",
};

const Recipe = () => {
  const {user} = useContext(Context);
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [newComment, setNewComment] = useState('');

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

  const addComment = async() => {
    const body = {
      id: recipe._id,
      content: newComment
    };
    const {data} = await axios.post("/api/comment/add", body, {
      headers: {Authorization: `Bearer ${user.get.token}`}
    });
    const newRecipeData = { ...recipe };
    newRecipeData.comments.comments.unshift(data);
    setRecipe(newRecipeData)
    console.log(data);
    console.log(recipe);
  }

  return (
    <>
      {recipe && (
        <>
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
              {recipe.ingredients.map((ing, index) => {
                return (
                  <p key={index}>
                    <span>{index + 1}</span> {ing.ingredient.name} -{" "}
                    {ing.amount} {ing.unit}
                  </p>
                );
              })}
            </div>
            <div className="separator"></div>
            <div className="instructions">
              <h3>Instructions</h3>
              {recipe.instructions.map((ins, index) => {
                return (
                  <div className="instruction">
                    <p>
                      <span className="number">{index + 1}</span>
                      {ins.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="separator"></div>
            <div className="comments">
              <h3>Comments</h3>
              {recipe?.comments?.comments?.length === 0 &&
                "There is no comments yet."}
              {recipe?.comments?.comments?.length > 0 && recipe?.comments?.comments.map((com) => {
                return (
                  <div className="comment">
                    <p>{com.user.username}</p>
                    <p>{com.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {user?.get && (
            <div className="add-comment">
              <label htmlFor="new-comment">Add a comment</label>
              <textarea
                id="new-comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button onClick={addComment}>Send</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Recipe
