import { Database } from "sqlite3";
declare let createUser: (username: string, password: string, db: Database) => Promise<ServerResp>;
declare let loginUser: (username: string, password: string, db: Database) => Promise<ServerResp>;
export { createUser, loginUser };
