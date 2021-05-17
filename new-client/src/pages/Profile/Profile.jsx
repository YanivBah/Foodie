/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { RecipeBox } from "../../components/RecipeBox/RecipeBox";
  import Context from "../../Context";
import "./Profile.css";

export const Profile = () => {
  const { user } = useContext(Context);
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
    document.title = `Foodie - Loading...`;
    const fetchProfile = async() => {
      const {data} = await axios.get(`/api/user/info?username=${username}`);
      document.title = `Foodie - ${data.username}'s Profile`;
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
          {user.get && user.get._id === profile._id && (
            <Link to="/dashboard">
              <div className="dashboard-link">
                <span className="material-icons">manage_accounts</span>
                Settings
              </div>
            </Link>
          )}
          <div className="head">
            <img
              src={`/api/user/avatar?username=${
                profile.username
              }&v=${Date.now()}`}
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
          <div className="grid-preview">
            {recipes.map((recipe) => (
              <RecipeBox recipe={recipe} key={recipe._id} noName={true} />
            ))}
          </div>
          {maxRecipes && maxRecipes > recipes.length && (
            <Button text="Load More" onClick={fetchRecipes} />
          )}
        </div>
      )}
    </>
  );
}
