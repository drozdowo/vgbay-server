import { getDatabase } from "../databaseinit";

let createUser = async (
  username: string,
  password: string
): Promise<ServerResp> => {
  //Get an instance of the database
  let db = await getDatabase();

  /**
   * These below lines may be a bit confusing to people not familiar with js and its asynchronicity
   * but essentially a promise is what its name suggests. This promises to return data, but not immediately.
   *
   * Furthermore, since we are in an asynchronous function (denoted above in line 3) we can use the 'await' keyword, which
   * will await the return of this promise, halting the execution of the rest of the function. Inside of the promise,
   * we are executing the actual query, and if it comes back with an error, we'll reject it with the error (and catch it)
   * or resolve it with the actual data we want. If we didnt have this, this function would return before the query finishes
   * and we would never get any data unless the database returned data instantly (which it won't)
   */
  let check = await new Promise((resolve, reject) => {
    db.get("select * from users where username = ?", [username], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  }).catch(err => {
    console.log(err);
  });

  //Check the result and see if a user already exists
  if (check) {
    return {
      status: 200,
      message: "User with this name already exists"
    };
  }

  let stmt = await db.prepare("insert into users values (NULL,?,?)");
  await stmt.run([username, password]);
  await stmt.finalize();
  console.log("created user");
  return {
    status: 200,
    message: "Successfully created user"
  };
};

export { createUser };
