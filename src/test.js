// testing stuff ~~
"use strict";
var assert = require("assert");
var loginUser = require("../dist/db/user/user").loginUser;

describe("test user functions", async () => {
  describe("#signup()", async () => {
    it("should return with user existing", async () => {
      let test = new Object();
      test["get"] = () => {
        return {
          uid: 1,
          username: "lmao",
          password: "test",
          token: ""
        };
      };
      loginUser("lmao", "test", test);
    });

    it("should return with new user created", async () => {
      let test = new Object();
      test["get"] = () => {
        return null;
      };
      loginUser("lmao", "test", test);
    });
  });

  describe("#login()", async () => {
    it("should return with invalid password", async () => {
      let test = new Object();
      test["get"] = () => {
        return {
          uid: 1,
          username: "lmao",
          password: "test",
          token: ""
        };
      };
      let res = await loginUser("lmao", "test", test);
    });

    it("should return with success", async () => {
      let test = new Object();
      test["get"] = () => {
        return null;
      };
      loginUser("lmao", "test", test);
    });
  });
});
