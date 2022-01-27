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

const Cats = require("./models/mongoDB");
// creating a new doc in db
const newCat = new Cats({
  name: "tori",
  breed: "third",
  image: "https://cdn2.thecatapi.com/images/a9h.jpg",
  age: 11,
});

// saving to DB
newCat
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err.message);
  });

// ROUTES
app.use("/cats", catsRouter);
app.use("/users", userRouter);

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("app running");
});
