webpackHotUpdate(6,{

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

/***/ })

})
//# sourceMappingURL=6.d6d2fc5f699928c0016b.hot-update.js.map