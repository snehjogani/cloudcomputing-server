module.exports = (app, con) => {
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
            if (result) res.send({ firstname, lastname, email, age, gender });
            if (fields) console.log(fields);
          }
        );
      });
    } else {
      console.log("Missing a parameter");
    }
  });

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
};
