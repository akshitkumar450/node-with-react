const express = require("express");
const path = require("path");
const app = express();
const blogsRouter = require(path.join(__dirname, "routes/blog.js"));
var cors = require("cors");

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", blogsRouter);
app.use("/cats", blogsRouter);
app.use("/cats/:id", blogsRouter);

app.listen(3000);
