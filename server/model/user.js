const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      // match: [/regex/, "invalid characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: Buffer,
      default: "",
    },
    score: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false
    },
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Recipe'
    }],
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "is already taken." });

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  let user = await User.findOne({ email });
  if (!user) user = await User.findOne({username: email});
  if (!user) throw new Error("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");
  return user;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString() }, 'SecretKEYtoJWT', { expiresIn: '7 days' });
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;