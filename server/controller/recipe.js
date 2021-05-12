const sharp = require("sharp");
const Recipe = require("../model/recipe");
const Comment = require("../model/comment");
const User = require("../model/user");

// router.post(
//   "/api/image/test",
//   upload.single("image"),
//   async (req, res) => {
//     const buffer = await sharp(req.file.buffer)
//       .resize({ width: 500 })
//       .jpeg({ quality: 80 })
//       .toBuffer();

//     res.send(obj);
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

const addRecipe = async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({width: 500})
      .jpeg({quality: 80})
      .toBuffer();
    const body = JSON.parse(req.body.body);
    body.ingredients.forEach(ing => ing.amount = parseInt(ing.amount));
    body.image = buffer;
    const recipe = new Recipe({
      ...body,
      owner: req.user._id
    });
    const comment = new Comment({ recipe: recipe._id });
    recipe.comments = comment._id;
    // if (req.user.permissions.ableToApprove) {
    //   const comment = new Comment({ recipe: recipe._id });
    //   recipe.comments = comment._id;
    //   recipe.isApproved = true;
    //   await comment.save();
    // }
    await comment.save();
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    console.dir(e);
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
    // if (recipeOwner.score >= 100) {
    //   recipeOwner.permissions.ableToApprove = true;
    // }
    recipeOwner.save();
    await req.recipe.save();
    res.status(201).send({message: 'Rating added'});
  } catch(e) {
    res.status(400).send(e);
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.query;
    const recipe = await Recipe.findById(id);
    await recipe.populate({ path: "ingredients.ingredient" }).execPopulate();
    // await recipe
    //   .populate({
      //     path: "comments",
      //     select: "comments",
      //     options: {limit: 1},
      //     populate: { path: "comments.user", select: "username -_id" },
      //   })
      //   .execPopulate();
      await recipe.populate({ path: "owner", select: "username"}).execPopulate();
      const comments = await Comment.findById(recipe.comments);
    recipe.image = undefined;
    res.status(200).send({ recipe, commentLength: comments.comments.length });
  } catch (e) {
    res.status(400).send(e);
  }
}

const getRecentRecipe = async (req, res) => {
  try {
    const { limit } = req.query;
    const recipes = await Recipe.find()
      .sort("-createdAt")
      .limit(parseInt(limit))
      .populate({ path: "owner", select: "username" })
      .populate({ path: "ingredients.ingredient" });
    res.status(200).send(recipes);
  } catch (e) {
    res.status(400).send(e);
  }
}

const getRecipeImage = async (req, res) => {
  try {
    const { id } = req.query;
    const recipe = await Recipe.findById(id);
    if (!recipe.image) throw new Error();
    res.set('Content-Type','image/jpg');
    res.send(recipe.image);
  } catch (e) {
    res.status(404).send();
  }
}

module.exports = {
  addRecipe,
  deleteRecipe,
  rateRecipe,
  approveRecipe,
  editRecipe,
  getRecipe,
  getRecentRecipe,
  getRecipeImage,
};