import axios from 'axios';
import React, { useContext, useState } from 'react'
import './RateRecipe.css';
import Context from "../../Context";

export const RateRecipe = ({ ratings, recipeID, setRecipe }) => {
  const { user, alertPopup } = useContext(Context);

  let initialRating;
  let isRated;

  const averageRating = () => {
    let sum = ratings.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0);
    return sum / ratings.length;
  };

  if (user.get) {
    isRated = ratings.find((rating) => rating.user === user.get.user._id);
    if (isRated) initialRating = isRated.rating;
  } else {
    initialRating = averageRating();
  }
  const [rating, setRating] = useState(initialRating);

  const addRating = async (number) => {
    if (isRated) {
      return alertPopup(
        "Unable to rate twice",
        "You already rated this recipe.",
        "red",
        2500
      );
    }
    if (!user.get)
      return alertPopup(
        "You are not logged in.",
        "You are not connected to a user.\nPlease login or signup before.",
        "red",
        2500
      );
    const body = { id: recipeID, rating: number };
    try {
      const { data } = await axios.post("/api/recipe/rating", body, {
        headers: { Authorization: `Bearer ${user.get.token}` },
      });
      setRating(number);
      setRecipe(prev => {
        const newValue = {...prev};
        newValue.rating.unshift({user: user.get.user._id, rating: number});
        return newValue;
      });
    } catch (e) {
      console.dir(e);
    }
  };

  return (
    <div className="rating">
      <div className="header">
        {ratings.length === 0 && <h4>Be the first person to rate</h4>}
        {ratings.length > 0 && (
          <>
            <h4>{ratings.length} users already rated.</h4>
            {!user.get && <p>Login or signup to rate.</p>}
            {user.get && isRated && <p>You are one of them.</p>}
            {user.get && !isRated && <p>Maybe you next?</p>}
          </>
        )}
      </div>
      <div className="stars">
        <p>({averageRating()}/5)</p>
        <span
          className={`material-icons star5${rating > 4 ? " checked" : ""}`}
          onClick={() => addRating(5)}
        >
          star
        </span>
        <span
          className={`material-icons star4${rating > 3 ? " checked" : ""}`}
          onClick={() => addRating(4)}
        >
          star
        </span>
        <span
          className={`material-icons star3${rating > 2 ? " checked" : ""}`}
          onClick={() => addRating(3)}
        >
          star
        </span>
        <span
          className={`material-icons star2${rating > 1 ? " checked" : ""}`}
          onClick={() => addRating(2)}
        >
          star
        </span>
        <span
          className={`material-icons star1${rating > 0 ? " checked" : ""}`}
          onClick={() => addRating(1)}
        >
          star
        </span>
      </div>
    </div>
  );
};
