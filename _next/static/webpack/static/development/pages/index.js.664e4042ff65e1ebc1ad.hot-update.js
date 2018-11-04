webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-fetch/fetch-npm-browserify.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
module.exports = self.fetch.bind(self);


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


/***/ }),

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
      window.location.href = "";
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
          lineNumber: 102
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Head__WEBPACK_IMPORTED_MODULE_3__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "bill",
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131" + " " + 'el total',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, this.state.bill.map(function (i) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
          key: i,
          className: "jsx-1125685131",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          },
          __self: this
        }, i, " + ");
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131" + " " + 'el price',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "jsx-1125685131" + " " + 'actual',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strike", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, this.state.price)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, this.state.offerPrice))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "calculator",
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "A",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, "A"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "E",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, "E"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "I",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, "I"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleClear,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, "C"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "K",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, "K"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "L",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, "L"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "N",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, "N"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleAdd,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, "+"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "O",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, "O"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "R",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, "R"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "T",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, "T"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleWhatsApp,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      }, "W"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        value: "V",
        onClick: this.handleButton,
        className: "jsx-1125685131" + " " + 'item',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, "V"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        onClick: this.handleEqual,
        className: "jsx-1125685131" + " " + 'item passive',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, '='), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "number",
        name: "mobile",
        placeholder: "Mobile Number",
        className: "jsx-1125685131",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
        styleId: "1125685131",
        css: "body{padding:0;margin:0;background-color:#272727;color:rgba(255,255,255,0.9);overflow:hidden;}#bill{height:30vh;padding:20px;border-bottom:1px solid rgba(255,255,255,0.5);display:grid;grid-template-rows:80% 20%;}.el{text-align:right;}.total{font-size:24px;color:rgba(255,255,255,0.3);}.price{font-size:32px;color:rgba(255,255,255,0.9);}.actual{padding-right:20px;}#calculator{height:70vh;padding:20px;display:grid;grid-template-columns:repeat(4,70px);grid-template-rows:repeat(4,70px);grid-gap:20px;}.item{font-size:24px;border:1px solid rgba(255,255,255,0.2);border-radius:50%;text-align:center;line-height:70px;height:70px;color:white;}.passive{background-color:rgba(255,255,255,0.1);}input{width:300px;font-size:22px;line-height:26px;padding:4px;border:none;background:rgba(255,255,255,0.1);color:white;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21lL2Rldi9ydWNoaS1zL3BhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVJMkIsQUFHdUIsQUFPRSxBQVFLLEFBR0YsQUFJQSxBQUlJLEFBR1AsQUFTRyxBQVMyQixBQUc5QixVQWpESCxFQU9JLEFBc0JBLEFBcUJFLEdBaENnQixBQUlBLEFBZ0JXLEVBdkI1QyxFQWQyQixBQXlCM0IsTUFsQm1ELEFBdUJwQyxFQW9CSSxXQW5CcUIsQ0FleEMsSUE1QkEsQUFJQSxDQXJCaUMsQUFrRG5CLFVBYk0sRUFjTixZQUN3QixHQTVDdkIsQ0FQRyxBQXFDRSxHQVBpQixTQXRCUixJQVA3QixFQXFDbUIsV0FjTCxNQWJBLEVBUkUsRUF0QmhCLEVBNENBLE1BYmMsSUFSZCxRQVNBIiwiZmlsZSI6Ii9ob21lL21lL2Rldi9ydWNoaS1zL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGZldGNoIGZyb20gJ2lzb21vcnBoaWMtZmV0Y2gnXG5pbXBvcnQgSGVhZCBmcm9tICcuLi9jb21wb25lbnRzL0hlYWQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2RlOiBbXSxcbiAgICAgIGJpbGw6IFtdLFxuICAgICAgdmFsdWU6IG51bGwsIC8vIHZhbHVlIGFzIHBlciB0aGUgY29kZVxuICAgICAgaW5jcmVtZW50OiAyMCwgLy8gYW1vdW50IHRvIGdpdmUgaW5cbiAgICAgIHByaWNlOiBudWxsLFxuICAgICAgZGlzY291bnQ6IDI1LFxuICAgICAgb2ZmZXJQcmljZTogbnVsbCxcbiAgICAgIG1vYmlsZTogbnVsbFxuICAgIH1cbiAgICB0aGlzLm1hcCA9IHtcbiAgICAgICdLJzogMSxcbiAgICAgICdFJzogMixcbiAgICAgICdMJzogMyxcbiAgICAgICdWJzogNCxcbiAgICAgICdJJzogNSxcbiAgICAgICdOJzogNixcbiAgICAgICdBJzogNyxcbiAgICAgICdUJzogOCxcbiAgICAgICdPJzogOSxcbiAgICAgICdSJzogMFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNvZGUgPSB0aGlzLmhhbmRsZUNvZGUuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlQnV0dG9uID0gdGhpcy5oYW5kbGVCdXR0b24uYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlQ2xlYXIgPSB0aGlzLmhhbmRsZUNsZWFyLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUFkZCA9IHRoaXMuaGFuZGxlQWRkLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUVxdWFsID0gdGhpcy5oYW5kbGVFcXVhbC5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVNb2JpbGUgPSB0aGlzLmhhbmRsZU1vYmlsZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVXaGF0c0FwcCA9IHRoaXMuaGFuZGxlV2hhdHNBcHAuYmluZCh0aGlzKVxuICB9XG5cbiAgY29udmVydCAoY29kZSkge1xuICAgIGxldCB2YWx1ZSA9IFtdXG4gICAgY29kZS5mb3JFYWNoKGMgPT4ge1xuICAgICAgdmFsdWUucHVzaCh0aGlzLm1hcFtjXSlcbiAgICB9KTtcbiAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlLmpvaW4oJycpKVxuICAgIHZhciBwcmljZSA9ICh2YWx1ZSAqICgxMDAgKyB0aGlzLnN0YXRlLmluY3JlbWVudCkgLyAxMDApLnRvRml4ZWQoMilcbiAgICB2YXIgb2ZmZXJQcmljZSA9IChwcmljZSAqICgxMDAgLSB0aGlzLnN0YXRlLmRpc2NvdW50KSAvIDEwMCkudG9GaXhlZCgyKVxuICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlLCBwcmljZSwgb2ZmZXJQcmljZX0pXG4gIH1cblxuICBoYW5kbGVDb2RlIChlKSB7XG4gICAgY29uc3QgY29kZSA9IGUudGFyZ2V0LnZhbHVlLnRvVXBwZXJDYXNlKCkuc3BsaXQoJycpXG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29kZX0pXG4gICAgdGhpcy5jb252ZXJ0KGNvZGUpXG4gIH1cblxuICBoYW5kbGVCdXR0b24gKGUpIHtcbiAgICBjb25zdCBjb2RlID0gdGhpcy5zdGF0ZS5jb2RlLmNvbmNhdChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpXG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29kZX0pXG4gICAgdGhpcy5jb252ZXJ0KGNvZGUpXG4gIH1cblxuICBoYW5kbGVDbGVhciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2RlOiBbXSxcbiAgICAgIHByaWNlOiBudWxsLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBvZmZlclByaWNlOiBudWxsLFxuICAgICAgYmlsbDogW11cbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlQWRkICgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUub2ZmZXJQcmljZSkgcmV0dXJuO1xuICAgIHZhciBiaWxsID0gdGhpcy5zdGF0ZS5iaWxsLmNvbmNhdChwYXJzZUludCh0aGlzLnN0YXRlLm9mZmVyUHJpY2UpKVxuICAgIGNvbnNvbGUubG9nKGJpbGwpXG4gICAgdGhpcy5zZXRTdGF0ZSh7YmlsbCwgY29kZTogW10sIHZhbHVlOiBudWxsLCBwcmljZTogbnVsbCwgb2ZmZXJQcmljZTogbnVsbH0pXG4gIH1cblxuICBoYW5kbGVFcXVhbCAoKSB7XG4gICAgdmFyIHN1bSA9IHRoaXMuc3RhdGUuYmlsbC5yZWR1Y2UoKGEsIGIpID0+IGErYiwgMClcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvZGU6IFtdLFxuICAgICAgcHJpY2U6IG51bGwsXG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIG9mZmVyUHJpY2U6IHN1bVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVNb2JpbGUgKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1vYmlsZTogZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlV2hhdHNBcHAgKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGBcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5iaWxsKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdtYWluJz5cbiAgICAgICAgPEhlYWQgLz5cbiAgICAgICAgPGRpdiBpZD0nYmlsbCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsIHRvdGFsJz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmJpbGwubWFwKGkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aX0+e2l9ICsgPC9zcGFuPlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZWwgcHJpY2UnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdhY3R1YWwnPjxzdHJpa2U+e3RoaXMuc3RhdGUucHJpY2V9PC9zdHJpa2U+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUub2ZmZXJQcmljZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPSdjYWxjdWxhdG9yJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J0EnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5BPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0nIHZhbHVlPSdFJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbn0+RTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpdGVtJyB2YWx1ZT0nSScgb25DbGljaz17dGhpcy5oYW5kbGVCdXR0b259Pkk8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbSBwYXNzaXZlJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsZWFyfT5DPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0nIHZhbHVlPSdLJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbn0+SzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpdGVtJyB2YWx1ZT0nTCcgb25DbGljaz17dGhpcy5oYW5kbGVCdXR0b259Pkw8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J04nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5OPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0gcGFzc2l2ZScgb25DbGljaz17dGhpcy5oYW5kbGVBZGR9Pis8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J08nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5PPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2l0ZW0nIHZhbHVlPSdSJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbn0+UjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpdGVtJyB2YWx1ZT0nVCcgb25DbGljaz17dGhpcy5oYW5kbGVCdXR0b259PlQ8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbSBwYXNzaXZlJyBvbkNsaWNrPXt0aGlzLmhhbmRsZVdoYXRzQXBwfT5XPC9kaXY+XG4gICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbScgdmFsdWU9J1YnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9ufT5WPC9kaXY+XG4gICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naXRlbSBwYXNzaXZlJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUVxdWFsfT57Jz0nfTwvZGl2PlxuICAgICAgICAgIDxkaXY+PGlucHV0IHR5cGU9J251bWJlcicgbmFtZT0nbW9iaWxlJyBwbGFjZWhvbGRlcj0nTW9iaWxlIE51bWJlcicgLz48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgICAgYm9keSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI3MjcyNztcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAjYmlsbCB7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwdmg7XG4gICAgICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcblxuICAgICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogODAlIDIwJTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLmVsIHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgICAudG90YWwge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLnByaWNlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5hY3R1YWwge1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgICAgICAgICB9XG4gICAgICAgICAgI2NhbGN1bGF0b3Ige1xuICAgICAgICAgICAgaGVpZ2h0OiA3MHZoO1xuICAgICAgICAgICAgcGFkZGluZzogMjBweDtcblxuICAgICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDcwcHgpO1xuICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNCwgNzBweCk7XG4gICAgICAgICAgICBncmlkLWdhcDogMjBweDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLml0ZW0ge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDcwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDcwcHg7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5wYXNzaXZlIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5wdXQge1xuICAgICAgICAgICAgd2lkdGg6IDMwMHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gICAgICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0iXX0= */\n/*@ sourceURL=/home/me/dev/ruchi-s/pages/index.js */",
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
//# sourceMappingURL=index.js.664e4042ff65e1ebc1ad.hot-update.js.map