const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
// path to env file
dotenv.config({
  path: "./config.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

const catsRouter = require("./routes/catsRoutes");
const userRouter = require("./routes/userRoutes");

// MONGODB database Connection
const DB = process.env.MONGODB_CONNECTION.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
mongoose.connect(DB).then((db) => {
  // console.log("db connection success", db.connection);
  console.log("db connection success");
});

// ROUTES
app.use("/cats", catsRouter);
app.use("/users", userRouter);

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("app running");
});
