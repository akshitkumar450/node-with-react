const fs = require("fs");
const path = require("path");

// reading the json file
let cats = JSON.parse(fs.readFileSync(path.join(__dirname, "../data.json")));
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
  cats = cats.filter((cat) => cat !== toBeDeleted);
  //   console.log(cats);
  fs.writeFile(
    path.join(__dirname, "../data.json"),
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

// for checking whether we have a data in post request
// it is a middleware which will run before createNewCat
const checkBody = (req, res, next) => {
  if (!req.body || !req.body.name) {
    res.status(400).send("No name or data to be added");
    return;
  }
  next();
};

module.exports = {
  getAllCats,
  createNewCat,
  deleteCatById,
  updateCatById,
  findByAge,
  findByName,
  checkBody,
};
