const express = require("express");
const router = express.Router();
let cats = require("../data");

router.get("/cats", (req, res) => {
  res.json(cats);
});

router.get("/cats/search", (req, res) => {
  //   console.log(req.query.age_lte, req.query.age_gte, req.url);
  if (req?.query?.age_lte && req?.query?.age_gte) {
    cats = cats.filter(
      (cat) => cat.age > req.query.age_lte && cat.age < req.query.age_gte
    );
    if (!cats) {
      res.status(404).send("Not found between age 💩💩");
      return;
    }
    res.json(cats);
    // convert object in to array
    // let output = Object.entries(cat);
    // // console.log(output);
    // let arr = [];
    // arr = output.map((item) => {
    //   return { [item[0]]: item[1] };
    // });
    // // mergeing the array of object to single array of object
    // let newarr = Object.assign({}, ...arr);
    // res.json(newarr);
    // return;
  }
});

router.get("/cats/:name", (req, res) => {
  const data = cats.filter((cat) => cat.name === req.params.name)[0];
  if (data) {
    const { age, breed, name, image, id } = data;
    res.json({
      name,
      age,
      breed,
      image,
      id,
    });
    return;
  }
  res.status(404).send("Not found 💩💩");

  //   const { age, breed, name, image } = cats.filter(
  //     (cats) => cats.name === req.params.name
  //   );
  //   console.log(data);
  //   res.json(data);
  //   console.log(age, breed, name, image, id);
});

router.delete("/cats/:id", (req, res) => {
  //   console.log( +req.params.id);
  cats = cats.filter((cat) => cat.id !== +req.params.id);
  console.log(cats);
  if (cats) {
    res.json(cats);
    return;
  }
  res.status(404).send("cat with given is id not there");
});

router.post("/cats", (req, res) => {
  const { name, age, breed, image } = req.body;
  cats = [...cats, { name, age, breed, image, id: Math.random() * 10 }];
  //   console.log(cats);
  res.json(cats);
});

router.put("/cats/:id", (req, res) => {
  //   console.log("put reques", req.params.id);
  //   console.log(req.body);
  const hello = cats.find((cat) => cat.id === +req.params.id);
  console.log(hello);
  hello.age = req.body.age;
  console.log(hello);

  res.send("put");
});
module.exports = router;
