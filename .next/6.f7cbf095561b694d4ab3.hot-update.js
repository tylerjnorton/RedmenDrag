webpackHotUpdate(6,{

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
          var playerRef, fileRef, uploadProgress;
          return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return playersCollection.doc();

                case 2:
                  playerRef = _context.sent;
                  fileRef = firebase.storage().ref().child(playerRef.id);
                  uploadProgress = fileRef.put(file);
                  uploadProgress.on("state_changed", function (snapshot) {
                    var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    addPlayerBtn.setAttribute("disabled", true);
                    addPlayerBtn.innerText = "Uploading...";
                    console.log("Upload Progress: ".concat(progress, "%"));
                  }, function (error) {
                    return console.error(error);
                  }, function () {
                    playerRef.set({
                      playerName: playerName
                    });
                    playerNameInput.value = "";
                    uploadInput.value = "";
                    addPlayerBtn.removeAttribute("disabled");
                    addPlayerBtn.innerText = "Add Player";
                  });

                case 6:
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
          lineNumber: 37
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, "Add a player by uploading his name and image here."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
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
          lineNumber: 44
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
          lineNumber: 58
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("button", {
        id: "addPlayerBtn",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, "Add Player"));
    }
  }]);

  return AddPlayer;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);



/***/ })

})
//# sourceMappingURL=6.f7cbf095561b694d4ab3.hot-update.js.map