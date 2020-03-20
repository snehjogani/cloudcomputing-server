module.exports = (app, con) => {   

    // GET api to get attraction details by keyword
    app.get("/search/:location", (req, res) => {
        const { params: { location } = {} } = req;
        console.log("Search location request received");
        con.connect(err => {
            con.query(
                `SELECT l.id, l.name as city, a.name as attraction, a.description,a.imageURL
                FROM 
                ccgroup7.locations AS l 
                JOIN 
                ccgroup7.attractions AS a
                ON l.id=a.locationId
                WHERE l.id IN (SELECT id FROM locations WHERE name = '${location}') 
                OR
                a.id IN (SELECT id FROM attractions WHERE name LIKE '%${location}%');  
                `,
                (err, result, fields) => {
                    if (err) res.send(err);
                    if (result) res.send(result);
                }
            );
        });
    });

    // GET api to get top searched places
    app.get("/topsearchedplaces",(req,res) =>{
        console.log("Number of top searched places received to create");
        con.connect(err => {
          con.query(
            `select numberOfHits as count, name from locations 
                        order by numberOfHits desc
                        limit 5;`,
            (err, result, fields) => {
              if (err) res.send(err);
              if (result) res.send(result);
            }
          );
        });
      });
    
};