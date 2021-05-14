const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const Recipe = require("./recipe");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (/\W/g.test(value)) {
          throw new Error(`You can't use spaces or symbols`);
        }
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      uniqueCaseInsensitive: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`This is invalid email.`);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value, {minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1})) {
          throw new Error(`You need password with atleast 8 characters, 1 lowercase, 1 uppercase and 1 symbol`);
        }
      }
    },
    avatar: {
      type: Buffer,
    },
    score: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      // default: false,
      default: true
    },
    // permissions: {
    //   ableToComment: {
    //     type: Boolean,
    //     default: true
    //   },
    //   ableToApprove: {
    //     type: Boolean,
    //     default: false
    //   },
    //   ableToBan: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.virtual('recipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'owner'
});


userSchema.plugin(uniqueValidator, { message: "is already taken." });

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Recipe.deleteMany({owner: user._id});
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
  const token = jwt.sign({_id: user._id.toString() }, 'SecretKEYtoJWT', { expiresIn: '1 day' });
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.methods.toPublicJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.permissions;
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};


const User = mongoose.model("User", userSchema);

module.exports = User;