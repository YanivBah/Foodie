const User = require("../model/user");

const loginUser = async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    if (!user.isActive) throw new Error('User not activated');
    const token = await user.generateAuthToken();
    res.send({user, token});
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
}

const signupUser = async (req,res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
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

module.exports = { loginUser, signupUser, logoutUser, deleteUser, activeUser };