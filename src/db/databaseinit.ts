import { Database } from "sqlite3";

let database: Database;

let getDatabase = async (): Promise<Database> => {
  return database;
};

let initTables = async (db: Database): Promise<void> => {
  database = db;
  console.log("creating user table...");
  await db.run(
    "CREATE TABLE users(uid integer increment, username text, password text)"
  );
};

export { initTables, getDatabase };
