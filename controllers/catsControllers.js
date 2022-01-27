const db = require("../db");

const getAllCats = (req, res) => {
  db.getConnection((err, con) => {
    if (err) {
      con.release();
      throw err;
    }
    con.query("SELECT * FROM Cats ", (err, result, fields) => {
      if (err) throw err;
      console.log("all", result);
      if (result.length !== 0) {
        res.status(200).json(result);
        return;
      }
      res.status(404).send("Not cats present");
      con.release();
    });
  });
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

const createNewCat = (req, res) => {
  db.getConnection((err, con) => {
    if (err) {
      con.release();
      throw err;
    }
    const { name, age, breed, image } = req.body;
    let sql = "INSERT INTO Cats (Name,Breed,Age,Image) VALUES ?";
    const values = [[name, breed, age, image]];
    con.query(sql, [values], (err, result) => {
      if (err) throw err;
      console.log("table updated");
    });
    getAllCats(req, res);
  });

  // const { name, age, breed, image } = req.body;
  // let sql = "INSERT INTO Cats (Name,Breed,Age,Image) VALUES ?";
  // const values = [[name, breed, age, image]];
  // db.query(sql, [values], (err, result) => {
  //   if (err) throw err;
  //   console.log("table updated");
  // });
  // getAllCats(req, res);
};

const deleteCatById = (req, res) => {
  db.getConnection((err, con) => {
    if (err) {
      con.release();
      throw err;
    }
    con.query(`DELETE FROM Cats where id=${req.params.id}`, (err, result) => {
      if (err) throw err;
      console.log("deleted");
      res.status(204).json(null);
      con.release();
    });
  });

  // db.query(`DELETE FROM Cats where id=${req.params.id}`, (err, result) => {
  //   if (err) throw err;
  //   console.log("deleted");
  //   res.status(204).json(null);
  // });
};

const findByName = (req, res) => {
  db.getConnection((err, con) => {
    if (err) {
      con.release();
      throw err;
    }
    const name = req.params.name;
    con.query(`SELECT * FROM Cats WHERE Name='${name}'`, (err, result) => {
      if (err) throw err;
      if (result.length !== 0) {
        res.status(200).json(result[0]);
        return;
      }
      res.status(404).send("Not found 💩💩");
      con.release();
    });
  });

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

const updateCatById = (req, res) => {
  // console.log("put reques", +req.params.id);
  db.getConnection((err, con) => {
    if (err) {
      con.release();
      throw err;
    }
    const name = req.params.name;
    con.query(
      `UPDATE Cats SET Name='${req.body.name}',Age=${req.body.age},Breed='${
        req.body.breed
      }',Image='${req.body.image}' WHERE id=${+req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.status(200).json({
          status: "updated",
        });
        con.release();
      }
    );
  });

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

const findByAge = (req, res) => {
  // console.log(+req.query.age_lte, +req.query.age_gte, req.url);
  db.getConnection((err, con) => {
    if (err) {
      con.release();
      throw err;
    }
    con.query(
      `SELECT * FROM Cats WHERE Age BETWEEN ${+req.query.age_lte} AND ${+req
        .query.age_gte}`,
      (err, result) => {
        if (err) throw err;
        if (result.length !== 0) {
          console.log(result);
          res.status(200).json(result);
          return;
        }
        res.status(404).send("Not cat between the age");
        con.release();
      }
    );
  });

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
