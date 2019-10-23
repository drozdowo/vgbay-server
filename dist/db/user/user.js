"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.createUser = void 0;

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

exports.loginUser = loginUser;