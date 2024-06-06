const mysql = require("mysql");
const db = require("../configs/db.js");

const connection = mysql.createPool({
    host: db.HOST,
    user: db.USERNAME,
    password: db.PASSWORD,
    database: db.DATABASE
});

module.exports = connection;