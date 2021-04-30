const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
    isApproved: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Buffer,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    instructions: [
      {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        }
      }
    ],
    ingredients: [
      {
        // ingredient: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   required: true,
        //   ref: "Ingredients",
        // },
        name: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        unit: {
          type: String,
          required: true
        }
      },
    ],
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
