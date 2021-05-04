const Recipe = require("../model/recipe");
const Comment = require("../model/comment");
const User = require("../model/user");

const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      owner: req.user._id
    });
    if (req.user.permissions.ableToApprove) {
      const comment = new Comment({ recipe: recipe._id });
      recipe.comments = comment._id;
      recipe.isApproved = true;
      await comment.save();
    }
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
};

const editRecipe = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "id",
    "title",
    "description",
    "instructions",
    "ingredients",
    "tags",
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) throw new Error("Invalid updates!");
  try {
    if (req.recipe.owner.toString() !== req.user._id.toString()) {
      throw new Error("You are now the owner of this recipe");
    }
    updates.forEach(update => req.recipe[update] = req.body[update]);
    await req.recipe.save();
    res.send(req.recipe);
  } catch(e) {
    res.status(400).send(e);
  }
}

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
    const isUserRated = await Recipe.findOne({_id: req.recipe._id ,"rating.user": req.user._id});
    if (isUserRated) throw new Error('You rated already on this recipe');
    req.recipe.rating.push({user: req.user._id, rating: req.body.rating});
    const recipeOwner = await User.findById(req.recipe.owner);
    recipeOwner.score += req.body.rating;
    if (recipeOwner.score >= 100) {
      recipeOwner.permissions.ableToApprove = true;
    }
    recipeOwner.save();
    await req.recipe.save();
    res.status(201).send({message: 'Rating added'});
  } catch(e) {
    res.status(400).send(e.message);
  }
};

const getRecipe = async (req, res) => {
  await req.recipe.populate({ path: "ingredients.ingredient"}).execPopulate();
  res.status(200).send(req.recipe);
}

module.exports = {
  addRecipe,
  deleteRecipe,
  rateRecipe,
  approveRecipe,
  editRecipe,
  getRecipe
};