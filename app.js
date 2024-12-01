import apiRouter from "./api/api.route.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/db.js";

connectDB();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render('pages/home.ejs');
});

// app.get('/api/todos',(req,res) =>{
//   res.render('pages/todos.ejs')
// })

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
