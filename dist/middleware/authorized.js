"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _databaseinit = require("../db/databaseinit");

//What this will do is restrict certain routes (get/posts) to people who have a token/logged in and will reject them otherwise
//We'll look at the request's authorization header, grab the token from there and then check it against out table to see if they are
//logged in.
//The onlyMe boolean will be used to restrict certain routes to only be able to adjust their own this, specifically their settings
var _default = function _default(onlyMe) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var db, token, check;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _databaseinit.getDatabase)();

              case 2:
                db = _context.sent;

                if (req.headers.authorization) {
                  _context.next = 6;
                  break;
                }

                res.status(200).send({
                  status: 200,
                  success: false,
                  message: "Unauthorized"
                });
                return _context.abrupt("return");

              case 6:
                token = req.headers.authorization.split("Bearer ")[1]; //split by bearer, grab the actual token as a string
                //This DB call down here accomplishes two things:
                //First, it lets us see if the user is actually authorized, that is if they are logged in.
                //Second, it fetches their user information so we can create a new field in the json body that has
                //all of their information so can use their UID to fetch applicable things from the database

                _context.next = 9;
                return new Promise(function (resolve, reject) {
                  db.get("SELECT * FROM users WHERE TOKEN = ?", [token], function (err, rows) {
                    if (err) reject(err);
                    resolve(rows);
                  });
                })["catch"](function (err) {
                  next(err);
                });

              case 9:
                check = _context.sent;

                if (check) {
                  _context.next = 14;
                  break;
                }

                console.log("check undef"); //if this is undefined or null, then the token they provided is either blank, or doesn't go to a user.
                //in either case, they're unauthorized so we'll reject them.

                res.status(200).send({
                  status: 200,
                  success: false,
                  check: check,
                  message: "Unauthorized"
                });
                return _context.abrupt("return");

              case 14:
                //if check returned something, then the token they provided corresponds to a logged in user. We'll grab their information
                //from the above database pull, and create a new field in the json body.
                console.log("creating auth");
                req.body["auth"] = {};

                if (onlyMe) {
                  req.body["auth"]["onlyme"] = true; //set the only me flag so I can only edit things that are MINE. prevents hackerman type shit
                }

                req.body["auth"]["token"] = token;
                req.body["auth"]["user"] = check; //this next is an express method that basically says "ok i'm done, pass the req, res and next options to the next route". In this case
                //it is the actual body of the route that uses this (ie: "/getmyprofile", authorized(true), -- (req, res) => -- ) the -- bit

                next();

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports["default"] = _default;