import 'dotenv/config';
const mysql = require('mysql');

const CONFIG = {
    host: process.env.MYSQL_ENDPOINT,
    user: process.env.MYSQL_USERNAME, 
    password: process.env.MYSQL_PASSWORD
}

const con = mysql.createConnection(CONFIG);

const callback = (error, result, fields) => {
    console.log(result);
}

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
    // mysql table cration script
    con.query('CREATE DATABASE IF NOT EXISTS ccgroup7;');
    con.query('USE ccgroup7;');
    con.query('create table if not exists users(id int NOT NULL AUTO_INCREMENT, firstname varchar(30), lastname varchar(30), email varchar(255), password varchar(30), age int, PRIMARY KEY(id))', callback);
    con.query('create table if not exists tickets(id int NOT NULL AUTO_INCREMENT, userId int, origin varchar(255), destination varchar(255), startDate datetime, endDate datetime, fare int, noOfSeats int, class varchar(30), primary key(id), constraint fk_users foreign key(userId) references users(id) on delete cascade);', callback);
    con.end();
});

export default con