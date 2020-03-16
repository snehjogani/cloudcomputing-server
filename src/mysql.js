import "dotenv/config";
const mysql = require("mysql");

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
        ticketId int NOT NULL AUTO_INCREMENT,         
        email varchar(255), 
        origin varchar(255), 
        destination varchar(255), 
        travelDate datetime, 
        bookingDate datetime, 
        fromTime varchar(10),
        toTime varchar(10),
        fare int, 
        noOfSeats int, 
        busNo varchar(10),
        busStop varchar(255),        
        primary key(ticketId)        
    );
`;

const con = mysql.createConnection(CONNECTION_CONFIG);

const callback = (error, result, fields) => {
    // console.log(result);
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
