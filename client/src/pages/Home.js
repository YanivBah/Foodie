import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import RecipeBox from '../components/RecipeBox/RecipeBox';
import Context from "../Context";

const Home = () => {
  const states = useContext(Context);

  const fetching = async() => {
    const {data} = await axios.get("/api/recipe/recent?limit=5");
    states.recentRecipes.set(data);
  }

  useEffect(() => {
    fetching();
  }, [])

  return (
    <div className="margin-top-100">
      <RecipeBox recipes={states.recentRecipes.get} />
    </div>
  );
}

export default Home