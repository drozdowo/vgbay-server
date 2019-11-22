import { Database } from "sqlite3";
declare let createUser: (username: string, password: string, db: Database) => Promise<ServerResp>;
/** loginUser
 *  Called when a user is logging into the
 *
 * @param username string
 * @param password  string
 * @param db database
 */
declare let loginUser: (username: string, password: string, db: Database) => Promise<ServerResp>;
/**
 * getMyProfile
 * Gets the users profile information for display. No editing here.
 * @param token string - the users token
 * @param db database - the database object
 */
declare let getMyProfile: (token: string, db: Database) => Promise<ServerResp>;
/**
 * updateMyProfile
 * Updates the users profile based on the authorization value
 * @param info json - the json of the user
 * @param db database - the database object
 */
declare let updateMyProfile: (info: any, db: Database) => Promise<ServerResp>;
/**
 *  createAd
 * @param auth  - the auth object containing their token, uid and so on
 * @param ad  - the ad object. contains the title, description, etc
 * @param db  - database object
 */
declare let createAd: (auth: any, ad: any, db: Database) => Promise<ServerResp>;
/**
 *  createAd
 * @param auth  - the auth object containing their token, uid and so on
 * @param ad  - the ad object. contains the title, description, etc
 * @param db  - database object
 */
declare let myAds: (auth: any, db: Database) => Promise<ServerResp>;
/**
 *  getAd
 * @param auth  - the auth object containing their token, uid and so on
 * @param adId - the ad id number
 * @param db  - database object
 */
declare let getAd: (adId: string, db: Database) => Promise<ServerResp>;
export { createUser, loginUser, getMyProfile, updateMyProfile, createAd, myAds, getAd };
