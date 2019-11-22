import { Database } from "sqlite3";
import { myAds } from "./user/user";

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
    "CREATE TABLE ads (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, uid	number NOT NULL, category	TEXT NOT NULL, name	TEXT NOT NULL, description	TEXT NOT NULL, price	INTEGER NOT NULL, datePosted	NUMERIC)",
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

  //Create Categories Table
  await db.run(
    `CREATE TABLE categories (
      id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      category	TEXT NOT NULL
    )`,
    err => {
      if (err != null) {
        //console.log(err);
      }
    }
  );

  //Populate Categories Data
  let categories: Array<string> = [
    "Games (Boxed)",
    "Accounts",
    "Consoles (Modern)",
    "Consoles (Retro)",
    "Games (Retro)",
    "Games (Bulk)",
    "Memorabilia",
    "Accessories",
    "Cables",
    "Test"
  ];
  categories.map(async (category: string) => {
    await db.run(
      `
        INSERT INTO CATEGORIES VALUES ('${categories
          .indexOf(category)
          .valueOf() + 1}', '${category}')
      `,
      err => {
        if (err != null) {
          //console.log("category err" + err);
        }
      }
    );
  });

  //Create Admin Table
  await db.run(
    `CREATE TABLE "admin" (
	"uid"	INTEGER NOT NULL UNIQUE,
	"isadmin"	INTEGER NOT NULL,
	PRIMARY KEY("uid","isadmin")
  )`,
    err => {
      if (err != null) {
        //console.log(err);
      }
    }
  );
  //insert admin acc as admin
  await db.run(
    `
        INSERT INTO ADMIN VALUES (1, 'Y')
      `,
    err => {
      if (err != null) {
        // console.log("category err" + err);
      }
    }
  );

  await db.run(
    `  CREATE TABLE "viewlog" (
      "viewId"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "uid"	INTEGER NOT NULL,
      "adId"	INTEGER NOT NULL,
      "date"	TEXT NOT NULL
    )`,
    err => {
      if (err != null) {
        //console.log(err);
      }
    }
  );
};

export { initTables, getDatabase };
