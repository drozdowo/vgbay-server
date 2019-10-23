// testing stuff ~~
"use strict";
var assert = require("assert");
var loginUser = require("../dist/db/user/user").loginUser;
var createUser = require("../dist/db/user/user").createUser;

describe("test user functions", async function() {
  describe("#signup()", async function() {
    it("should return with user existing", async function() {
      let test = new Object();
      test["get"] = () => {
        return {
          uid: 1,
          username: "lmao",
          password: "test",
          token: ""
        };
      };
      console.log("res");
      const res = await createUser("lmao", "test", test);
      console.log(res);
    });

    it("should return with new user created", async function() {
      let test = new Object();
      test["get"] = () => {
        return null;
      };
      let res = await createUser("lmao", "test", test);
      assert.strictEqual(res.success, true);
    });
  });

  describe("#login()", async function() {
    it("should return with invalid password", async function() {
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
      console.log(res);
      assert.strictEqual(res.success, false);
    });

    it("should return with success", async function() {
      let test = new Object();
      test["get"] = () => {
        return null;
      };
      let res = await loginUser("lmao", "test", test);
    });
  });
});
