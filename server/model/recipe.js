const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Comment = require("./comment");

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    rating: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Buffer,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    instructions: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    ingredients: [
      {
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Ingredient",
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

RecipeSchema.pre("remove", async function (next) {
  const recipe = this;
  await Comment.findByIdAndDelete(recipe.comments.toString());
  next();
});

RecipeSchema.pre("deleteMany", async function (next) {
  const userID = this._conditions.owner;
  const recipes = await Recipe.find({ owner: userID });
  recipes.forEach(async recipe => {
    const comment = await Comment.findById(recipe.comments);
    comment.remove();
  });
  next();
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;