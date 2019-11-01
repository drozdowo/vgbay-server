import { getDatabase } from "../databaseinit";
import { Database } from "sqlite3";

let createUser = async (
  username: string,
  password: string,
  db: Database
): Promise<ServerResp> => {
  if (!username && !password) {
    return {
      status: 200,
      message: "No username or password provided.",
      success: false
    };
  }
  if (!username) {
    return {
      status: 200,
      message: "No username provided",
      success: false
    };
  }
  if (!password) {
    return {
      status: 200,
      message: "No password provided",
      success: false
    };
  }

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
  console.log(check);
  if (check) {
    return {
      status: 200,
      message: "User with this name already exists",
      success: false
    };
  }

  let stmt = await db.prepare("insert into users values (NULL,?,?,NULL)");
  await stmt.run([username, password]);
  await stmt.finalize();
  console.log("created user");
  return {
    status: 200,
    message: "Successfully created user",
    success: true
  };
};

let loginUser = async (
  username: string,
  password: string,
  db: Database
): Promise<ServerResp> => {
  if (!username && !password) {
    return {
      status: 200,
      message: "No username or password provided.",
      success: false
    };
  }
  if (!username) {
    return {
      status: 200,
      message: "No username provided",
      success: false
    };
  }
  if (!password) {
    return {
      status: 200,
      message: "No password provided",
      success: false
    };
  }
  let check: any = await new Promise((resolve, reject): any => {
    db.get("select * from users where username = ?", [username], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  }).catch(err => {
    console.log(err);
  });
  console.log(check);
  if (!check) {
    return {
      status: 200,
      message: "invalid username",
      success: false
    };
  }
  if (password === check["password"]) {
    //create a token and save it for that user
    let token: string =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    let tokenQuery: any = await new Promise((resolve, reject): any => {
      db.get(
        "update users set token = ? where username = ?",
        [token, username],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    }).catch(err => {
      console.log(err);
    });
    return {
      status: 200,
      message: "verified",
      token,
      success: true
    };
  }
  return {
    status: 200,
    message: "invalid password",
    success: false
  };
};

let getMyProfile = async (token: string, db: Database) => {
  if (!token || token === "") {
    return {
      status: 200,
      message: "Unauthorized. No token",
      success: false
    };
  }
  let check: any = await new Promise((resolve, reject): any => {
    db.get("select * from users where token = ?", [token], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  }).catch(err => {
    console.log(err);
  });
};

export { createUser, loginUser };
