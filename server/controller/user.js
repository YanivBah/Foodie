const User = require("../model/user");
const Recipe = require("../model/recipe");

const loginUser = async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    if (!user.isActive) throw new Error('User not activated');
    const token = await user.generateAuthToken();
    res.send({ user: user.toPublicJSON(), token });
  } catch(e) {
    res.status(400).send(e.message);
  }
};

const activeUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    user.isActive = true;
    await user.save();
    res.status(201).send({message: 'User activated'});
  } catch(e) {
    res.status(400).send(e.message)
  }
};

const signupUser = async (req,res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user.toPublicJSON());
  } catch(e) {
    res.status(400).send(e)
  }
};

const logoutUser = async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    });
    await req.user.save();
    res.send({ message: "Logged out" });
  } catch(e) {
    res.status(400).send(e)
  }
};

const deleteUser = async (req,res) => {
  try {
    await req.user.delete();
    res.send({ message: "User deleted" });
  } catch(e) {
    res.status(400).send(e)
  }
};

const getUser = async (req, res) => {
  try {
    const {username, id} = req.query;
    let user;
    if (username) user = await User.findOne({username});
    else if (id) user = await User.findById(id);
    else throw ('wrong queries');
    // await req.user.populate({ path: "recipes", limit: 2 , populate: { path: "comments"}}).execPopulate();
    // await req.user.populate("recipes").execPopulate();
    res.status(200).send(user.toPublicJSON());
  } catch(e) {
    res.status(400).send(e);
  }
}

const getUserRecipes = async (req, res) => {
  try {
    const { id, limit, skip } = req.query;
    const recipes = await Recipe.find({owner: id}, "_id title owner")
      .sort("-createdAt")
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    const recipesLength = await Recipe.countDocuments({ owner: id });
    res.status(200).send({ recipes, recipesLength: recipesLength });
  } catch(e) {
    res.status(400).send(e);
  }
}

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  deleteUser,
  activeUser,
  getUser,
  getUserRecipes,
};