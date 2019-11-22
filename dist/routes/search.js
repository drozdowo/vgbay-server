"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _search = require("../db/search/search");

var _databaseinit = require("../db/databaseinit");

var route = _express["default"].Router();

route.get("/homepageads",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var ads;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _search.homepageAds;
            _context.next = 3;
            return (0, _databaseinit.getDatabase)();

          case 3:
            _context.t1 = _context.sent;
            _context.next = 6;
            return (0, _context.t0)(_context.t1);

          case 6:
            ads = _context.sent;
            res.status(ads.status).send(ads);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
route.post("/searchterm",
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var ads;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _search.searchName;
            _context2.next = 3;
            return (0, _databaseinit.getDatabase)();

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = req.body.term;
            _context2.next = 7;
            return (0, _context2.t0)(_context2.t1, _context2.t2);

          case 7:
            ads = _context2.sent;
            res.status(ads.status).send(ads);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
route.get("/categories",
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var ads;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = _search.getCategories;
            _context3.next = 3;
            return (0, _databaseinit.getDatabase)();

          case 3:
            _context3.t1 = _context3.sent;
            _context3.next = 6;
            return (0, _context3.t0)(_context3.t1);

          case 6:
            ads = _context3.sent;
            res.status(ads.status).send(ads);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = route;
exports["default"] = _default;