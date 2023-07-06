"use strict";
//const Movie = require('../models/product.model');
const Movie = require("../models/movie.model");
exports.findAll = function (req, res) {
  Movie.findAll(function (err, product) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", product);
    res.send(product);
  });
};

exports.findAllFavoritos = function (req, res) {
  Movie.findAllFavoritos(req.params.id,function(err,product) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", product);
    res.send(product);
  });
};

exports.create = function (req, res) {
  const new_product = new Movie(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Movie.create(new_product, function (err, product) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          error: false,
          message: "Moive added successfully!",
          data: product,
        });
      }
    });
  }
};
exports.findById = function (req, res) {
  Movie.findById(req.params.id,function(err,product) {
    if (err) res.send(err);
    res.json(product);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.update(req.params.id, new Movie(req.body), function (err, product) {
      if (err) res.send(err);
      res.json({ error: false, message: "Movie successfully updated" });
    });
  }
};
exports.delete = function (req, res) {
  Movie.delete(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.json({ error: false, message: "Moive successfully deleted" });
  });
};


