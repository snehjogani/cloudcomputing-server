module.exports = (app, con) => {
  // POST api to save ticket details
  app.post("/ticket", (req, res) => {
    const {
      body: {
        email,
        origin,
        destination,
        travelDate,
        bookingDate,
        fromTime,
        toTime,
        fare,
        noOfSeats,
        busNo,
        busStop
      } = {}
    } = req;

    if (
      email &&
      origin &&
      destination &&
      travelDate &&
      bookingDate &&
      fromTime &&
      toTime &&
      fare &&
      noOfSeats &&
      busNo &&
      busStop
    ) {
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
    const { params: { email } = {} } = req;
    console.log("Ticket history request received");
    con.connect(err => {
      con.query(
        `SELECT * FROM ccgroup7.tickets WHERE email= '${email}';`,
        (err, result, fields) => {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  });
};
