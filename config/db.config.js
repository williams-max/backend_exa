'use strict';
const mysql = require('mysql2');
//local mysql db connection
const dbConn = mysql.createConnection({
/* host     : 'localhost',
  user     : 'root',
  password : 'publica',
  database : 'node_mysql_crud_db'
  remoto*/
  host: 'mysql-chevy.alwaysdata.net',
  user: 'chevy_free',
  password: 'adivinala',
  database: 'chevy_dbfazt'
});
dbConn.connect(
    function (error) {
        if (error) {
            throw error;
        } else {
            console.log("successful connection")
        }
    }
);


module.exports = dbConn;