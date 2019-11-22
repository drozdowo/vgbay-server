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

    //here we'll see if they have an authorization header set. If they don't, we'll auto reject them since they're not authorized.
    if (!req.headers.authorization) {
      res.status(200).send({
        status: 200,
        success: false,
        message: "Unauthorized"
      } as ServerResp);
      return;
    }
    let token: string = req.headers.authorization.split("Bearer ")[1]; //split by bearer, grab the actual token as a string
    //This DB call down here accomplishes two things:
    //First, it lets us see if the user is actually authorized, that is if they are logged in.
    //Second, it fetches their user information so we can create a new field in the json body that has
    //all of their information so can use their UID to fetch applicable things from the database
    let check: any = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE TOKEN = ?", [token], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    }).catch(err => {
      next(err);
    });
    if (!check) {
      //if this is undefined or null, then the token they provided is either blank, or doesn't go to a user.
      //in either case, they're unauthorized so we'll reject them.
      res.status(200).send({
        status: 200,
        success: false,
        check,
        message: "Unauthorized"
      } as ServerResp);
      return;
    }
    //if check returned something, then the token they provided corresponds to a logged in user. We'll grab their information
    //from the above database pull, and create a new field in the json body.
    req.body["auth"] = {};
    if (onlyMe) {
      req.body["auth"]["onlyme"] = true; //set the only me flag so I can only edit things that are MINE. prevents hackerman type shit
    }
    req.body["auth"]["token"] = token;
    req.body["auth"]["user"] = check;

    //this next is an express method that basically says "ok i'm done, pass the req, res and next options to the next route". In this case
    //it is the actual body of the route that uses this (ie: "/getmyprofile", authorized(true), -- (req, res) => -- ) the -- bit
    next();
  };
};
