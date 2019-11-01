import { Database } from "sqlite3";

let database: Database;

let getDatabase = async (): Promise<Database> => {
  return database;
};

let initTables = async (db: Database): Promise<void> => {
  database = db;
  console.log("creating user table...");
  await db.run(
    "CREATE TABLE users(uid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username TEXT NOT NULL, password TEXT NOT NULL, token TEXT UNIQUE)",
    err => {
      if (err != null) {
        //console.log(err);
      }
    }
  );

  await db.run(
    "CREATE TABLE ads (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, poster	TEXT NOT NULL, category	TEXT NOT NULL, name	TEXT NOT NULL, description	TEXT NOT NULL, price	INTEGER NOT NULL, email	TEXT NOT NULL, datePosted	NUMERIC)",
    err => {
      if (err != null) {
        //console.log(err);
      }
    }
  );

  await db.run(
    "CREATE TABLE profile (uid	INTEGER NOT NULL UNIQUE, email	TEXT, city	TEXT, postalcode	TEXT, phone	TEXT, address	TEXT, PRIMARY KEY(uid))",
    err => {
      if (err != null) {
        //console.log(err);
      }
    }
  );
};

export { initTables, getDatabase };
