import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './Recipe.css';
export const Recipe = () => {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async() => {
      const { data } = await axios.get(`/api/recipe/get?id=${recipeID}`);
      console.log(data);
      setRecipe(data);
    }
    fetchRecipe();
  }, [])

  return (
    <div className="recipe">
      <main>
        <img
          className="recipe--image"
          src={`/api/recipe/image?id=${recipeID}`}
          alt="recipe img"
        />
        <h1>{recipe?.title}</h1>
        <p className="description">{recipe?.description}</p>
        <div className="meta">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj"
              alt="Literally avatar"
            />
            <span>
              By <Link to="/">{recipe?.owner?.username}</Link>
            </span>
          </div>
          <span>Uploaded at</span>
        </div>
      </main>
    </div>
  );
}
