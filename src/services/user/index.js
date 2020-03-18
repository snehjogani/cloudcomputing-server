module.exports = (app, con) => {
    app.post("/users", (req, res) => {

        const {
            body: { firstName, lastName, email, password, age, gender } = {}
        } = req;

        if (firstName && lastName && email && gender) {
            console.log("Register Request received");
            con.connect(err => {
                con.query(
                    `INSERT INTO ccgroup7.users (firstname, lastname, email, password, age, gender)
            VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${age}', '${gender}')`,
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
};