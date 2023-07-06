"use strict";
const path = require("path");
const fs = require("fs");
var dbConn = require("../../config/db.config");

//Employee object create
var Product = function (product) {
  this.title = product.title;
  this.price = product.price;
  this.image = product.image;
  this.category = product.category;
  this.created_at = new Date();
  this.updated_at = new Date();
};
Product.create = function (newEmp, result) {
  dbConn.query("INSERT INTO products set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Product.findById = function (id, result) {
  dbConn.query("Select * from products where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Product.findAll = function (result) {
  const arrayProducts = [];
 /* dbConn.query("Select * from products", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("products : ", res);
      result(null, res);
    }
  });*/

  dbConn.query("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).send("server error");
    rows.map((img) => {
      fs.writeFileSync(
        path.join(__dirname, "../dbimages/" + img.id + "-monkeywit.jpg"),
        img.image
      );
      const par = {
        id: img.id,
        title: img.title,
        price: img.price,
        category:img.category,
        image: img.id + "-monkeywit.jpg",
      };
      arrayProducts.push(par)
      
    });

    result(null, arrayProducts);
    //console.log("rows ", rows);

    //const imagedir = fs.readdirSync(path.join(__dirname, "../dbimages/"));
   // res.json(imagedir);
  });
};
Product.update = function (id, product, result) {
  dbConn.query(
    "UPDATE products SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [product.title, product.price, product.image, product.category, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Product.delete = function (id, result) {
  dbConn.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Product;
