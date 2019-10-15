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
};

export { initTables, getDatabase };
