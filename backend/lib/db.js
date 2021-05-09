// lib/db.js

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "ris",
  password: "welcome@123",
  database: "cms_db",
});

connection.connect();
module.exports = connection;
