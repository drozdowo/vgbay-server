import { Database } from "sqlite3";

let initTables = async (db: Database): Promise<void> => {
  console.log("creating user table...");
  await db.run(
    "CREATE TABLE users(uid integer increment, username text, password text)"
  );
};

export default initTables;
