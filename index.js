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

// own middleware
// this will run every time we make our request to any route
// order of middleware matters
app.use((req, res, next) => {
  console.log("own middleware");
  next();
});
app.use((req, res, next) => {
  // this will be available on all requests made
  req.requestTime = new Date().toISOString();
  next();
});

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
    path.join(__dirname, "./data.json"),
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
  //     path.join(__dirname, "./data.json"),
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
  //   console.log("find by age");
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

const catsRouter = express.Router();
app.use("/cats", catsRouter);

//2) other way

catsRouter.route("/").get(getAllCats).post(createNewCat);
catsRouter.route("/:id").delete(deleteCatById).put(updateCatById);
catsRouter.route("/search").get(findByAge);
catsRouter.route("/:name").get(findByName);

//1) good way

// catsRouter.get("/", getAllCats);
// catsRouter.post("/", createNewCat);
// catsRouter.delete("/:id", deleteCatById);
// catsRouter.put("/:id", updateCatById);
// catsRouter.get("/:name", findByName);
// catsRouter.get("/search", findByAge);

app.listen(3000, () => {
  console.log("app running");
});
