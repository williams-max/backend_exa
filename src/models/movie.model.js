"use strict";
const path = require("path");
const fs = require("fs");
var dbConn = require("../../config/db.config");

//Employee object create
var Movie = function (Movie) {
  this.title = Movie.title;
  this.idmovie = Movie.idmovie;
  this.idusuario = Movie.idusuario;
  this.type = Movie.type;
  this.poster = Movie.poster;
  this.created_at = new Date();
  this.updated_at = new Date();
};
Movie.create = function (newEmp, result) {
  dbConn.query("INSERT INTO movies set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Movie.findById = function (id, result) {
  dbConn.query("Select * from movies where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Movie.findAll = function (result) {
  const arrayProducts = [];
  dbConn.query("Select * from movies", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("movies : ", res);
      result(null, res);
    }
  });

  
};

Movie.findAllFavoritos = function (id,result) {
  
  dbConn.query(`SELECT * FROM movies WHERE idusuario=${id};`, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("movies : ", res);
      result(null, res);
    }
  });

  
};

Movie.update = function (id, product, result) {
  dbConn.query(
    "UPDATE movies SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
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
Movie.delete = function (id, result) {
  dbConn.query("DELETE FROM movies WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Movie;
