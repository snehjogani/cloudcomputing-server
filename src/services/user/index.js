module.exports = (app, con) => {

  // POST api to save users
  app.post("/users", (req, res) => {
    const firstname = req.body["firstName"];
    const lastname = req.body["lastName"];
    const email = req.body["email"];
    const password = req.body["password"];
    const age = req.body["age"];
    const gender = req.body["gender"];

    if (firstname && lastname && email && gender) {
      console.log("Register Request received");
      con.connect(err => {
        con.query(
          `INSERT INTO ccgroup7.users (firstname, lastname, email, password, age, gender)
            VALUES ('${firstname}', '${lastname}', '${email}', '${password}', '${age}', '${gender}')`,
          (err, result, fields) => {
            if (err) res.send(err);
            if (result) res.send(result);            
          }
        );
      });
    } else {
      console.log("Missing a parameter");
    }
  });

  // GET api to get users
  app.get("/users", (req, res) => {
    con.connect(err => {
      con.query(
        `select firstname, lastname, email, age from ccgroup7.users;`,
        (err, result, fields) => {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  });

  // POST api to save ticket details
  app.post("/ticket", (req, res) => {
    const email = req.body["email"];
    const origin = req.body["origin"];
    const destination = req.body["destination"];
    const travelDate = req.body["travelDate"];
    const bookingDate = req.body["bookingDate"];
    const fromTime = req.body["fromTime"];
    const toTime = req.body["toTime"];
    const fare = req.body["fare"];
    const noOfSeats = req.body["noOfSeats"];
    const busNo = req.body["busNo"];
    const busStop = req.body["busStop"];

    if (email && origin && destination && travelDate && bookingDate
      && fromTime && toTime && fare && noOfSeats && busNo && busStop) {
      console.log("Ticket Generation Request received");
      con.connect(err => {
        con.query(
          `INSERT INTO ccgroup7.tickets (email, origin, destination, travelDate, bookingDate, fromTime,
            toTime, fare, noOfSeats, busNo, busStop) 
            VALUES ('${email}', '${origin}', '${destination}', '${travelDate}',
            current_timestamp(), '${fromTime}',  '${toTime}',  '${fare}', 
              '${noOfSeats}',  '${busNo}',  '${busStop}'  )`,
          (err, result, fields) => {
            if (err) res.send(err);            
            if (result) res.send(result);            
          }
        );
      });
    } else {
      console.log("Missing a parameter");
    }
  });

  // GET api to get ticket details of current logged in user
  app.get("/tickets/user/:email", (req, res) => {  
    const email = req.params.email;      
    console.log("Ticket history request received");
    con.connect(err => {
      con.query(
        `SELECT * FROM ccgroup7.tickets 
        WHERE email= '${email}';`,
        (err, result, fields) => {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  });

};
