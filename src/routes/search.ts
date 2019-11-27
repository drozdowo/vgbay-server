import express, { Request, Response, NextFunction } from "express";
import {
  homepageAds,
  searchAds,
  getCategories,
  getCities
} from "../db/search/search";
import { getDatabase } from "../db/databaseinit";
import authorized from "../middleware/authorized";
let route = express.Router();

route.get("/homepageads", async (req: Request, res: Response) => {
  let ads = await homepageAds(await getDatabase());
  res.status(ads.status).send(ads);
});

route.post("/searchterm", async (req: Request, res: Response) => {
  let ads = await searchAds(await getDatabase(), req.body);
  res.status(ads.status).send(ads);
});

route.get("/categories", async (req: Request, res: Response) => {
  let categories = await getCategories(await getDatabase());
  res.status(categories.status).send(categories);
});

/**
 *  gets cities
 */
route.get(
  "/getcities",
  async (req: Request, res: Response, next: NextFunction) => {
    let cities = await getCities(await getDatabase());
    res.status(cities.status).send(cities);
  }
);

export default route;
