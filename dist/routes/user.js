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

var _authorized = _interopRequireDefault(require("../middleware/authorized"));

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
/** login route
 *
 */

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
/**
 *  get my profile route
 */

route.get("/getmyprofile", (0, _authorized["default"])(true),
/*#__PURE__*/
//this bit will make this so only authorized people can access this
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var token, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.body.auth.token; //should be set after authorization

            _context3.t0 = _user.getMyProfile;
            _context3.t1 = token;
            _context3.next = 5;
            return (0, _databaseinit.getDatabase)();

          case 5:
            _context3.t2 = _context3.sent;
            _context3.next = 8;
            return (0, _context3.t0)(_context3.t1, _context3.t2);

          case 8:
            result = _context3.sent;
            res.status(result.status).send(result);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
route.post("/updatemyprofile", (0, _authorized["default"])(true),
/*#__PURE__*/
//this bit will make this so only authorized people can access this
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var info, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            info = req.body;
            _context4.t0 = _user.updateMyProfile;
            _context4.t1 = info;
            _context4.next = 5;
            return (0, _databaseinit.getDatabase)();

          case 5:
            _context4.t2 = _context4.sent;
            _context4.next = 8;
            return (0, _context4.t0)(_context4.t1, _context4.t2);

          case 8:
            result = _context4.sent;
            res.status(result.status).send(result);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());
/**
 *  the create ad route. this is what will be called when we want to create a route
 */

route.post("/createad", (0, _authorized["default"])(true),
/*#__PURE__*/
//this bit will make this so only authorized people can access this
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var ad, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ad = {};
            ad["category"] = req.body.category;
            ad["name"] = req.body.name;
            ad["description"] = req.body.description;
            ad["price"] = req.body.price;
            _context5.t0 = _user.createAd;
            _context5.t1 = req.body.auth;
            _context5.t2 = ad;
            _context5.next = 10;
            return (0, _databaseinit.getDatabase)();

          case 10:
            _context5.t3 = _context5.sent;
            _context5.next = 13;
            return (0, _context5.t0)(_context5.t1, _context5.t2, _context5.t3);

          case 13:
            result = _context5.sent;
            res.status(result.status).send(result);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());
/**
 *  the myads route. this will return our ads
 */

route.get("/myads", (0, _authorized["default"])(true),
/*#__PURE__*/
//this bit will make this so only authorized people can access this
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var ad, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            ad = {};
            _context6.t0 = _user.myAds;
            _context6.t1 = req.body.auth;
            _context6.next = 5;
            return (0, _databaseinit.getDatabase)();

          case 5:
            _context6.t2 = _context6.sent;
            _context6.next = 8;
            return (0, _context6.t0)(_context6.t1, _context6.t2);

          case 8:
            result = _context6.sent;
            res.status(result.status).send(result);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());
/**
 *  the getad route. this will return the requested ad
 */

route.get("/viewad",
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("ok work");
            console.log(req.query);
            _context7.t0 = _user.getAd;
            _context7.t1 = req.query.adId;
            _context7.next = 6;
            return (0, _databaseinit.getDatabase)();

          case 6:
            _context7.t2 = _context7.sent;
            _context7.next = 9;
            return (0, _context7.t0)(_context7.t1, _context7.t2);

          case 9:
            result = _context7.sent;
            res.status(result.status).send(result);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = route;
exports["default"] = _default;