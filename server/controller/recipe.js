const mongoose = require("mongoose");
const User = require("../model/user");
const Recipe = require("../model/recipe");

const addRecipe = async (req, res) => {
  try {
    req.body.owner = mongoose.Types.ObjectId(req.user._id);
    const recipe = new Recipe(req.body);
    req.user.recipes.push(mongoose.Types.ObjectId(recipe._id));
    await recipe.save();
    await req.user.save();
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { addRecipe };
