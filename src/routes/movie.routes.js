const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Retrieve all products
router.get("/", movieController.findAll);
// Create a new product
router.post("/", movieController.create);
// Retrieve a single product with id
router.get("/:id", movieController.findById);
// Update a product with id
router.put("/:id", movieController.update);
// Delete a product with id
router.delete("/:id", movieController.delete);

router.get("/favoritos/:id", movieController.findAllFavoritos);




var dbConn = require("../../config/db.config");



router.get("/v2/ok", (req, res) => {
res.send('ok')
})
module.exports = router;
