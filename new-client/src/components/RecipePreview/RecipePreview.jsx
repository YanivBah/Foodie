import React, { useContext } from 'react';
import Context from "../../Context";
import { Link } from "react-router-dom";
import { IngredientView } from '../IngredientView/IngredientView';
import { StepView } from '../StepView/StepView';
import "./RecipePreview.css";

export const RecipePreview = ({ values }) => {
  const { user } = useContext(Context);
  return (
    <div className="recipe preview">
      <main>
        <img
          className="recipe--image"
          src={values.file.preview}
          alt="recipe img"
        />
        <h1>{values.title}</h1>
        <p className="description">{values.description}</p>

        <div className="meta">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj"
              alt="Literally avatar"
            />
            <span>
              By <Link to=" #">{user.get.user.username}</Link>
            </span>
          </div>
          <p>Uploaded at Today</p>
        </div>

        <div className="ingredients">
          <h3>Ingredients</h3>
          <p>Click on the number to check the ingredient.</p>
          {values.ingredients.map((ing, index) => (
            <IngredientView key={index} ingredient={ing} index={index} />
          ))}
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          <p>Follow the steps carefully or you'll be sorry.</p>
          {values.steps.map((ins, index) => (
            <StepView instruction={ins} key={index} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};
