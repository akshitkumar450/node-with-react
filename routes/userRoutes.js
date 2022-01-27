const express = require("express");
const router = express.Router();
const db = require("../db");
const getAllUsers = (req, res) => {
  db.query("select * from Cats", (err, result) => {
    res.send(result);
  });
};

router.route("/").get(getAllUsers);
router.route("/:id").delete(getAllUsers);

module.exports = router;
