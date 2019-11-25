/** User.ts (Route)
 *  This will just contain the endpoints for user-related stuff ie: signing up, logging in, changing password, etc
 */

import express, { Request, Response, NextFunction } from "express";
import {
  createUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
  createAd,
  myAds,
  getAd
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

/** login route
 *
 */
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

/**
 *  get my profile route
 */
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

/**
 *  the create ad route. this is what will be called when we want to create a route
 */
route.post(
  "/createad",
  authorized(true), //this bit will make this so only authorized people can access this
  async (req: Request, res: Response) => {
    let ad: any = {};
    ad["category"] = req.body.category;
    ad["name"] = req.body.name;
    ad["description"] = req.body.description;
    ad["price"] = req.body.price;
    let result = await createAd(req.body.auth, ad, await getDatabase());
    res.status(result.status).send(result);
  }
);

/**
 *  the myads route. this will return our ads
 */
route.get(
  "/myads",
  authorized(true), //this bit will make this so only authorized people can access this
  async (req: Request, res: Response) => {
    let ad: any = {};
    let result = await myAds(req.body.auth, await getDatabase());
    res.status(result.status).send(result);
  }
);
/**
 *  the getad route. this will return the requested ad
 */
route.get(
  "/adview/:adId",
  authorized(false),
  async (req: Request, res: Response, next: NextFunction) => {
    let result = await getAd(
      req.body.auth,
      req.params.adId,
      await getDatabase()
    );
    res.status(result.status).send(result);
  }
);

export default route;
