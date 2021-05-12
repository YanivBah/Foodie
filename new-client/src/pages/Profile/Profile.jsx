/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Button } from '../../components/Button/Button';
import { RecipeBox } from "../../components/RecipeBox/RecipeBox";
import "./Profile.css";
export const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [maxRecipes, setMaxRecipes] = useState(null);
  const { username } = useParams();

  const fetchRecipes = async() => {
    const { data } = await axios.get(`/api/user/recipes?id=${profile._id}&limit=6&skip=${recipes.length}`);
    setRecipes(prev => prev.concat(data.recipes));
    setMaxRecipes(data.recipesLength);
  }

  useEffect(() => {
    const fetchProfile = async() => {
      const {data} = await axios.get(`/api/user/info?username=${username}`);
      setProfile(data);
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      fetchRecipes();
    }
  }, [profile])

  return (
    <>
      {profile && (
        <div className="profile">
          <div className="head">
            <img
              src="https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj"
              alt=""
            />
            <div>
              <h1>{profile.username}</h1>
              <p>Joined at {moment(profile.createdAt).format("MMM Do YYYY")}</p>
            </div>
          </div>
          <p className="score">
            Score: <span>{profile.score}</span>
          </p>
          <h2>{profile.username}'s recipes</h2>
          <div className="recipes-container">
            {recipes.map(recipe => <RecipeBox recipe={recipe} key={recipe._id} noName={true} />)}
          </div>
          {maxRecipes && maxRecipes > recipes.length && <Button text="Load More" onClick={fetchRecipes}/>}
        </div>
      )}
    </>
  );
}
