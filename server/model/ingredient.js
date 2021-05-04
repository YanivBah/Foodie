const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nutrients: {
    calories: {
      type: Number,
    },
    protein: {
      type: Number,
    },
    fat: {
      type: Number,
    },
    carbs: {
      type: Number,
    },
    fiber: {
      type: Number,
    },
  }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);


// const fs = require("fs").promises;
// const dataInsert = async() => {
//   const ingredientsDATA = await JSON.parse(await fs.readFile("./model/filtered1.json", "utf-8"));
//   const dataArray = [];
//   // console.log(ingredientsDATA);
//   ingredientsDATA.forEach(ingredient => {
//     const obj = {
//       name: ingredient.label,
//       nutrients: {}
//     };
//     if (ingredient.nutrients?.calories) obj.nutrients.calories = ingredient.nutrients.calories;
//     if (ingredient.nutrients?.protein) obj.nutrients.protein = ingredient.nutrients.protein;
//     if (ingredient.nutrients?.fat) obj.nutrients.fat = ingredient.nutrients.fat;
//     if (ingredient.nutrients?.carbs) obj.nutrients.carbs = ingredient.nutrients.carbs;
//     if (ingredient.nutrients?.fiber) obj.nutrients.fiber = ingredient.nutrients.fiber;
//     dataArray.push(obj);
//   });
//   try {
//     Ingredient.insertMany(dataArray);
//   } catch (e) {
//     console.log(e);
//   }
// }
// dataInsert();

module.exports = Ingredient;