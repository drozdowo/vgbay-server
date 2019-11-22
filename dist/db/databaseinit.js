"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatabase = exports.initTables = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var database;

var getDatabase =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", database);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDatabase() {
    return _ref.apply(this, arguments);
  };
}();

exports.getDatabase = getDatabase;

var initTables =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(db) {
    var categories;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            database = db;
            console.log("creating user table...");
            _context3.next = 4;
            return db.run("CREATE TABLE users(uid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username TEXT NOT NULL, password TEXT NOT NULL, token TEXT UNIQUE)", function (err) {
              if (err != null) {//console.log(err);
              }
            });

          case 4:
            _context3.next = 6;
            return db.run("CREATE TABLE ads (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, uid	number NOT NULL, category	TEXT NOT NULL, name	TEXT NOT NULL, description	TEXT NOT NULL, price	INTEGER NOT NULL, datePosted	NUMERIC)", function (err) {
              if (err != null) {//console.log(err);
              }
            });

          case 6:
            _context3.next = 8;
            return db.run("CREATE TABLE profile (uid	INTEGER NOT NULL UNIQUE, email	TEXT, city	TEXT, postalcode	TEXT, phone	TEXT, address	TEXT, PRIMARY KEY(uid))", function (err) {
              if (err != null) {//console.log(err);
              }
            });

          case 8:
            _context3.next = 10;
            return db.run("CREATE TABLE categories (\n      id\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\n      category\tTEXT NOT NULL\n    )", function (err) {
              if (err != null) {//console.log(err);
              }
            });

          case 10:
            //Populate Categories Data
            categories = ["Games (Boxed)", "Accounts", "Consoles (Modern)", "Consoles (Retro)", "Games (Retro)", "Games (Bulk)", "Memorabilia", "Accessories", "Cables", "Test"];
            categories.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(category) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return db.run("\n        INSERT INTO CATEGORIES VALUES ('".concat(categories.indexOf(category).valueOf() + 1, "', '").concat(category, "')\n      "), function (err) {
                          if (err != null) {
                            console.log("category err" + err);
                          }
                        });

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function initTables(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.initTables = initTables;