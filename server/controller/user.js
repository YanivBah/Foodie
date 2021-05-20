const User = require("../model/user");
const Recipe = require("../model/recipe");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const loginUser = async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    if (!user.isActive) throw new Error('User not activated');
    //! Deleting expired tokens
    user.tokens.forEach((token, index, array) => {
      try {
        jwt.verify(token.token, "SecretKEYtoJWT");
      } catch (error) {
        array.splice(index,1);
      }
    })
    const token = await user.generateAuthToken();
    res.cookie("jwt_token", token, {
      //! 24 Hours * Seconds in 1 Hour * 1000
      maxAge: 24 * 3600 * 1000,
      httpOnly: true,
      // secure: true
    });
    res.send({ user: user.toPublicJSON(), token });
  } catch(e) {
    res.status(400).send(e.message);
  }
};

const userInfoWithToken = (req, res) => {
  try {
    res.status(200).send(req.user.toPublicJSON());
  } catch (e) {
    res.status(401).send('Please Login');
  }
}

const updateUser = async (req,res) => {
  try {
    const body = JSON.parse(req.body.body);
    const isMatch = await bcrypt.compare(body.oldPassword, req.user.password);
    if (!isMatch) throw new Error('Unable to validate password');
    if (body.username) {
      req.user.username = body.username;
    }
    if (body.email) {
      req.user.email = body.email;
    }
    if (body.newPassword) {
      req.user.password = body.newPassword;
    }
    if (req.file) {
      const buffer = await sharp(req.file.buffer)
      .resize({ width: 600 })
      .jpeg({ quality: 90 })
      .toBuffer();
      req.user.avatar = buffer;
    }
    await req.user.save()
    res.send(req.user.toPublicJSON());
  } catch (e) {
    res.status(400).send(e);
  }
}

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
    const body = JSON.parse(req.body.body);
    if (req.file) {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 600 })
        .jpeg({ quality: 90 })
        .toBuffer();
      body.avatar = buffer;
    }
    const user = new User(body);
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
    res.cookie("jwt_token", 'loggedOut', {
      maxAge: 1,
      httpOnly: true,
      // secure: true
    });
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

const getUserAvatar = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username });
    if (!user.avatar) {
      user.avatar = await getDefaultAvatar();
    }
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
};

const getDefaultAvatar = async() => {
  const avatar = await fs.readFile(path.join(__dirname, "./userDefaultAvatar.jpg"));
  return avatar;
}

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  deleteUser,
  activeUser,
  getUser,
  getUserRecipes,
  getUserAvatar,
  updateUser,
  userInfoWithToken,
};