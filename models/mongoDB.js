const mongoose = require("mongoose");

// defining the structure of DB
const catsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [3, "should be min of 5 length"],
    unique: true,
  },
  breed: {
    type: String,
    required: [true, "breed is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  image: String,
});

// creating a model for our DB
const Cats = mongoose.model("Cats", catsSchema);

module.exports = Cats;
