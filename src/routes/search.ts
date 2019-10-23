import express, { Request, Response, NextFunction } from "express";
import { homepageAds } from "../db/search/search";
import { getDatabase } from "../db/databaseinit";
let route = express.Router();

route.get("/homepageads", async (req: Request, res: Response) => {
  let ads = await homepageAds(await getDatabase());
  res.status(ads.status).send(ads);
});

export default route;
