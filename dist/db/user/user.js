"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAd = exports.myAds = exports.createAd = exports.updateMyProfile = exports.getMyProfile = exports.loginUser = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var createUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(username, password, db) {
    var check, stmt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!username && !password)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {
              status: 200,
              message: "No username or password provided.",
              success: false
            });

          case 2:
            if (username) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", {
              status: 200,
              message: "No username provided",
              success: false
            });

          case 4:
            if (password) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              status: 200,
              message: "No password provided",
              success: false
            });

          case 6:
            _context.next = 8;
            return new Promise(function (resolve, reject) {
              db.get("select * from users where username = ?", [username], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.log(err);
            });

          case 8:
            check = _context.sent;
            //Check the result and see if a user already exists
            console.log(check);

            if (!check) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", {
              status: 200,
              message: "User with this name already exists",
              success: false
            });

          case 12:
            _context.next = 14;
            return db.prepare("insert into users values (NULL,?,?,NULL)");

          case 14:
            stmt = _context.sent;
            _context.next = 17;
            return stmt.run([username, password]);

          case 17:
            _context.next = 19;
            return stmt.finalize();

          case 19:
            console.log("created user");
            return _context.abrupt("return", {
              status: 200,
              message: "Successfully created user",
              success: true
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/** loginUser
 *  Called when a user is logging into the
 *
 * @param username string
 * @param password  string
 * @param db database
 */


exports.createUser = createUser;

var loginUser =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(username, password, db) {
    var check, token, tokenQuery;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!username && !password)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", {
              status: 200,
              message: "No username or password provided.",
              success: false
            });

          case 2:
            if (username) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", {
              status: 200,
              message: "No username provided",
              success: false
            });

          case 4:
            if (password) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", {
              status: 200,
              message: "No password provided",
              success: false
            });

          case 6:
            _context2.next = 8;
            return new Promise(function (resolve, reject) {
              db.get("select * from users where username = ?", [username], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.log(err);
            });

          case 8:
            check = _context2.sent;
            console.log(check);

            if (check) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", {
              status: 200,
              message: "invalid username",
              success: false
            });

          case 12:
            if (!(password === check["password"])) {
              _context2.next = 18;
              break;
            }

            //create a token and save it for that user
            token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            _context2.next = 16;
            return new Promise(function (resolve, reject) {
              db.get("update users set token = ? where username = ?", [token, username], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.log(err);
            });

          case 16:
            tokenQuery = _context2.sent;
            return _context2.abrupt("return", {
              status: 200,
              message: "verified",
              token: token,
              success: true
            });

          case 18:
            return _context2.abrupt("return", {
              status: 200,
              message: "invalid password",
              success: false
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loginUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * getMyProfile
 * Gets the users profile information for display. No editing here.
 * @param token string - the users token
 * @param db database - the database object
 */


exports.loginUser = loginUser;

var getMyProfile =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(token, db) {
    var check;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new Promise(function (resolve, reject) {
              db.get("select * from profile where uid = (select uid from users where token = ?)", [token], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.log(err);
            });

          case 2:
            check = _context3.sent;

            if (check) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", {
              status: 200,
              success: false,
              message: "invalid user?"
            });

          case 5:
            return _context3.abrupt("return", {
              status: 200,
              message: "success",
              dataType: "profile",
              data: check,
              success: true
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getMyProfile(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * updateMyProfile
 * Updates the users profile based on the authorization value
 * @param info json - the json of the user
 * @param db database - the database object
 */


exports.getMyProfile = getMyProfile;

var updateMyProfile =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(info, db) {
    var update;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new Promise(function (resolve, reject) {
              db.get("update profile set email = ?, city = ?, postalcode = ?, phone = ?, address = ? where uid = ?", [info.email ? info.email : null, info.city ? info.city : null, info.postalcode ? info.postalcode : null, info.phone ? info.phone : null, info.address ? info.address : null, info.auth.user.uid], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.error(err);
              return {
                status: 200,
                message: "error",
                data: err,
                dataType: "error"
              };
            });

          case 2:
            update = _context4.sent;
            return _context4.abrupt("return", {
              status: 200,
              message: "successfully updated profile",
              dataType: "profileupdated",
              success: true
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateMyProfile(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *  createAd
 * @param auth  - the auth object containing their token, uid and so on
 * @param ad  - the ad object. contains the title, description, etc
 * @param db  - database object
 */


exports.updateMyProfile = updateMyProfile;

var createAd =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(auth, ad, db) {
    var update;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(auth);
            _context5.next = 3;
            return new Promise(function (resolve, reject) {
              db.get("insert into ads values(null, ?, ?, ?, ?, ?, (DATETIME('now', 'localtime')))", [auth.user.uid, ad.category, ad.name, ad.description, ad.price], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.error(err);
              return {
                status: 200,
                message: "error",
                data: err,
                dataType: "error"
              };
            });

          case 3:
            update = _context5.sent;
            console.log(update);
            return _context5.abrupt("return", {
              status: 200,
              message: "successfully created ad",
              success: true
            });

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createAd(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 *  createAd
 * @param auth  - the auth object containing their token, uid and so on
 * @param ad  - the ad object. contains the title, description, etc
 * @param db  - database object
 */


exports.createAd = createAd;

var myAds =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(auth, db) {
    var ads;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return new Promise(function (resolve, reject) {
              db.all("select * from ads where uid = ?", [auth.user.uid], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.error(err);
              return {
                status: 200,
                message: "error",
                data: err,
                dataType: "error"
              };
            });

          case 2:
            ads = _context6.sent;
            return _context6.abrupt("return", {
              status: 200,
              data: ads,
              dataType: "myads",
              message: "got ads",
              success: true
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function myAds(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 *  getAd
 * @param auth  - the auth object containing their token, uid and so on
 * @param adId - the ad id number
 * @param db  - database object
 */


exports.myAds = myAds;

var getAd =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(adId, db) {
    var ad;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return new Promise(function (resolve, reject) {
              db.all("select * from ads where id = ?", [adId], function (err, row) {
                if (err) reject(err);
                resolve(row);
              });
            })["catch"](function (err) {
              console.error(err);
              return {
                status: 200,
                message: "error",
                data: err,
                dataType: "error"
              };
            });

          case 2:
            ad = _context7.sent;
            return _context7.abrupt("return", {
              status: 200,
              data: ad,
              dataType: "adinfo",
              message: "got ad",
              success: true
            });

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getAd(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getAd = getAd;