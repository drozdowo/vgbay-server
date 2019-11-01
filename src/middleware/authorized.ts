import { Request, Response, NextFunction } from "express";
import { getDatabase } from "../db/databaseinit";
import { Database } from "sqlite3";

//What this will do is restrict certain routes (get/posts) to people who have a token/logged in and will reject them otherwise
//We'll look at the request's authorization header, grab the token from there and then check it against out table to see if they are
//logged in.
//The onlyMe boolean will be used to restrict certain routes to only be able to adjust their own this, specifically their settings
export default (onlyMe: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let db: Database = await getDatabase();
    if (!req.headers.authorization) {
      res.status(200).send({
        status: 200,
        success: false,
        message: "Unauthorized"
      } as ServerResp);
      return;
    }
    let token: string = req.headers.authorization.split("Bearer ")[1]; //split by bearer, grab the actual token.
    let check = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE TOKEN = ?", [token], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    }).catch(err => {
      next(err);
    });
    if (!check) {
      //unauthorized
      res.status(200).send({
        status: 200,
        success: false,
        message: "Unauthorized"
      } as ServerResp);
      return;
    }
    console.log("authorized");
    next();
  };
};
