webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Head */ "./components/Head.js");
var _jsxFileName = "/home/me/dev/ruchi-s/pages/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    var _this;

    _classCallCheck(this, Home);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Home).call(this));
    _this.state = {
      code: [],
      bill: [],
      value: null,
      // value as per the code
      increment: 20,
      // amount to give in
      price: null,
      discount: 25,
      offerPrice: null,
      mobile: null
    };
    _this.map = {
      'K': 1,
      'E': 2,
      'L': 3,
      'V': 4,
      'I': 5,
      'N': 6,
      'A': 7,
      'T': 8,
      'O': 9,
      'R': 0
    };
    _this.handleCode = _this.handleCode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleButton = _this.handleButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClear = _this.handleClear.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleAdd = _this.handleAdd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleEqual = _this.handleEqual.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMobile = _this.handleMobile.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleWhatsApp = _this.handleWhatsApp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Home, [{
    key: "convert",
    value: function convert(code) {
      var _this2 = this;

      var value = [];
      code.forEach(function (c) {
        value.push(_this2.map[c]);
      });
      value = parseInt(value.join(''));
      var price = (value * (100 + this.state.increment) / 100).toFixed(2);
      var offerPrice = (price * (100 - this.state.discount) / 100).toFixed(2);
      this.setState({
        value: value,
        price: price,
        offerPrice: offerPrice
      });
    }
  }, {
    key: "handleCode",
    value: function handleCode(e) {
      var code = e.target.value.toUpperCase().split('');
      this.setState({
        code: code
      });
      this.convert(code);
    }
  }, {
    key: "handleButton",
    value: function handleButton(e) {
      var code = this.state.code.concat(e.target.getAttribute('value'));
      this.setState({
        code: code
      });
      this.convert(code);
    }
  }, {
    key: "handleClear",
    value: function handleClear() {
      this.setState({
        code: [],
        price: null,
        value: null,
        offerPrice: null,
        bill: []
      });
    }
  }, {
    key: "handleAdd",
    value: function handleAdd() {
      if (!this.state.offerPrice) return;
      var bill = this.state.bill.concat(parseInt(this.state.offerPrice));
      console.log(bill);
      this.setState({
        bill: bill,
        code: [],
        value: null,
        price: null,
        offerPrice: null
      });
    }
  }, {
    key: "handleEqual",
    value: function handleEqual() {
      var sum = this.state.bill.reduce(function (a, b) {
        return a + b;
      }, 0);
      this.setState({
        code: [],
        price: null,
        value: null,
        offerPrice: sum
      });
    }
  }, {
    key: "handleMobile",
    value: function handleMobile(e) {
      this.setState({
        mobile: e.target.value
      });
    }
  }, {
    key: "handleWhatsApp",
    value: function handleWhatsApp() {
      var bill = '';

      for (var i = 0; i < this.state.bill.length; i++) {
        bill += "Item ".concat(i + 1, ": *").concat(this.state.bill[i], "*%0A");
      }

      bill += "Total: *".concat(this.state.offerPrice, "*%0A");
      bill += 'Thanks for shopping with us!%0A🎁🎉🎁🎉Happy Diwali!🎁🎉🎁🎉%0A- *Ruchi Selection*%0A%0AFor more info contact - 9413485247';
      window.location.href = "https://api.whatsapp.com/send?phone=+91".concat(this.state.mobile, "&text=").concat(bill);
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.state.bill);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "main",
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Head__WEBPACK_IMPORTED_MODULE_3__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "bill",
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131" + " " + 'el total',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, this.state.bill.map(function (i) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
          key: i,
          className: "jsx-1125685131",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 114
          },
          __self: this
        }, i, " + ");
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131" + " " + 'el price',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "jsx-1125685131" + " " + 'actual',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strike", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, this.state.price)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, this.state.offerPrice))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "calculator",
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "A",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, "A"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "E",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, "E"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "I",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, "I"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleClear,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, "C"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "K",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, "K"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "L",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      }, "L"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "N",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }, "N"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleAdd,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, "+"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "O",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, "O"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "R",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, "R"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "T",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, "T"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleWhatsApp,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, "W"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "V",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }, "V"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleEqual,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, '='), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        onChange: this.handleMobile,
        type: "number",
        name: "mobile",
        placeholder: "Mobile Number",
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
        styleId: "1125685131",
        css: "body{padding:0;margin:0;background-color:#272727;color:rgba(255,255,255,0.9);overflow:hidden;}#bill{height:30vh;padding:20px;border-bottom:1px solid rgba(255,255,255,0.5);display:grid;grid-template-rows:80% 20%;}.el{text-align:right;}.total{font-size:24px;color:rgba(255,255,255,0.3);}.price{font-size:32px;color:rgba(255,255,255,0.9);}.actual{padding-right:20px;}#calculator{height:70vh;padding:20px;display:grid;grid-template-columns:repeat(4,70px);grid-template-rows:repeat(4,70px);grid-gap:20px;}.item{font-size:24px;border:1px solid rgba(255,255,255,0.2);border-radius:50%;text-align:center;line-height:70px;height:70px;color:white;}.passive{background-color:rgba(255,255,255,0.1);}input{width:300px;font-size:22px;line-height:26px;padding:4px;border:none;background:rgba(255,255,255,0.1);color:white;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21lL2Rldi9ydWNoaS1zL3BhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZJMkIsQUFHdUIsQUFPRSxBQVFLLEFBR0YsQUFJQSxBQUlJLEFBR1AsQUFTRyxBQVMyQixBQUc5QixVQWpESCxFQU9JLEFBc0JBLEFBcUJFLEdBaENnQixBQUlBLEFBZ0JXLEVBdkI1QyxFQWQyQixBQXlCM0IsTUFsQm1ELEFBdUJwQyxFQW9CSSxXQW5CcUIsQ0FleEMsSUE1QkEsQUFJQSxDQXJCaUMsQUFrRG5CLFVBYk0sRUFjTixZQUN3QixHQTVDdkIsQ0FQRyxBQXFDRSxHQVBpQixTQXRCUixJQVA3QixFQXFDbUIsV0FjTCxNQWJBLEVBUkUsRUF0QmhCLEVBNENBLE1BYmMsSUFSZCxRQVNBIiwiZmlsZSI6Ii9ob21lL21lL2Rldi9ydWNoaS1zL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGZldGNoIGZyb20gJ2lzb21vcnBoaWMtZmV0Y2gnXG5pbXBvcnQgSGVhZCBmcm9tICcuLi9jb21wb25lbnRzL0hlYWQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2RlOiBbXSxcbiAgICAgIGJpbGw6IFtdLFxuICAgICAgdmFsdWU6IG51bGwsIC8vIHZhbHVlIGFzIHBlciB0aGUgY29kZVxuICAgICAgaW5jcmVtZW50OiAyMCwgLy8gYW1vdW50IHRvIGdpdmUgaW5cbiAgICAgIHByaWNlOiBudWxsLFxuICAgICAgZGlzY291bnQ6IDI1LFxuICAgICAgb2ZmZXJQcmljZTogbnVsbCxcbiAgICAgIG1vYmlsZTogbnVsbFxuICAgIH1cbiAgICB0aGlzLm1hcCA9IHtcbiAgICAgICdLJzogMSxcbiAgICAgICdFJzogMixcbiAgICAgICdMJzogMyxcbiAgICAgICdWJzogNCxcbiAgICAgICdJJzogNSxcbiAgICAgICdOJzogNixcbiAgICAgICdBJzogNyxcbiAgICAgICdUJzogOCxcbiAgICAgICdPJzogOSxcbiAgICAgICdSJzogMFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNvZGUgPSB0aGlzLmhhbmRsZUNvZGUuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlQnV0dG9uID0gdGhpcy5oYW5kbGVCdXR0b24uYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlQ2xlYXIgPSB0aGlzLmhhbmRsZUNsZWFyLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUFkZCA9IHRoaXMuaGFuZGxlQWRkLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUVxdWFsID0gdGhpcy5oYW5kbGVFcXVhbC5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVNb2JpbGUgPSB0aGlzLmhhbmRsZU1vYmlsZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVXaGF0c0FwcCA9IHRoaXMuaGFuZGxlV2hhdHNBcHAuYmluZCh0aGlzKVxuICB9XG5cbiAgY29udmVydCAoY29kZSkge1xuICAgIGxldCB2YWx1ZSA9IFtdXG4gICAgY29kZS5mb3JFYWNoKGMgPT4ge1xuICAgICAgdmFsdWUucHVzaCh0aGlzLm1hcFtjXSlcbiAgICB9KTtcbiAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlLmpvaW4oJycpKVxuICAgIHZhciBwcmljZSA9ICh2YWx1ZSAqICgxMDAgKyB0aGlzLnN0YXRlLmluY3JlbWVudCkgLyAxMDApLnRvRml4ZWQoMilcbiAgICB2YXIgb2ZmZXJQcmljZSA9IChwcmljZSAqICgxMDAgLSB0aGlzLnN0YXRlLmRpc2NvdW50KSAvIDEwMCkudG9GaXhlZCgyKVxuICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlLCBwcmljZSwgb2ZmZXJQcmljZX0pXG4gIH1cblxuICBoYW5kbGVDb2RlIChlKSB7XG4gICAgY29uc3QgY29kZSA9IGUudGFyZ2V0LnZhbHVlLnRvVXBwZXJDYXNlKCkuc3BsaXQoJycpXG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29kZX0pXG4gICAgdGhpcy5jb252ZXJ0KGNvZGUpXG4gIH1cblxuICBoYW5kbGVCdXR0b24gKGUpIHtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5zdGF0ZS5jb2RlLmNvbmNhdChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpXG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29kZX0pXG4gICAgdGhpcy5jb252ZXJ0KGNvZGUpXG4gIH1cblxuICBoYW5kbGVDbGVhciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2RlOiBbXSxcbiAgICAgIHByaWNlOiBudWxsLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBvZmZlclByaWNlOiBudWxsLFxuICAgICAgYmlsbDogW11cbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlQWRkICgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUub2ZmZXJQcmljZSkgcmV0dXJuO1xuICAgIHZhciBiaWxsID0gdGhpcy5zdGF0ZS5iaWxsLmNvbmNhdChwYXJzZUludCh0aGlzLnN0YXRlLm9mZmVyUHJpY2UpKVxuICAgIGNvbnNvbGUubG9nKGJpbGwpXG4gICAgdGhpcy5zZXRTdGF0ZSh7YmlsbCwgY29kZTogW10sIHZhbHVlOiBudWxsLCBwcmljZTogbnVsbCwgb2ZmZXJQcmljZTogbnVsbH0pXG4gIH1cblxuICBoYW5kbGVFcXVhbCAoKSB7XG4gICAgdmFyIHN1bSA9IHRoaXMuc3RhdGUuYmlsbC5yZWR1Y2UoKGEsIGIpID0+IGErYiwgMClcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvZGU6IFtdLFxuICAgICAgcHJpY2U6IG51bGwsXG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIG9mZmVyUHJpY2U6IHN1bVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVNb2JpbGUgKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vYmlsZTogZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlV2hhdHNBcHAgKCkge1xuICAgIGxldCBiaWxsID0gJydcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGUuYmlsbC5sZW5ndGg7IGkgKyspIHtcbiAgICAgIGJpbGwgKz0gYEl0ZW0gJHtpICsgMX06ICoke3RoaXMuc3RhdGUuYmlsbFtpXX0qJTBBYFxuICAgIH1cbiAgICBiaWxsICs9IGBUb3RhbDogKiR7dGhpcy5zdGF0ZS5vZmZlclByaWNlfSolMEFgXG4gICAgYmlsbCArPSAnVGhhbmtzIGZvciBzaG9wcGluZyB3aXRoIHVzISUwQfCfjoHwn46J8J+OgfCfjolIYXBweSBEaXdhbGkh8J+OgfCfjonwn46B8J+OiSUwQS0gKlJ1Y2hpIFNlbGVjdGlvbiolMEElMEFGb3IgbW9yZSBpbmZvIGNvbnRhY3QgLSA5NDEzNDg1MjQ3J1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGh0dHBzOi8vYXBpLndoYXRzYXBwLmNvbS9zZW5kP3Bob25lPSs5MSR7dGhpcy5zdGF0ZS5tb2JpbGV9JnRleHQ9JHtiaWxsfWBcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5iaWxsKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdtYWluJz5cbiAgICAgICAgPEhlYWQgLz5cbiAgICAgICAgPGRpdiBpZD0nYmlsbCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsIHRvdGFsJz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmJpbGwubWFwKGkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aX0+e2l9ICsgPC9zcGFuPlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZWwgcHJpY2UnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdhY3R1YWwnPjxzdHJpa2U+e3RoaXMuc3RhdGUucHJpY2V9PC9zdHJpa2U+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUub2ZmZXJQcmljZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPSdjYWxjdWxhdG9yJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J0EnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5BPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0nIHZhbHVlPSdFJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbn0+RTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpdGVtJyB2YWx1ZT0nSScgb25DbGljaz17dGhpcy5oYW5kbGVCdXR0b259Pkk8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbSBwYXNzaXZlJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsZWFyfT5DPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0nIHZhbHVlPSdLJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbn0+SzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpdGVtJyB2YWx1ZT0nTCcgb25DbGljaz17dGhpcy5oYW5kbGVCdXR0b259Pkw8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J04nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5OPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0gcGFzc2l2ZScgb25DbGljaz17dGhpcy5oYW5kbGVBZGR9Pis8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J08nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5PPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0nIHZhbHVlPSdSJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbn0+UjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpdGVtJyB2YWx1ZT0nVCcgb25DbGljaz17dGhpcy5oYW5kbGVCdXR0b259PlQ8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbSBwYXNzaXZlJyBvbkNsaWNrPXt0aGlzLmhhbmRsZVdoYXRzQXBwfT5XPC9kaXY+XG4gICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J1YnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5WPC9kaXY+XG4gICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbSBwYXNzaXZlJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUVxdWFsfT57Jz0nfTwvZGl2PlxuICAgICAgICAgIDxkaXY+PGlucHV0IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU1vYmlsZX0gdHlwZT0nbnVtYmVyJyBuYW1lPSdtb2JpbGUnIHBsYWNlaG9sZGVyPSdNb2JpbGUgTnVtYmVyJyAvPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICBib2R5IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjcyNzI3O1xuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgfVxuICAgICAgICAgICNiaWxsIHtcbiAgICAgICAgICAgIGhlaWdodDogMzB2aDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuXG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA4MCUgMjAlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAuZWwge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC50b3RhbCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAucHJpY2Uge1xuICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLmFjdHVhbCB7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAjY2FsY3VsYXRvciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDcwdmg7XG4gICAgICAgICAgICBwYWRkaW5nOiAyMHB4O1xuXG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgNzBweCk7XG4gICAgICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCA3MHB4KTtcbiAgICAgICAgICAgIGdyaWQtZ2FwOiAyMHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAuaXRlbSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNzBweDtcbiAgICAgICAgICAgIGhlaWdodDogNzBweDtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLnBhc3NpdmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnB1dCB7XG4gICAgICAgICAgICB3aWR0aDogMzAwcHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMjZweDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDRweDtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSJdfQ== */\n/*@ sourceURL=/home/me/dev/ruchi-s/pages/index.js */",
        __self: this
      }));
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);


    (function (Component, route) {
      if(!Component) return
      if (false) {}
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=index.js.b7db819b9c80a22f8410.hot-update.js.map