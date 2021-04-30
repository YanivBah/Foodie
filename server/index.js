const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");
const recipeRouter = require("./router/recipe");

mongoose.connect("mongodb://localhost:27017/recipes", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(recipeRouter);

const port = 5000;

app.listen(port, () =>
  console.log(`Express server is running at port ${port}!`)
);