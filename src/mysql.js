import "dotenv/config";
import mysql from "mysql";

const CONNECTION_CONFIG = {
  host: process.env.MYSQL_ENDPOINT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
};

const CREATE_USER_TABLE_QUERY = `
    create table if not exists users(
        id int NOT NULL AUTO_INCREMENT, 
        firstname varchar(30),
        lastname varchar(30), 
        email varchar(255), 
        password varchar(30), 
        gender varchar(30),
        age int, 
        PRIMARY KEY(id)
    );
`;
const CREATE_TICKETS_TABLE_QUERY = `
    create table if not exists tickets(
        id int NOT NULL AUTO_INCREMENT, 
        userId int, 
        origin varchar(255), 
        destination varchar(255), 
        startDate datetime, 
        endDate datetime, 
        fare int, 
        noOfSeats int, 
        class varchar(30), 
        primary key(id), 
        constraint fk_users 
            foreign key(userId) 
            references users(id) 
            on delete set null
    );
`;

const con = mysql.createConnection(CONNECTION_CONFIG);

const callback = (error, result, fields) => {
  //   console.log(result);
};

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS ccgroup7;");
  con.query("USE ccgroup7;");
  // mysql table cration script
  con.query(CREATE_USER_TABLE_QUERY, callback);
  con.query(CREATE_TICKETS_TABLE_QUERY, callback);
  //   con.end();
});

export default con;
