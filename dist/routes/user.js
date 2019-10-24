"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _user = require("../db/user/user");

var _databaseinit = require("../db/databaseinit");

/** User.ts (Route)
 *  This will just contain the endpoints for user-related stuff ie: signing up, logging in, changing password, etc
 */
var route = _express["default"].Router();

route.post("/signup",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _user.createUser;
            _context.t1 = req.body.username;
            _context.t2 = req.body.password;
            _context.next = 5;
            return (0, _databaseinit.getDatabase)();

          case 5:
            _context.t3 = _context.sent;
            _context.next = 8;
            return (0, _context.t0)(_context.t1, _context.t2, _context.t3);

          case 8:
            query = _context.sent;
            res.status(query.status).send(query.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
route.post("/login",
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _user.loginUser;
            _context2.t1 = req.body.username;
            _context2.t2 = req.body.password;
            _context2.next = 5;
            return (0, _databaseinit.getDatabase)();

          case 5:
            _context2.t3 = _context2.sent;
            _context2.next = 8;
            return (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t3);

          case 8:
            query = _context2.sent;
            res.status(query.status).send(query);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = route;
exports["default"] = _default;