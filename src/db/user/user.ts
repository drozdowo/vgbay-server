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

/** loginUser
 *  Called when a user is logging into the
 *
 * @param username string
 * @param password  string
 * @param db database
 */
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

/**
 * getMyProfile
 * Gets the users profile information for display. No editing here.
 * @param token string - the users token
 * @param db database - the database object
 */
let getMyProfile = async (token: string, db: Database): Promise<ServerResp> => {
  let check: any = await new Promise((resolve, reject): any => {
    db.get(
      "select * from profile where uid = (select uid from users where token = ?)",
      [token],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  }).catch(err => {
    console.log(err);
  });
  if (!check) {
    return {
      status: 200,
      success: false,
      message: "invalid user?"
    };
  }
  return {
    status: 200,
    message: "success",
    dataType: "profile",
    data: check,
    success: true
  };
};

/**
 * updateMyProfile
 * Updates the users profile based on the authorization value
 * @param info json - the json of the user
 * @param db database - the database object
 */
let updateMyProfile = async (info: any, db: Database): Promise<ServerResp> => {
  let update = await new Promise((resolve, reject): any => {
    db.get(
      "update profile set email = ?, city = ?, postalcode = ?, phone = ?, address = ? where uid = ?",
      [
        info.email ? info.email : null,
        info.city ? info.city : null,
        info.postalcode ? info.postalcode : null,
        info.phone ? info.phone : null,
        info.address ? info.address : null,
        info.auth.user.uid
      ],
      (err: any, row: any) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  }).catch(err => {
    console.error(err);
    return {
      status: 200,
      message: "error",
      data: err,
      dataType: "error"
    };
  });
  return {
    status: 200,
    message: "successfully updated profile",
    dataType: "profileupdated",
    success: true
  };
};

/**
 *  createAd
 * @param auth  - the auth object containing their token, uid and so on
 * @param ad  - the ad object. contains the title, description, etc
 * @param db  - database object
 */
let createAd = async (
  auth: any,
  ad: any,
  db: Database
): Promise<ServerResp> => {
  let update = await new Promise((resolve, reject): any => {
    db.get(
      "insert into ads values(null, ?, ?, ?, ?, ?, ?, ?, null)",
      [
        auth.user.username,
        ad.category,
        ad.name,
        ad.description,
        ad.price,
        auth.user.email,
        new Date().getDate()
      ],
      (err: any, row: any) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  }).catch(err => {
    console.error(err);
    return {
      status: 200,
      message: "error",
      data: err,
      dataType: "error"
    };
  });
  console.log(update);
  return {
    status: 200,
    message: "successfully created ad",
    success: true
  };
};

export { createUser, loginUser, getMyProfile, updateMyProfile, createAd };
