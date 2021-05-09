import axios from 'axios';
import { RecipePreview } from "../../components/RecipePreview/RecipePreview";
import React, { useEffect, useState } from 'react'
import './Homepage.css';

export const Homepage = () => {
  const [recent, setRecent] = useState([]);

  const fetchRecentRecipes = async() => {
    const {data} = await axios.get("/api/recipe/recent?limit=5");
    setRecent(data);
  }

  useEffect(() => {fetchRecentRecipes()}, []);

  return (
    <div className="homepage">
      <div className="recent">
        <h2>Recent Recipes</h2>
        {recent.map(recipe => <RecipePreview recipe={recipe} key={recipe._id}/>)}
      </div>
    </div>
  )
}