const Recipe = require("../model/recipe");
const Comment = require("../model/comment");

const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      owner: req.user._id
    });
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
};

const approveRecipe = async (req, res) => {
  try {
    const comment = new Comment({ recipe: req.recipe._id });
    req.recipe.comments = comment._id;
    req.recipe.isApproved = true;
    await comment.save();
    await req.recipe.save();
    res.status(201).send({message: 'Recipe approved'});
  } catch(e) {
    res.status(400).send(e);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const isOwner = req.user._id.toString() === req.recipe.owner.toString();
    if (!isOwner) throw new Error('You are not the owner of this recipe');
    await req.recipe.delete();
    res.status(201).send({message: 'Recipe deleted'});
  } catch (e) {
    res.status(400).send(e);
  }
};

const rateRecipe = async (req, res) => {
  try {
    const isNotOwner = req.user._id.toString() !== req.recipe.owner.toString();
    if (!isNotOwner) throw new Error('You cant rate your own recipe');
    if (req.body.rating > 5) throw new Error('You can rate from 1-5 only');
    const isUserRated = await Recipe.find({"rating.user": req.user._id});
    if (isUserRated.length !== 0) throw new Error('You rated already on this recipe');
    req.recipe.rating.push({user: req.user._id, rating: req.body.rating});
    await req.recipe.save();
    res.status(201).send({message: 'Rating added'});
  } catch(e) {
    res.status(400).send(e.message);
  }
};

module.exports = { addRecipe, deleteRecipe, rateRecipe, approveRecipe };
