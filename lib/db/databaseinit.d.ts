import { Database } from "sqlite3";
declare let getDatabase: () => Promise<Database>;
declare let initTables: (db: Database) => Promise<void>;
export { initTables, getDatabase };
