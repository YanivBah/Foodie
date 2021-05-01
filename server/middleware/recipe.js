const Recipe = require("../model/recipe");

const recipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.body.id);
    if (!recipe) throw new Error();
    req.recipe = recipe;
    next();
  } catch (e) {
    res.status(404).send({ error: "Recipe not found." });
  }
};

module.exports = recipe;