import axios from 'axios';
import { RecipeBox } from "../../components/RecipeBox/RecipeBox";
import React, { useEffect, useState } from 'react'
import './Homepage.css';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Hero } from '../../components/Hero/Hero';

export const Homepage = () => {
  const [recent, setRecent] = useState([]);
  const history = useHistory();
  const fetchRecentRecipes = async() => {
    const {data} = await axios.get("/api/recipe/recent?limit=3&skip=0");
    setRecent(data.recipes);
  }

  useEffect(() => {
    document.title = `Foodie`;
    fetchRecentRecipes()
  }, []);

  return (
    <div className="homepage">
      <Hero/>
      <div className="recent">
        <h2>Recent Recipes</h2>
        <div className="grid-preview">
          {recent.map(recipe => <RecipeBox recipe={recipe} key={recipe._id}/>)}
        </div>
        <Button text="See All" onClick={() => history.push('/recipes')}/>
      </div>
    </div>
  )
}