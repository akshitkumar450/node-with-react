// const db = require("../db");
const Cats = require("../models/mongoDB");

const getAllCats = async (req, res) => {
  // MONGODB
  try {
    const result = await Cats.find();
    if (result.length !== 0) {
      res.status(200).json(result);
      return;
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // MYSQL with pooling
  // db.getConnection((err, con) => {
  //   if (err) {
  //     con.release();
  //     throw err;
  //   }
  //   con.query("SELECT * FROM Cats ", (err, result, fields) => {
  //     if (err) throw err;
  //     console.log("all", result);
  //     if (result.length !== 0) {
  //       res.status(200).json(result);
  //       return;
  //     }
  //     res.status(404).send("Not cats present");
  //     con.release();
  //   });
  // });

  // MYSQL WITHOUT POOLING (SIMPLE)
  // db.query("SELECT * FROM Cats ", (err, result, fields) => {
  //   if (err) throw err;
  //   console.log("all", result);
  //   if (result.length !== 0) {
  //     res.status(200).json(result);
  //     return;
  //   }
  //   res.status(404).send("Not cats present");
  // });
};

const createNewCat = async (req, res) => {
  // MONGODB
  try {
    const result = await Cats.create(req.body);
    if (result) {
      res.status(201).json({
        status: "success",
        newCat: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // MYSQL WITH POOLING

  // db.getConnection((err, con) => {
  //   if (err) {
  //     con.release();
  //     throw err;
  //   }
  //   const { name, age, breed, image } = req.body;
  //   let sql = "INSERT INTO Cats (Name,Breed,Age,Image) VALUES ?";
  //   const values = [[name, breed, age, image]];
  //   con.query(sql, [values], (err, result) => {
  //     if (err) throw err;
  //     console.log("table updated");
  //   });
  //   getAllCats(req, res);
  // });

  // MYSQL WITHOUT POOLING (SIMPLE)

  // const { name, age, breed, image } = req.body;
  // let sql = "INSERT INTO Cats (Name,Breed,Age,Image) VALUES ?";
  // const values = [[name, breed, age, image]];
  // db.query(sql, [values], (err, result) => {
  //   if (err) throw err;
  //   console.log("table updated");
  // });
  // getAllCats(req, res);
};

const deleteCatById = async (req, res) => {
  console.log(req.params);
  // MONGODB
  try {
    const result = await Cats.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // MYSQL WITH POOLING

  // db.getConnection((err, con) => {
  //   if (err) {
  //     con.release();
  //     throw err;
  //   }
  //   con.query(`DELETE FROM Cats where id=${req.params.id}`, (err, result) => {
  //     if (err) throw err;
  //     console.log("deleted");
  //     res.status(204).json(null);
  //     con.release();
  //   });
  // });

  // MYSQL WITHOUT POOLING

  // db.query(`DELETE FROM Cats where id=${req.params.id}`, (err, result) => {
  //   if (err) throw err;
  //   console.log("deleted");
  //   res.status(204).json(null);
  // });
};

const findByName = async (req, res) => {
  try {
    const result = await Cats.find(req.params);
    // console.log(result);
    if (result.length !== 0) {
      res.status(200).json(result[0]);
      return;
    } else {
      throw new Error("no cat with given name");
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // MYSQL WITH POOLING
  // db.getConnection((err, con) => {
  //   if (err) {
  //     con.release();
  //     throw err;
  //   }
  //   const name = req.params.name;
  //   con.query(`SELECT * FROM Cats WHERE Name='${name}'`, (err, result) => {
  //     if (err) throw err;
  //     if (result.length !== 0) {
  //       res.status(200).json(result[0]);
  //       return;
  //     }
  //     res.status(404).send("Not found 💩💩");
  //     con.release();
  //   });
  // });
  // MYSQL WITHOUT POOLING
  // const name = req.params.name;
  // db.query(`SELECT * FROM Cats WHERE Name='${name}'`, (err, result) => {
  //   if (err) throw err;
  //   if (result.length !== 0) {
  //     res.status(200).json(result[0]);
  //     return;
  //   }
  //   res.status(404).send("Not found 💩💩");
  // });
};

const updateCatById = async (req, res) => {
  // console.log("put reques", +req.params.id);
  // MONGODB
  try {
    const result = await Cats.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      cats: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // MYSQL WITH POOLING
  // db.getConnection((err, con) => {
  //   if (err) {
  //     con.release();
  //     throw err;
  //   }
  //   const name = req.params.name;
  //   con.query(
  //     `UPDATE Cats SET Name='${req.body.name}',Age=${req.body.age},Breed='${
  //       req.body.breed
  //     }',Image='${req.body.image}' WHERE id=${+req.params.id}`,
  //     (err, result) => {
  //       if (err) throw err;
  //       res.status(200).json({
  //         status: "updated",
  //       });
  //       con.release();
  //     }
  //   );
  // });
  // MYSQL WITHOUT POOLING
  // console.log("put reques", +req.params.id);
  // db.query(
  //   `UPDATE Cats SET Name='${req.body.name}',Age=${req.body.age},Breed='${
  //     req.body.breed
  //   }',Image='${req.body.image}' WHERE id=${+req.params.id}`,
  //   (err, result) => {
  //     if (err) throw err;
  //     res.status(200).json({
  //       status: "updated",
  //     });
  //   }
  // );
};

const findByAge = async (req, res) => {
  // console.log(+req.query.age_lte, +req.query.age_gte, req.url);

  // MONGODB
  try {
    const result = await Cats.find({
      $and: [
        { age: { $gt: +req.query.age_lte } },
        { age: { $lt: req.query.age_gte } },
      ],
    });

    if (result.length !== 0) {
      console.log(result);
      res.status(200).json(result);
      return;
    } else {
      throw new Error("no cat between the age");
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // MYSQL WITH POOLING
  // db.getConnection((err, con) => {
  //   if (err) {
  //     con.release();
  //     throw err;
  //   }
  //   con.query(
  //     `SELECT * FROM Cats WHERE Age BETWEEN ${+req.query.age_lte} AND ${+req
  //       .query.age_gte}`,
  //     (err, result) => {
  //       if (err) throw err;
  //       if (result.length !== 0) {
  //         console.log(result);
  //         res.status(200).json(result);
  //         return;
  //       }
  //       res.status(404).send("Not cat between the age");
  //       con.release();
  //     }
  //   );
  // });
  // MYSQL WITHOUT POOLING
  // db.query(
  //   `SELECT * FROM Cats WHERE Age BETWEEN ${+req.query.age_lte} AND ${+req.query
  //     .age_gte}`,
  //   (err, result) => {
  //     if (err) throw err;
  //     if (result.length !== 0) {
  //       console.log(result);
  //       res.status(200).json(result);
  //       return;
  //     }
  //     res.status(404).send("Not cat between the age");
  //   }
  // );
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
