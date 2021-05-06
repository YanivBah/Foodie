const Ingredient = require("../model/ingredient");

const searchIngredient = async (req, res) => {
  try {
    const {value} = req.query;
    const regex = new RegExp('^' + value, "i");
    const list = await Ingredient.find({ name: {$regex: regex} }).limit(4);
    res.status(200).send(list);
  } catch(e) {
    console.dir(e);
    res.status(400).send(e)
  }
};

module.exports = { searchIngredient };