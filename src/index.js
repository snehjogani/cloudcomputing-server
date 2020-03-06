import express from "express";
import cors from "cors";

import "dotenv/config";
import mysqlCon from "./mysql";
import services from "./services";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

services(app, mysqlCon);
