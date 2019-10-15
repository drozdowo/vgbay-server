/** User.ts (Route)
 *  This will just contain the endpoints for user-related stuff ie: signing up, logging in, changing password, etc
 */

import express, { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../db/user/user";
import { getDatabase } from "../db/databaseinit";
let route = express.Router();

route.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: "Invalid body" });
    }
    let query = await createUser(
      req.body.username,
      req.body.password,
      await getDatabase()
    );
    res.status(query.status).send(query.message);
  }
);

route.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: "Invalid body" });
    }
    let query = await loginUser(
      req.body.username,
      req.body.password,
      await getDatabase()
    );
    res.status(query.status).send(query);
  }
);

export default route;
