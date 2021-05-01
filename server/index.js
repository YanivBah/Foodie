const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");
const recipeRouter = require("./router/recipe");
const commentRouter = require("./router/comment");

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
app.use(commentRouter);

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