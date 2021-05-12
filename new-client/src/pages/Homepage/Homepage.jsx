import axios from 'axios';
import { RecipeBox } from "../../components/RecipeBox/RecipeBox";
import React, { useEffect, useState } from 'react'
import './Homepage.css';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button/Button';

export const Homepage = () => {
  const [recent, setRecent] = useState([]);
  const history = useHistory();
  const fetchRecentRecipes = async() => {
    const {data} = await axios.get("/api/recipe/recent?limit=5&skip=0");
    setRecent(data.recipes);
  }

  useEffect(() => {fetchRecentRecipes()}, []);

  return (
    <div className="homepage">
      <div className="recent">
        <h2>Recent Recipes</h2>
        {recent.map(recipe => <RecipeBox recipe={recipe} key={recipe._id}/>)}
        <Button text="See All" onClick={() => history.push('/recipes')}/>
      </div>
    </div>
  )
}