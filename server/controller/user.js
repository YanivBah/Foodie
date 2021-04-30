const User = require("../model/user");

const loginUser = async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch(e) {
    res.status(400).send(e.message);
  }
};

const signupUser = async (req,res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch(e) {
    res.status(400).send(e)
  }
};

module.exports = { loginUser, signupUser };