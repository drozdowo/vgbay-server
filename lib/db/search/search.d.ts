import { Database } from "sqlite3";
declare let homepageAds: (db: Database) => Promise<ServerResp>;
declare let searchName: (db: Database, searchterm: string) => Promise<ServerResp>;
declare let getCategories: (db: Database) => Promise<ServerResp>;
export { homepageAds, searchName, getCategories };
