import express from "express";
import { Database } from "sqlite3";
import { resolve } from "dns";

let sqlite3 = require("sqlite3").verbose();

let app = express();
let db: Database;

app.listen(3000, async () => {
  console.log("vgBay Server Started...");
  console.log("Attempting to connect to database...");
  db = new sqlite3.Database("../vgbayserver.db", (err: Error | null) => {
    if (err) {
      console.log("err");
      process.exit(1);
    }
  });
  console.log("Connected to database successfully!");
});

app.get("/test", (req, res) => {
  console.log(db);
  res.send(db);
});
