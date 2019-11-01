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

let searchName = async (
  db: Database,
  searchterm: string
): Promise<ServerResp> => {
  let ads = await new Promise((resolve, reject) => {
    db.all(
      'select * from ads where UPPER(name) like "%" || ? || "%"',
      [searchterm.toUpperCase()],
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

export { homepageAds, searchName };
