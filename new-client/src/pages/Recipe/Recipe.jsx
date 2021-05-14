import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { CommentView } from '../../components/CommentView/CommentView';
import { IngredientView } from '../../components/IngredientView/IngredientView';
import { NewComment } from '../../components/NewComment/NewComment';
import { RateRecipe } from '../../components/RateRecipe/RateRecipe';
import { StepView } from '../../components/StepView/StepView';
import Context from "../../Context";
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
  const { user } = useContext(Context);
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState([]);

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
      setComments((prev) => prev.concat(moreComments.data));
    }
  };

  useEffect(() => {
    const fetchRecipe = async() => {
      const { data } = await axios.get(`/api/recipe/get?id=${recipeID}`);
      data.recipe.ingredients.sort((ing1, ing2) => {
        if (ing1.ingredient.name.length < ing2.ingredient.name.length) return -1;
        if (ing1.ingredient.name.length > ing2.ingredient.name.length) return 1;
        return 0;
      });
      setRecipe(data.recipe);
      setCommentsLength(data.commentLength)
    }
    fetchRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recipe) {
      fetchComments('reload');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                src={`/api/user/avatar?username=${recipe.owner.username}&v=${Date.now()}`}
                alt="Literally avatar"
              />
              <span>
                By{" "}
                <Link to={`/profile/${recipe.owner.username}`}>
                  {recipe.owner.username}
                </Link>
              </span>
            </div>
            <p>{getDate()}</p>
          </div>
          <RateRecipe
            ratings={recipe.rating}
            recipeID={recipe._id}
            setRecipe={setRecipe}
            owner={recipe.owner._id}
          />
          <div className="ingredients">
            <h3>Ingredients</h3>
            <p>Click on the number to check the ingredient.</p>
            {recipe.ingredients.map((ing, index) => (
              <IngredientView key={index} ingredient={ing} index={index} />
            ))}
          </div>
          <div className="instructions">
            <h3>Instructions</h3>
            <p>Follow the steps carefully or you'll be sorry.</p>
            {recipe.instructions.map((ins, index) => (
              <StepView instruction={ins} key={index} index={index} />
            ))}
          </div>
          <div className="comments">
            <h3>
              Comments <span>({commentsLength})</span>
            </h3>
            {comments &&
              comments.map((comment, index) => (
                <CommentView
                  key={index}
                  comment={comment}
                  setCommentsLength={setCommentsLength}
                  setComments={setComments}
                />
              ))}
            {comments.length !== commentsLength && (
              <Button text="Load More" onClick={fetchComments} />
            )}
            {user.get?.user && (
              <NewComment
                setCommentsLength={setCommentsLength}
                setComments={setComments}
                recipeID={recipe._id}
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
}
