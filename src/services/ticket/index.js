module.exports = (app, con) => {
  // POST api to save ticket details
  app.post("/ticket", (req, res) => {
    const {
      body: {
        userId,
        origin,
        destination,
        travelDate,
        bookingDate,
        noOfSeats,
        busId
      } = {}
    } = req;    
    if (
      userId &&
      origin &&
      destination &&
      travelDate &&
      bookingDate &&
      noOfSeats &&
      busId
    ) {
      console.log("Ticket Generation Request received");
      con.connect(err => {
        con.query(
          `INSERT INTO ccgroup7.tickets (userId, origin, destination, travelDate, bookingDate, noOfSeats, busId) 
            VALUES ('${userId}', '${origin}', '${destination}', '${travelDate}',
            current_timestamp(), '${noOfSeats}',  '${busId}')`,
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
  app.get("/tickets/user/:userId", (req, res) => {
    const { params: { userId } = {} } = req;
    console.log("Ticket history request received");
    con.connect(err => {
      con.query(
        `select t.id as ticketId, t.userId,t.origin,t.destination, t.travelDate, t.bookingDate, t.noOfSeats, b.Id as busId, b.busNo, b.startTime, b.endTime, b.fare
        from tickets as t join buses as b on t.busId = b.id where t.userId = '${userId}';`,
        (err, result, fields) => {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  });

  // GET api to get list of locations
  app.get("/locations", (req, res) => {
    const { params: { email } = {} } = req;
    console.log("Locations list request received");
    con.connect(err => {
      con.query(
        `SELECT * FROM ccgroup7.locations;`,
        (err, result, fields) => {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  });

  // GET api to get list of buses for selected destination
  app.get("/locations/:locationId", (req, res) => {
    const { params: { locationId } = {} } = req;
    console.log("Buses list request received");
    con.connect(err => {
      con.query(
        `SELECT * FROM ccgroup7.buses WHERE locationId = ${locationId};`,
        (err, result, fields) => {
          if (err) res.send(err);
          if (result) res.send(result);
        }
      );
    });
  });
};
