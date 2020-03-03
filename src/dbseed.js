import 'dotenv/config';
const mysql = require('mysql');

const CONFIG = {
    host: process.env.MYSQL_ENDPOINT,
    user: process.env.MYSQL_USERNAME, 
    password: process.env.MYSQL_PASSWORD
}

const con = mysql.createConnection(CONFIG);

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
    // con.query('CREATE DATABASE IF NOT EXISTS main;');
    // con.query('USE main;');
    // con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
    //     console.log(fields);
    // });
    con.end();
});

export default con