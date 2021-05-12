import axios from 'axios';
import React, { useContext, useState } from 'react'
import './RateRecipe.css';
import Context from "../../Context";

export const RateRecipe = ({ ratings, recipeID, setRecipe, owner }) => {
  const { user, alertPopup } = useContext(Context);

  let initialRating;
  let isRated;

  const averageRating = () => {
    if (ratings.length === 0) {
      return 0;
    }
    let sum = ratings.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0);
    return sum / ratings.length;
  };

  if (user.get && user.get.user._id !== owner) {
    isRated = ratings.find((rating) => rating.user === user.get.user._id);
    if (isRated) initialRating = isRated.rating;
  } else {
    initialRating = averageRating();
  }
  const [rating, setRating] = useState(initialRating);

  const addRating = async (number) => {
    if (isRated) {
      return alertPopup(
        "Unable to rate",
        "You already rated this recipe.",
        "red",
        2500
      );
    }
    if (!user.get) {
      return alertPopup(
        "You are not logged in.",
        "You are not connected to a user.\nPlease login or signup before.",
        "red",
        2500
      );
    }
    if (user.get.user._id === owner) {
      return alertPopup(
        "Unable to rate",
        "You can't rate your own recipe.",
        "red",
        2500
      );
    }
    const body = { id: recipeID, rating: number };
    try {
      await axios.post("/api/recipe/rating", body, {
        headers: { Authorization: `Bearer ${user.get.token}` },
      });
      setRating(number);
      setRecipe((prev) => {
        const newValue = { ...prev };
        newValue.rating.unshift({ user: user.get.user._id, rating: number });
        return newValue;
      });
    } catch (e) {
    }
  };

  const paragraph = () => {
    if (user.get && user.get.user._id === owner) {
      return "Just wait, time make it better.";
    } else if (!user.get) {
      return "Login or signup to rate.";
    } else if (user.get && isRated) {
      return "You are one of them.";
    } else if (user.get && !isRated) {
      return "Maybe you next?";
    }
  }

  return (
    <div className="rating">
      <div className="header">
        <h4>
          {ratings.length === 0
            ? "Be the first person to rate"
            : `${ratings.length} users already rated.`}
        </h4>
        <p>{paragraph()}</p>
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
