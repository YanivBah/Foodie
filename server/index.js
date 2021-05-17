const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");
const recipeRouter = require("./router/recipe");
const commentRouter = require("./router/comment");
const ingredientRouter = require("./router/ingredient");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// mongoose.connect("mongodb://localhost:27017/recipes", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(recipeRouter);
app.use(commentRouter);
app.use(ingredientRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const port = 5000;
const message =
  "\x1b[36m\x1b[1m" +
`
███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ██╗   ██╗██████╗    
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██║   ██║██╔══██╗   
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ██║   ██║██████╔╝   
╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██║   ██║██╔═══╝    
███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ╚██████╔╝██║        
╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═╝        
                       ██████╗ ███╗   ██╗                                
                      ██╔═══██╗████╗  ██║                                
                      ██║   ██║██╔██╗ ██║                                
                      ██║   ██║██║╚██╗██║                                
                      ╚██████╔╝██║ ╚████║                                
                       ╚═════╝ ╚═╝  ╚═══╝                                
██████╗  ██████╗ ██████╗ ████████╗    ███████╗ ██████╗  ██████╗  ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝    ██╔════╝██╔═████╗██╔═████╗██╔═████╗
██████╔╝██║   ██║██████╔╝   ██║       ███████╗██║██╔██║██║██╔██║██║██╔██║
██╔═══╝ ██║   ██║██╔══██╗   ██║       ╚════██║████╔╝██║████╔╝██║████╔╝██║
██║     ╚██████╔╝██║  ██║   ██║       ███████║╚██████╔╝╚██████╔╝╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ `;
app.listen(port, () => console.log(message + "\x1b[0m"));