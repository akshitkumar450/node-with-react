const express = require("express");
const router = express.Router();
const {
  getAllCats,
  createNewCat,
  updateCatById,
  deleteCatById,
  findByName,
  findByAge,
  checkBody,
} = require("../controllers/catsControllers");

// param middleware
// will only run (before) when we have name as a params only for (/:name)
router.param("name", (req, res, next, val) => {
  console.log("param middle", val);
  next();
});

// the checkbody fn will run before createNewCat fn
router.route("/").get(getAllCats).post(checkBody, createNewCat);
router.route("/:id").delete(deleteCatById).put(updateCatById);
router.route("/search").get(findByAge);
router.route("/:name").get(findByName);

// OR
// router.get("/", getAllCats);
// router.post("/", createNewCat);
// router.delete("/:id", deleteCatById);
// router.put("/:id", updateCatById);
// router.get("/:name", findByName);
// router.get("/search", findByAge);

module.exports = router;
