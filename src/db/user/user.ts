import { getDatabase } from "../databaseinit";

let createUser = async (username: string, password: string) => {
  console.log("database?: ", getDatabase());
};

export { createUser };
