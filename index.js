const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
// for getting the req.body in post req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

// reading the json file
let cats = JSON.parse(fs.readFileSync(path.join(__dirname, "./data.json")));
// console.log(cats);
const getAllCats = (req, res) => {
  res.status(200).json(cats);
};

const createNewCat = (req, res) => {
  const { name, age, breed, image } = req.body;
  cats = [...cats, { name, age, breed, image, id: Math.random() * 10 }];
  //   console.log(cats);
  fs.writeFile(
    path.join(__dirname, "../data.json"),
    JSON.stringify(cats),
    (err) => {
      console.log(err);
    }
  );
  res.status(201).json(cats);
};

const deleteCatById = (req, res) => {
  //   console.log(req.params.id);

  //   find the cat with given id
  let toBeDeleted = cats.find((cat) => cat.id === +req.params.id);
  //   console.log(toBeDeleted);
  if (!toBeDeleted) {
    res.status(404).send("cat with given is id not there");
    return;
  }
  //   remove the cat which we have find with the id from cats array
  cats = cats.filter((cat) => cat !== temp);
  //   console.log(cats);
  fs.writeFile(
    path.join(__dirname, "./data.json"),
    JSON.stringify(cats),
    (err) => {
      console.log(err);
    }
  );
  res.status(204).json(null);
};

const updateCatById = (req, res) => {
  //   console.log("put reques", req.params.id);
  const toBeUpdated = cats.find((cat) => cat.id === +req.params.id);
  console.log("before", toBeUpdated);
  toBeUpdated.age = req.body.age;
  toBeUpdated.name = req.body.name;
  toBeUpdated.breed = req.body.breed;
  toBeUpdated.image = req.body.image;
  console.log("after", toBeUpdated);

  cats = [...cats, toBeUpdated];
  console.log("final", cats);

  //   fs.writeFile(
  //     path.join(__dirname, "../data.json"),
  //     JSON.stringify(cats),
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  res.send("put");
};

const findByName = (req, res) => {
  const data = cats.filter((cat) => cat.name === req.params.name)[0];
  if (data) {
    const { age, breed, name, image, id } = data;
    res.status(200).json({
      name,
      age,
      breed,
      image,
      id,
    });
    return;
  }
  res.status(404).send("Not found 💩💩");
};

const findByAge = (req, res) => {
  //   console.log(req.query.age_lte, req.query.age_gte, req.url);
  if (req?.query?.age_lte && req?.query?.age_gte) {
    cats = cats.filter(
      (cat) => cat.age > req.query.age_lte && cat.age < req.query.age_gte
    );
    if (!cats) {
      res.status(404).send("Not found between age 💩💩");
      return;
    }
    res.status(200).json(cats);
  }
};
//2) other way

// app.get("/cats", getAllCats);
// app.post("/cats", createNewCat);
app.route("/cats").get(getAllCats).post(createNewCat);

// app.delete("/cats/:id", deleteCatById);
// app.put("/cats/:id", updateCatById);
app.route("/cats/:id").delete(deleteCatById).put(updateCatById);

app.get("/cats/:name", findByName);
app.get("/cats/search", findByAge);

//1) good way

// app.get("/cats", getAllCats);
// app.post("/cats", createNewCat);
// app.delete("/cats/:id", deleteCatById);
// app.put("/cats/:id", updateCatById);
// app.get("/cats/:name", findByName);
// app.get("/cats/search", findByAge);

app.listen(3000, () => {
  console.log("app running");
});
