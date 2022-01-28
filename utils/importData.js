const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Cats = require("../models/mongoDB");

// MONGODB database Connection
const DB = process.env.MONGODB_CONNECTION.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

mongoose.connect(DB).then((db) => {
  console.log("db connection success");
});

const CatsData = JSON.parse(
  fs.readFileSync(`${__dirname}/../data.json`, "utf-8")
);

// node .\utils\importData.js --import
const saveToDB = async () => {
  try {
    await Cats.create(CatsData);
    console.log("data saved to db");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

// node .\utils\importData.js --delete
const deleteData = async () => {
  try {
    await Cats.deleteMany(); // to delete all documents
    console.log("data deleted");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

// console.log(process.argv);

if (process.argv[2] === "--import") {
  saveToDB();
}
if (process.argv[2] === "--delete") {
  deleteData();
}
