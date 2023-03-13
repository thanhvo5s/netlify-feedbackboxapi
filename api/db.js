'use strict';
const mysql = require('mysql2');

/* const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "MySQLR00t",
  database: process.env.DB_NAME || "nodejs_api"
}); */

const db = mysql.createConnection({
  host: process.env.DB_HOST || "sql12.freemysqlhosting.net",
  user: process.env.DB_USER || "sql12605169",
  password: process.env.DB_PASS || "8c1uIbKmQj",
  database: process.env.DB_NAME || "sql12605169"
});

module.exports = db