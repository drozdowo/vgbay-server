/** User.ts (Route)
 *  This will just contain the endpoints for user-related stuff ie: signing up, logging in, changing password, etc
 */

import express, { Request, Response, NextFunction } from "express";
import {
  createUser,
  loginUser,
  getMyProfile,
  updateMyProfile
} from "../db/user/user";
import { getDatabase } from "../db/databaseinit";
import authorized from "../middleware/authorized";
let route = express.Router();

route.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
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
    let query = await loginUser(
      req.body.username,
      req.body.password,
      await getDatabase()
    );
    res.status(query.status).send(query);
  }
);

route.get(
  "/getmyprofile",
  authorized(true), //this bit will make this so only authorized people can access this
  async (req: Request, res: Response) => {
    let token: string = req.body.auth.token; //should be set after authorization
    let result = await getMyProfile(token, await getDatabase());
    res.status(result.status).send(result);
  }
);

route.post(
  "/updatemyprofile",
  authorized(true), //this bit will make this so only authorized people can access this
  async (req: Request, res: Response) => {
    let info: any = req.body;
    let result = await updateMyProfile(info, await getDatabase());
    res.status(result.status).send(result);
  }
);

export default route;
