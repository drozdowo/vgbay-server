"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _databaseinit = require("./db/databaseinit");

var _routes = require("./routes");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json()); //use body-parser module. It formats the post data into the body of the request.

app.use((0, _cors["default"])());

var sqlite3 = require("sqlite3").verbose();

var db;
app.use("/user", _routes.User); //Forward all things that access /user/<anything> to our User route

app.listen(3000,
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db = new sqlite3.Database("../vgbayserver.db", function (err) {
            if (err) {
              console.log("err");
              process.exit(1);
            }
          });
          _context.next = 3;
          return (0, _databaseinit.initTables)(db);

        case 3:
          console.log("vgBay Server Started...");

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));