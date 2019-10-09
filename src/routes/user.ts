/** User.ts (Route)
 *  This will just contain the endpoints for user-related stuff ie: signing up, logging in, changing password, etc
 */

import express, { Request, Response, NextFunction } from "express";
let route = express.Router();

route.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.send("done");
});

export default route;
