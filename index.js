const express = require("express");
const path = require("path");
const app = express();

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

// ROUTES
app.use("/cats", catsRouter);

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("app running");
});
