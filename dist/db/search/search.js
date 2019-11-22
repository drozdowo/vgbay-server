"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategories = exports.searchName = exports.homepageAds = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var homepageAds =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(db) {
    var ads;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {
              db.all("select * from ads order by datePosted limit 10", function (err, rows) {
                if (err) reject(err);
                resolve(rows);
              });
            })["catch"](function (err) {
              console.log(err);
            });

          case 2:
            ads = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              message: "success",
              success: true,
              data: ads,
              dataType: "homepageads"
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function homepageAds(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.homepageAds = homepageAds;

var searchName =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(db, searchterm) {
    var ads;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(function (resolve, reject) {
              db.all('select * from ads where UPPER(name) like "%" || ? || "%"', [searchterm.toUpperCase()], function (err, rows) {
                if (err) reject(err);
                resolve(rows);
              });
            })["catch"](function (err) {
              console.log(err);
            });

          case 2:
            ads = _context2.sent;
            return _context2.abrupt("return", {
              status: 200,
              message: "success",
              success: true,
              data: ads,
              dataType: "search"
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function searchName(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.searchName = searchName;

var getCategories =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(db) {
    var categories;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new Promise(function (resolve, reject) {
              db.all("select * from categories", function (err, rows) {
                if (err) reject(err);
                resolve(rows);
              });
            })["catch"](function (err) {
              console.log(err);
            });

          case 2:
            categories = _context3.sent;
            return _context3.abrupt("return", {
              status: 200,
              message: "success",
              success: true,
              data: categories,
              dataType: "categories"
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCategories(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCategories = getCategories;