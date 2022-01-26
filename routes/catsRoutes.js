const express = require("express");
const router = express.Router();
const {
  getAllCats,
  createNewCat,
  updateCatById,
  deleteCatById,
  findByName,
  findByAge,
} = require("../controllers/catsControllers");

router.route("/").get(getAllCats).post(createNewCat);
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
