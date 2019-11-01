import express, { Request, Response, NextFunction } from "express";
import { homepageAds, searchName } from "../db/search/search";
import { getDatabase } from "../db/databaseinit";
import authorized from "../middleware/authorized";
let route = express.Router();

route.get("/homepageads", async (req: Request, res: Response) => {
  let ads = await homepageAds(await getDatabase());
  res.status(ads.status).send(ads);
});

route.post("/searchterm", async (req: Request, res: Response) => {
  let ads = await searchName(await getDatabase(), req.body.term);
  res.status(ads.status).send(ads);
});

export default route;
