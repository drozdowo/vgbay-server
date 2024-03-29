import express from "express";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Database } from "sqlite3";
import { initTables } from "./db/databaseinit";
import { User, Search } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

let app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.options("*", cors(corsOptions));
app.use(cors());
app.use(bodyParser.json()); //use body-parser module. It formats the post data into the body of the request.
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

let sqlite3 = require("sqlite3").verbose();
let db: Database;

app.use("/user", User); //Forward all things that access /user/<anything> to our User route
app.use("/search", Search); //Forward all things that access /user/<anything> to our User route

app.listen(3000, async () => {
  db = new sqlite3.Database("vgbayserver.db", (err: Error | null) => {
    if (err) {
      console.log("err");
      process.exit(1);
    }
  });
  await initTables(db);
  console.log("vgBay Server Started...");
});
