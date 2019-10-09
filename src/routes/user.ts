/** User.ts (Route)
 *  This will just contain the endpoints for user-related stuff ie: signing up, logging in, changing password, etc
 */

import express, { Request, Response, NextFunction } from "express";
import { createUser } from "../db/user/user";
let route = express.Router();

route.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "Invalid body" });
  }
  createUser(req.body.username, req.body.password);
});

export default route;
