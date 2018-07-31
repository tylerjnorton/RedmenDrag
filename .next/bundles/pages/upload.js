module.exports =
__NEXT_REGISTER_PAGE('/upload', function() {
          var comp =
      webpackJsonp([6],{

/***/ "./components/AddPlayer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);

var _jsxFileName = "/Users/adam/Projects/RedmenDrag/components/AddPlayer.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



var AddPlayer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddPlayer, _React$Component);

  function AddPlayer() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, AddPlayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = AddPlayer.__proto__ || Object.getPrototypeOf(AddPlayer)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "fileInput", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: __WEBPACK_IMPORTED_MODULE_1_react___default.a.createRef()
    }), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        playerName: ""
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSubmit", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _value = _asyncToGenerator(
        /*#__PURE__*/
        __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(event) {
          var playersCollection, playerRef, fileRef, uploadProgress;
          return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  event.preventDefault();
                  playersCollection = firebase.firestore().collection("players");
                  _context.next = 4;
                  return playersCollection.doc();

                case 4:
                  playerRef = _context.sent;
                  fileRef = firebase.storage().ref().child(playerRef.id);
                  uploadProgress = fileRef.put(_this.fileInput.current.files[0]);
                  uploadProgress.on("state_changed", function (snapshot) {
                    var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;

                    _this.setState(function (state) {
                      return _objectSpread({}, state, {
                        uploading: true,
                        progress: progress
                      });
                    });
                  }, function (error) {
                    return console.error(error);
                  }, function () {
                    playerRef.set({
                      playerName: _this.state.playerName
                    });

                    _this.setState(function (state) {
                      return _objectSpread({}, state, {
                        uploading: false,
                        progress: null,
                        playerName: ""
                      });
                    });

                    _this.fileInput.current.value = "";
                  });

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function value(_x) {
          return _value.apply(this, arguments);
        };
      }()
    }), _temp));
  }

  _createClass(AddPlayer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("form", {
        onSubmit: this.handleSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }, "Add a player by uploading his name and image here."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, "The name will be used when you want to bring that player onto the screen"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("input", {
        type: "text",
        id: "playerNameInput",
        name: "name",
        required: true,
        placeholder: "Player Name",
        value: this.state.playerName,
        onChange: function onChange(_ref2) {
          var target = _ref2.target;
          return _this2.setState(function (state) {
            return _objectSpread({}, state, {
              playerName: target.value
            });
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("input", {
        id: "uploadInput",
        type: "file",
        name: "photo",
        required: true,
        ref: this.fileInput,
        accept: "image/png, image/jpeg, image/jpg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("button", {
        id: "addPlayerBtn",
        disabled: this.state.uploading,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }, this.state.uploading ? "Saving..." : "Add Player"));
    }
  }]);

  return AddPlayer;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);



/***/ }),

/***/ "./components/Players.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Players; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



var Players =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Players, _React$Component);

  function Players() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Players);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Players.__proto__ || Object.getPrototypeOf(Players)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        players: {}
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "actions", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        removePlayer: function removePlayer(player) {
          return function (event) {
            return firebase.firestore().collection("players").doc(player.id).delete();
          };
        },
        togglePlayerSelected: function togglePlayerSelected(player) {
          return function (event) {
            return firebase.firestore().collection("players").doc(player.id).update({
              isSelected: !player.isSelected
            });
          };
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handlePlayerRemoved", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _value = _asyncToGenerator(
        /*#__PURE__*/
        __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(doc) {
          return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this.setState(function (state) {
                    delete state.players[doc.id];
                    return _objectSpread({}, state, {
                      players: state.players
                    });
                  });

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function value(_x) {
          return _value.apply(this, arguments);
        };
      }()
    }), Object.defineProperty(_assertThisInitialized(_this), "handlePlayerModified", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _value2 = _asyncToGenerator(
        /*#__PURE__*/
        __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2(doc) {
          var url;
          return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _this.setState(function (state) {
                    return _objectSpread({}, state, {
                      players: _objectSpread({}, state.players, _defineProperty({}, doc.id, _objectSpread({}, state.players[doc.id], doc.data(), {
                        id: doc.id
                      })))
                    });
                  });

                  _context2.next = 3;
                  return firebase.storage().ref().child(doc.id).getDownloadURL();

                case 3:
                  url = _context2.sent;

                  _this.setState(function (state) {
                    return _objectSpread({}, state, {
                      players: _objectSpread({}, state.players, _defineProperty({}, doc.id, _objectSpread({}, state.players[doc.id], doc.data(), {
                        url: url
                      })))
                    });
                  });

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function value(_x2) {
          return _value2.apply(this, arguments);
        };
      }()
    }), Object.defineProperty(_assertThisInitialized(_this), "onSnapshot", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(snap) {
        snap.docChanges().forEach(
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator(
          /*#__PURE__*/
          __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3(_ref2) {
            var doc, type;
            return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    doc = _ref2.doc, type = _ref2.type;
                    _context3.t0 = type;
                    _context3.next = _context3.t0 === "added" ? 4 : _context3.t0 === "modified" ? 4 : _context3.t0 === "removed" ? 5 : 6;
                    break;

                  case 4:
                    return _context3.abrupt("return", _this.handlePlayerModified(doc));

                  case 5:
                    return _context3.abrupt("return", _this.handlePlayerRemoved(doc));

                  case 6:
                    console.warn("Not implemented", type);

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          return function (_x3) {
            return _ref3.apply(this, arguments);
          };
        }());
      }
    }), _temp));
  }

  _createClass(Players, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      firebase.firestore().collection("players").onSnapshot(this.onSnapshot);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var players = Object.keys(this.state.players).map(function (id) {
        return _this2.state.players[id];
      }).sort(function (a, b) {
        return (a.playerName || "").toLowerCase().localeCompare((b.playerName || "").toLowerCase());
      });
      return this.props.children(players, this.actions);
    }
  }]);

  return Players;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);



/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./pages/upload.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Players__ = __webpack_require__("./components/Players.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_AddPlayer__ = __webpack_require__("./components/AddPlayer.js");
var _jsxFileName = "/Users/adam/Projects/RedmenDrag/pages/upload.js";



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "upload",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Players__["a" /* default */], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, function (players, _ref) {
    var removePlayer = _ref.removePlayer,
        togglePlayerSelected = _ref.togglePlayerSelected;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment, null, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_AddPlayer__["a" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h4", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    }, "Current Player List (Alphabetical)"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", {
      id: "redmenList",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    }, players.map(function (player) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
        key: player.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", {
        src: player.url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, player.playerName), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
        onClick: removePlayer(player),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, "Delete"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
        onChange: togglePlayerSelected(player),
        type: "checkbox",
        checked: !!player.isSelected,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }));
    })));
  }));
});
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/upload")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/upload.js");


/***/ })

},[5])
          return { page: comp.default }
        })
      ;
//# sourceMappingURL=upload.js.map