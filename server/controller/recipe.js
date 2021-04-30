const { findById } = require("../model/recipe");
const Recipe = require("../model/recipe");

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

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.id);
    const isOwner = req.user._id.toString() === recipe.owner.toString();
    if (!isOwner) throw new Error('You are not the owner of this recipe');
    await recipe.delete();
    res.status(201).send({message: 'Recipe deleted'});
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { addRecipe, deleteRecipe };
