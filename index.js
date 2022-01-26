const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

const catsRouter = require("./routes/catsRoutes");

// ROUTES
app.use("/cats", catsRouter);

app.listen(3000, () => {
  console.log("app running");
});
