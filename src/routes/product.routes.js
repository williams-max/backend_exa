const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Retrieve all products
router.get("/", productController.findAll);
// Create a new product
router.post("/", productController.create);
// Retrieve a single product with id
router.get("/:id", productController.findById);
// Update a product with id
router.put("/:id", productController.update);
// Delete a product with id
router.delete("/:id", productController.delete);

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-monkeywit-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("image");

var dbConn = require("../../config/db.config");

router.post("/v2/addimg", fileUpload, (req, res) => {
  const type = req.file.mimetype;
  const name = req.file.originalname;
  const data = fs.readFileSync(
    path.join(__dirname, "../images/" + req.file.filename)
  );

  
  const newEmp = {
    title: "test title",
    price: "78",
    image: data,
    category: "hogar",
  };

  dbConn.query("INSERT INTO products set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      // console.log(res.insertId);
      // result(null, res.insertId);
      // console.log("res ",res)
    }
  });
  res.send("ok");
});

router.get("/v2/getimg", (req, res) => {
  console.log("qwwqqwwqw");
  dbConn.query("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).send("server error");
    rows.map((img) => {

        
      fs.writeFileSync(
        path.join(__dirname, "../dbimages/" + img.id + "-monkeywit.jpg"),
        img.image
      );
    });

    console.log("rows ", rows);

    const imagedir = fs.readdirSync(path.join(__dirname, "../dbimages/"));
    res.json(imagedir);
  });
  //res.send("ok");
});


router.get("/v2/ok", (req, res) => {
res.send('ok')
})
module.exports = router;
