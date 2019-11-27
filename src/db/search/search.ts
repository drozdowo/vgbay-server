import { Database } from "sqlite3";

let homepageAds = async (db: Database): Promise<ServerResp> => {
  let ads = await new Promise((resolve, reject) => {
    db.all("select * from ads order by datePosted limit 10", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  }).catch(err => {
    console.log(err);
  });
  return {
    status: 200,
    message: "success",
    success: true,
    data: ads,
    dataType: "homepageads"
  };
};

let searchAds = async (db: Database, searchterm: any): Promise<ServerResp> => {
  console.log(searchterm);
  let ads = await new Promise((resolve, reject) => {
    db.all(
      'select a.uid, a.id, b.category, a.name, a.description, a.price, a.datePosted from ads a, categories b where b.id = a.category and UPPER(name) like "%" || ? || "%" and a.category like "%"|| ? ||"%" and (SELECT  c.city from profile c where c.uid = a.uid) LIKE "%"||?||"%"',
      [
        searchterm.term.toUpperCase(),
        searchterm.category == null ? "" : searchterm.category,
        searchterm.city == null ? "" : searchterm.city
      ],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch(err => {
    console.log(err);
  });
  return {
    status: 200,
    message: "success",
    success: true,
    data: ads,
    dataType: "search"
  };
};

let getCategories = async (db: Database): Promise<ServerResp> => {
  let categories = await new Promise((resolve, reject) => {
    db.all("select * from categories", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  }).catch(err => {
    console.log(err);
  });
  return {
    status: 200,
    message: "success",
    success: true,
    data: categories,
    dataType: "categories"
  };
};

let getCities = async (db: Database): Promise<ServerResp> => {
  let cities = await new Promise((resolve, reject) => {
    db.all("select * from city", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  }).catch(err => {
    console.log(err);
  });
  return {
    status: 200,
    message: "success",
    success: true,
    data: cities,
    dataType: "cities"
  };
};

export { homepageAds, searchAds, getCategories, getCities };
