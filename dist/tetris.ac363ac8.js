// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/preact/dist/preact.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = N;
exports.hydrate = O;
exports.h = exports.createElement = a;
exports.Fragment = y;
exports.createRef = h;
exports.Component = p;
exports.cloneElement = S;
exports.createContext = q;
exports.toChildArray = w;
exports.options = exports.isValidElement = void 0;
var n,
    l,
    u,
    i,
    t,
    r,
    o = {},
    f = [],
    e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
exports.isValidElement = l;
exports.options = n;

function c(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function s(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function a(n, l, u) {
  var i,
      t,
      r,
      o = arguments,
      f = {};

  for (r in l) "key" == r ? i = l[r] : "ref" == r ? t = l[r] : f[r] = l[r];

  if (arguments.length > 3) for (u = [u], r = 3; r < arguments.length; r++) u.push(o[r]);
  if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (r in n.defaultProps) void 0 === f[r] && (f[r] = n.defaultProps[r]);
  return v(n, f, i, t, null);
}

function v(l, u, i, t, r) {
  var o = {
    type: l,
    props: u,
    key: i,
    ref: t,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == r ? ++n.__v : r
  };
  return null != n.vnode && n.vnode(o), o;
}

function h() {
  return {
    current: null
  };
}

function y(n) {
  return n.children;
}

function p(n, l) {
  this.props = n, this.context = l;
}

function d(n, l) {
  if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? d(n) : null;
}

function _(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return _(n);
  }
}

function k(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !m.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(m);
}

function m() {
  for (var n; m.__r = u.length;) n = u.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }), u = [], n.some(function (n) {
    var l, u, i, t, r, o;
    n.__d && (r = (t = (l = n).__v).__e, (o = l.__P) && (u = [], (i = c({}, t)).__v = t.__v + 1, T(o, t, i, l.__n, void 0 !== o.ownerSVGElement, null != t.__h ? [r] : null, u, null == r ? d(t) : r, t.__h), j(u, t), t.__e != r && _(t)));
  });
}

function b(n, l, u, i, t, r, e, c, s, a) {
  var h,
      p,
      _,
      k,
      m,
      b,
      w,
      A = i && i.__k || f,
      P = A.length;

  for (u.__k = [], h = 0; h < l.length; h++) if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(y, {
    children: k
  }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
    if (k.__ = u, k.__b = u.__b + 1, null === (_ = A[h]) || _ && k.key == _.key && k.type === _.type) A[h] = void 0;else for (p = 0; p < P; p++) {
      if ((_ = A[p]) && k.key == _.key && k.type === _.type) {
        A[p] = void 0;
        break;
      }

      _ = null;
    }
    T(n, k, _ = _ || o, t, r, e, c, s, a), m = k.__e, (p = k.ref) && _.ref != p && (w || (w = []), _.ref && w.push(_.ref, null, k), w.push(p, k.__c || m, k)), null != m ? (null == b && (b = m), "function" == typeof k.type && null != k.__k && k.__k === _.__k ? k.__d = s = g(k, s, n) : s = x(n, k, _, A, m, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && _.__e == s && s.parentNode != n && (s = d(_));
  }

  for (u.__e = b, h = P; h--;) null != A[h] && ("function" == typeof u.type && null != A[h].__e && A[h].__e == u.__d && (u.__d = d(i, h + 1)), L(A[h], A[h]));

  if (w) for (h = 0; h < w.length; h++) I(w[h], w[++h], w[++h]);
}

function g(n, l, u) {
  var i, t;

  for (i = 0; i < n.__k.length; i++) (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? g(t, l, u) : x(u, t, t, n.__k, t.__e, l));

  return l;
}

function w(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    w(n, l);
  }) : l.push(n)), l;
}

function x(n, l, u, i, t, r) {
  var o, f, e;
  if (void 0 !== l.__d) o = l.__d, l.__d = void 0;else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;else {
    for (f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;

    n.insertBefore(t, r), o = r;
  }
  return void 0 !== o ? o : t.nextSibling;
}

function A(n, l, u, i, t) {
  var r;

  for (r in u) "children" === r || "key" === r || r in l || C(n, r, null, u[r], i);

  for (r in l) t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || C(n, r, l[r], u[r], i);
}

function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || e.test(l) ? u : u + "px";
}

function C(n, l, u, i, t) {
  var r;

  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || P(n.style, l, "");
      if (u) for (l in u) i && u[l] === i[l] || P(n.style, l, u[l]);
    }
  } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? H : $, r) : n.removeEventListener(l, r ? H : $, r);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}

function $(l) {
  this.l[l.type + !1](n.event ? n.event(l) : l);
}

function H(l) {
  this.l[l.type + !0](n.event ? n.event(l) : l);
}

function T(l, u, i, t, r, o, f, e, s) {
  var a,
      v,
      h,
      d,
      _,
      k,
      m,
      g,
      w,
      x,
      A,
      P = u.type;

  if (void 0 !== u.constructor) return null;
  null != i.__h && (s = i.__h, e = u.__e = i.__e, u.__h = null, o = [e]), (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (g = u.props, w = (a = P.contextType) && t[a.__c], x = a ? w ? w.props.value : a.__ : t, i.__c ? m = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new p(g, x), v.constructor = P, v.render = M), w && w.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = c({}, v.__s)), c(v.__s, P.getDerivedStateFromProps(g, v.__s))), d = v.props, _ = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== d && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v) {
          v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, v.__h.length && f.push(v);
          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
          v.componentDidUpdate(d, _, k);
        });
      }
      v.context = x, v.props = g, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (t = c(c({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (k = v.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === y && null == a.key ? a.props.children : a, b(l, Array.isArray(A) ? A : [A], u, i, t, r, o, f, e, s), v.base = u.__e, u.__h = null, v.__h.length && f.push(v), m && (v.__E = v.__ = null), v.__e = !1;
    } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = z(i.__e, u, i, t, r, o, f, s);

    (a = n.diffed) && a(u);
  } catch (l) {
    u.__v = null, (s || null != o) && (u.__e = e, u.__h = !!s, o[o.indexOf(e)] = null), n.__e(l, u, i);
  }
}

function j(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function z(n, l, u, i, t, r, e, c) {
  var a,
      v,
      h,
      y,
      p = u.props,
      d = l.props,
      _ = l.type,
      k = 0;
  if ("svg" === _ && (t = !0), null != r) for (; k < r.length; k++) if ((a = r[k]) && (a === n || (_ ? a.localName == _ : 3 == a.nodeType))) {
    n = a, r[k] = null;
    break;
  }

  if (null == n) {
    if (null === _) return document.createTextNode(d);
    n = t ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), r = null, c = !1;
  }

  if (null === _) p === d || c && n.data === d || (n.data = d);else {
    if (r = r && f.slice.call(n.childNodes), v = (p = u.props || o).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
      if (null != r) for (p = {}, y = 0; y < n.attributes.length; y++) p[n.attributes[y].name] = n.attributes[y].value;
      (h || v) && (h && (v && h.__html == v.__html || h.__html === n.innerHTML) || (n.innerHTML = h && h.__html || ""));
    }

    if (A(n, d, p, t, c), h) l.__k = [];else if (k = l.props.children, b(n, Array.isArray(k) ? k : [k], l, u, i, t && "foreignObject" !== _, r, e, n.firstChild, c), null != r) for (k = r.length; k--;) null != r[k] && s(r[k]);
    c || ("value" in d && void 0 !== (k = d.value) && (k !== n.value || "progress" === _ && !k) && C(n, "value", k, p.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== n.checked && C(n, "checked", k, p.checked, !1));
  }
  return n;
}

function I(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}

function L(l, u, i) {
  var t, r, o;

  if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || I(t, null, u)), i || "function" == typeof l.type || (i = null != (r = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    t.base = t.__P = null;
  }

  if (t = l.__k) for (o = 0; o < t.length; o++) t[o] && L(t[o], u, i);
  null != r && s(r);
}

function M(n, l, u) {
  return this.constructor(n, u);
}

function N(l, u, i) {
  var t, r, e;
  n.__ && n.__(l, u), r = (t = "function" == typeof i) ? null : i && i.__k || u.__k, e = [], T(u, l = (!t && i || u).__k = a(y, null, [l]), r || o, o, void 0 !== u.ownerSVGElement, !t && i ? [i] : r ? null : u.firstChild ? f.slice.call(u.childNodes) : null, e, !t && i ? i : r ? r.__e : u.firstChild, t), j(e, l);
}

function O(n, l) {
  N(n, l, O);
}

function S(n, l, u) {
  var i,
      t,
      r,
      o = arguments,
      f = c({}, n.props);

  for (r in l) "key" == r ? i = l[r] : "ref" == r ? t = l[r] : f[r] = l[r];

  if (arguments.length > 3) for (u = [u], r = 3; r < arguments.length; r++) u.push(o[r]);
  return null != u && (f.children = u), v(n.type, f, i || n.key, t || n.ref, null);
}

function q(n, l) {
  var u = {
    __c: l = "__cC" + r++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(k);
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}

exports.options = n = {
  __e: function (n, l) {
    for (var u, i, t; l = l.__;) if ((u = l.__c) && !u.__) try {
      if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
    } catch (l) {
      n = l;
    }

    throw n;
  },
  __v: 0
}, exports.isValidElement = l = function (n) {
  return null != n && void 0 === n.constructor;
}, p.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof n && (n = n(c({}, u), this.props)), n && c(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
}, p.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), k(this));
}, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, m.__r = 0, r = 0;
},{}],"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsxDEV = exports.jsxs = exports.jsx = o;
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function () {
    return _preact.Fragment;
  }
});

var _preact = require("preact");

function o(_, o, e, n, t) {
  var f = {};

  for (var l in o) "ref" != l && (f[l] = o[l]);

  var s,
      u,
      a = {
    type: _,
    props: f,
    key: e,
    ref: o && o.ref,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: ++_preact.options.__v,
    __source: n,
    __self: t
  };
  if ("function" == typeof _ && (s = _.defaultProps)) for (u in s) void 0 === f[u] && (f[u] = s[u]);
  return _preact.options.vnode && _preact.options.vnode(a), a;
}
},{"preact":"node_modules/preact/dist/preact.module.js"}],"src/possibleForms.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.possibleForms = void 0;
exports.possibleForms = [{
  id: 0,
  color: "light-blue",
  shape: [[1, 1, 1, 1]]
}, {
  id: 1,
  color: "purple",
  shape: [[0, 1, 0], [1, 1, 1]]
}, {
  id: 2,
  color: "green",
  shape: [[0, 1, 1], [1, 1, 0]]
}, {
  id: 3,
  color: "red",
  shape: [[1, 1, 0], [0, 1, 1]]
}, {
  id: 4,
  color: "yellow",
  shape: [[1, 1], [1, 1]]
}, {
  id: 5,
  color: "dark-blue",
  shape: [[1, 0, 0], [1, 1, 1]]
}, {
  id: 6,
  color: "orange",
  shape: [[0, 0, 1], [1, 1, 1]]
}];
},{}],"src/utils.tsx":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.times = exports.explodeText = exports.cloneDeep = exports.uniq = void 0;

var jsx_runtime_1 = require("preact/jsx-runtime");

function uniq(arr) {
  return __spread(new Set(arr));
}

exports.uniq = uniq;

function cloneDeep(o) {
  return JSON.parse(JSON.stringify(o));
}

exports.cloneDeep = cloneDeep;

function explodeText(text) {
  function inlineStyle(index) {
    return {
      animationDelay: "-" + index * 2 + "s"
    };
  }

  return text.split("").map(function (letter, index) {
    return jsx_runtime_1.jsx("span", __assign({
      class: "letter",
      style: inlineStyle(index)
    }, {
      children: letter
    }), void 0);
  });
}

exports.explodeText = explodeText;

function times(times, input) {
  var arr = [];

  for (var i = 0; i < times; i++) {
    arr.push(input);
  }

  return arr;
}

exports.times = times;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js"}],"src/block.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var _this = this;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockMethods = void 0;

var jsx_runtime_1 = require("preact/jsx-runtime");

var possibleForms_1 = require("./possibleForms");

var utils_1 = require("./utils");

var preact_1 = require("preact"); // wat ik moet doen is al deze methods exporteren en importeren in stage
// De state van deze blokken zijn dan ook props
// De methods staan dan wel op deze plek, en de parent voert ze uit


exports.blockMethods = {
  init: function init() {
    console.log('initing, jash', _this);
    var randomBlock = possibleForms_1.possibleForms[Math.floor(Math.random() * possibleForms_1.possibleForms.length)];
    return {
      color: randomBlock.color,
      shape: utils_1.cloneDeep(randomBlock.shape),
      x: 0,
      y: 0
    };
  },
  moveDown: function moveDown(state) {
    return state.y++;
  }
};

var Block =
/** @class */
function (_super) {
  __extends(Block, _super); // shape: Shape;
  // color: string;
  // x: number = 0;
  // y: number = 0;
  // id: number;
  // stage: Stage;


  function Block(props) {
    var _this = _super.call(this, props) || this;

    props.methods.init(); // const randomBlock =
    //   possibleForms[Math.floor(Math.random() * possibleForms.length)];
    // this.state = {
    //   color: randomBlock.color,
    //   shape: cloneDeep(randomBlock.shape),
    //   x: 0,
    //   y: 0,
    // };
    // this.renderTo = renderTo;
    // this.init(renderTo);

    return _this;
  }

  Block.prototype.init = function (renderTo) {// this.renderTo = renderTo;
    // let d3RenderTarget;
    // if (renderTo === "stage") {
    //   this.x = Math.floor((this.stage.gridWidth - this.shape[0].length) / 2);
    //   d3RenderTarget = this.stage.d3Stage;
    // } else if ((renderTo = "queue")) {
    //   this.x = (4 - this.shape[0].length) / 2; //align center
    //   // this.x = 4 - this.shape[0].length; //align right
    //   d3RenderTarget = this.stage.d3Queue;
    // }
    // if (this.d3Self) {
    //   this.d3Self.remove();
    // }
    // this.d3Self = d3RenderTarget
    //   .select("svg")
    //   .insert("g", this.stage.gridOverBlocks ? ".gridlines" : null)
    //   .attr("class", `block ${this.color}`);
    // this.draw();
  };

  Block.prototype.draw = function () {// this.d3Self.selectAll("rect").remove();
    // this.shape.map((y, yI) => {
    //   y.map((x, xI) => {
    //     if (x && y) {
    //       this.d3Self
    //         .append("rect")
    //         .attr("width", this.stage.blockSize)
    //         .attr("height", this.stage.blockSize)
    //         .attr("x", xI * this.stage.blockSize)
    //         .attr("y", yI * this.stage.blockSize)
    //         .attr("class", "atom");
    //     }
    //   });
    // });
    // this.updateGroupPosition();
  };

  Block.prototype.rotate = function () {// const originalShape = cloneDeep(this.shape);
    // const originalX = this.x;
    // const buildRotatedShape = (shape: Shape): Shape => {
    //   const columnCount = shape[0].length;
    //   const rowCount = shape.length;
    //   let newShape: Shape = [];
    //   for (let x = 0; x < columnCount; x++) {
    //     newShape.push([]);
    //   }
    //   for (let row = 0; row < rowCount; row++) {
    //     for (let column = 0; column < columnCount; column++) {
    //       newShape[column][row] = shape[row][column];
    //     }
    //   }
    //   newShape.forEach((row) => row.reverse());
    //   return newShape;
    // };
    // const amountOfAtomsThatWillRotateOutOfBounds = (shape: Shape): number => {
    //   return shape[0]
    //     .map((x, xIndex) => {
    //       return xIndex + this.x >= this.stage.gridWidth;
    //     })
    //     .reduce((acc, curr) => {
    //       return curr ? ++acc : acc;
    //     }, 0);
    // };
    // this.shape = buildRotatedShape(this.shape);
    // if (this.blockPositionIsValid) {
    //   return this.draw();
    // }
    // const offset = amountOfAtomsThatWillRotateOutOfBounds(this.shape);
    // this.moveX(-offset, true);
    // if (this.blockPositionIsValid) {
    //   return this.draw();
    // } else {
    //   //it doesn't fit even after offsetting, return to what it was.
    //   this.shape = originalShape;
    //   this.x = originalX;
    //   this.draw();
    // }
  };

  Object.defineProperty(Block.prototype, "blockPositionIsValid", {
    get: function get() {
      // return this.shape
      //   .map((row, rowIndex) => {
      //     return row.map((atom, columnIndex) => {
      //       if (!atom) return true;
      //       return (
      //         this.stage.internalGrid[this.y + rowIndex][this.x + columnIndex] ===
      //         0
      //       );
      //     });
      //   })
      //   .flat()
      //   .every((d) => d);
      return true;
    },
    enumerable: false,
    configurable: true
  });

  Block.prototype.clearRow = function (rowIndex) {// const targetShapeRowIndex = rowIndex - this.y;
    // const rowLength = this.shape[0].length;
    // this.shape.splice(targetShapeRowIndex, 1);
    // this.shape.unshift(new Array(rowLength).fill(0));
    // this.draw();
  };

  Block.prototype.moveDown = function () {// console.log('movedown method called within block component')
    // this.y++;
    // this.updateGroupPosition();
  };

  Block.prototype.moveX = function (x, bypassCollision) {
    if (bypassCollision === void 0) {
      bypassCollision = false;
    } // if (!bypassCollision) {
    //   if (
    //     this.x + x + this.shape[0].length > this.stage.gridWidth ||
    //     this.x + x < 0
    //   ) {
    //     return; //block moves out of bounds
    //   }
    // }
    // this.x = this.x + x;
    // this.updateGroupPosition();

  };

  Block.prototype.updateGroupPosition = function () {// const scale = this.renderTo === "queue" ? this.stage.queueScaleFactor : 1;
    // this.d3Self.attr(
    //   "transform",
    //   `translate(${this.x * this.stage.blockSize * scale}, ${
    //     this.y * this.stage.blockSize * scale
    //   }) scale(${scale})`
    // );
  };

  Block.prototype.render = function (props) {
    return jsx_runtime_1.jsx("svg", {
      children: jsx_runtime_1.jsx("g", __assign({
        class: "block " + props.color
      }, {
        children: props.shape.map(function (y, yI) {
          return y.map(function (x, xI) {
            if (x && y) {
              return jsx_runtime_1.jsx("rect", {
                class: "atom",
                width: props.settings.blockSize,
                height: props.settings.blockSize,
                x: xI * props.settings.blockSize,
                y: yI * props.settings.blockSize
              }, void 0);
            }
          });
        })
      }), void 0)
    }, void 0); //   .insert("g", this.stage.gridOverBlocks ? ".gridlines" : null)
    //   .attr("class", `block ${this.color}`);
    // this.d3Self.selectAll("rect").remove();
    // this.shape.map((y, yI) => {
    //   y.map((x, xI) => {
    //     if (x && y) {
    //       this.d3Self
    //         .append("rect")
    //         .attr("width", this.stage.blockSize)
    //         .attr("height", this.stage.blockSize)
    //         .attr("x", xI * this.stage.blockSize)
    //         .attr("y", yI * this.stage.blockSize)
    //         .attr("class", "atom");
    //     }
    //   });
    // });
  };

  return Block;
}(preact_1.Component);

exports.default = Block;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","./possibleForms":"src/possibleForms.ts","./utils":"src/utils.tsx","preact":"node_modules/preact/dist/preact.module.js"}],"src/controls/controls.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controls = void 0;
exports.controls = {
  splash: {
    continue: null
  },
  playing: {
    right: null,
    left: null,
    down: null,
    instaFall: null,
    rotate: null
  },
  gameOver: {}
};

function setControls(state, stateControls) {
  exports.controls[state] = stateControls; // setTimeout(() => {
  //   controls.splash.continue();
  // }, 1000);
}

exports.default = setControls;
},{}],"src/GridLines.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_runtime_1 = require("preact/jsx-runtime");

var preact_1 = require("preact");

var GridLines =
/** @class */
function (_super) {
  __extends(GridLines, _super);

  function GridLines() {
    return _super.call(this) || this;
  } // const argumentedSettings = { ...defaultGameSettings, settings };
  // const { width, blockSize, height } = { augumentedSettings };
  // const { width, blockSize, height, gridGutterSize } = {
  //   ...defaultGameSettings,
  //   ...settings,
  // };


  GridLines.prototype.render = function (props) {
    var _a = __assign({}, props.settings),
        width = _a.width,
        blockSize = _a.blockSize,
        height = _a.height,
        gridGutterSize = _a.gridGutterSize;

    return jsx_runtime_1.jsxs("g", __assign({
      class: "gridlines",
      width: width * blockSize,
      height: height * blockSize,
      style: {
        strokeWidth: gridGutterSize / 10 + "rem"
      },
      viewBox: "0 0 " + width * blockSize + " " + height * blockSize
    }, {
      children: [jsx_runtime_1.jsx("g", __assign({
        class: "rows"
      }, {
        children: new Array(height + 1).fill("").map(function (d, i) {
          return jsx_runtime_1.jsx("line", {
            x1: "0",
            x2: width * blockSize,
            y1: i * blockSize,
            y2: i * blockSize
          }, void 0);
        })
      }), void 0), jsx_runtime_1.jsx("g", __assign({
        class: "columns"
      }, {
        children: new Array(width + 1).fill("").map(function (d, i) {
          return jsx_runtime_1.jsx("line", {
            y1: "0",
            y2: height * blockSize,
            x1: i * blockSize,
            x2: i * blockSize
          }, void 0);
        })
      }), void 0)]
    }), void 0);
  };

  return GridLines;
}(preact_1.Component);

exports.default = GridLines;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","preact":"node_modules/preact/dist/preact.module.js"}],"src/stage.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_runtime_1 = require("preact/jsx-runtime");

var block_1 = __importStar(require("./block"));

var controls_1 = __importDefault(require("./controls/controls"));

var preact_1 = require("preact");

var GridLines_1 = __importDefault(require("./GridLines"));

var Stage =
/** @class */
function (_super) {
  __extends(Stage, _super);

  function Stage(props) {
    var _this = _super.call(this, props) || this;

    _this.createNewBlock = function () {// this.setState((prevState) => ({
      //   blockIndex: prevState.blockIndex + 1,
      //   queue: [new Block(prevState.blockIndex + 1, this, 'queue')],
      //   activeBlock: prevState.queue[0],
      // }));
      // console.log(this.state)
      // this.state.activeBlock.init('stage') //probably not the correct way to do it
    };

    _this.state = {
      internalGrid: null,
      activeBlock: {
        id: 2,
        stage: _this,
        color: null,
        shape: null,
        settings: props.settings,
        x: 0,
        y: 0,
        methods: block_1.blockMethods // <Block settings={props.settings} stage={this} id={2} />

      },
      settledBlocks: [],
      queue: [],
      blockIndex: 1,
      isGameOver: false,
      tickInterval: window.setInterval(function () {
        _this.tick();
      }, 1000),
      clearedLines: 0
    }; // this.initUI();

    _this.initializeInternalGrid();

    controls_1.default("playing", {
      right: _this.controls.right,
      left: _this.controls.left,
      down: _this.controls.down,
      instaFall: _this.controls.instaFall,
      rotate: _this.controls.rotate
    });
    document.documentElement.style.setProperty("--stage-height", props.settings.height * props.settings.blockSize / 10 + "rem");
    document.documentElement.style.setProperty("--stage-width", props.settings.width * props.settings.blockSize / 10 + "rem");
    return _this; // this.createNewBlock(); //once for the queue
    // this.createNewBlock(); //once for the stage
  }

  Stage.prototype.initializeInternalGrid = function () {
    var grid = [];

    for (var y = 0; y < this.props.settings.height; y++) {
      grid.push([]);

      for (var x = 0; x < this.props.settings.width; x++) {
        grid[y][x] = 0;
      }
    }

    this.setState({
      internalGrid: grid
    });
  };

  Object.defineProperty(Stage.prototype, "controls", {
    get: function get() {
      var _this = this;

      return {
        left: function left() {
          // if (!this.blockWillCollideXOnNextTick(this.state.activeBlock, -1)) {
          //   this.state.activeBlock.moveX(-1);
          return "left"; // }
        },
        right: function right() {
          // if (!this.blockWillCollideXOnNextTick(this.state.activeBlock, 1)) {
          //   this.state.activeBlock.moveX(1);
          return "right"; // }
        },
        down: function down() {
          console.log('down, from within stage');
          console.log(_this.state.activeBlock); // this.tick();

          return "down";
        },
        instaFall: function instaFall() {
          // while (!this.blockWillCollideYOnNextTick(this.state.activeBlock)) {
          //   this.state.activeBlock.moveDown();
          // }
          // clearInterval(this.state.tickInterval);
          // this.setState({tickInterval: window.setInterval(() => {
          //   this.tick();
          // }, 1000)})
          // this.finishBlock(this.state.activeBlock);
          return "instaFall";
        },
        rotate: function rotate() {
          // this.state.activeBlock.rotate();
          return "rotate";
        }
      };
    },
    enumerable: false,
    configurable: true
  });

  Stage.prototype.tick = function () {
    if (this.state.isGameOver) {
      // this.beforeDestroy();
      this.props.game.setGameState("gameOver");
      return;
    } // if (this.blockWillCollideYOnNextTick(this.state.activeBlock)) {
    //   this.finishBlock(this.state.activeBlock);
    // } else {
    // console.log(this.state.activeBlock)
    // this.state.activeBlock.moveDown();
    // this.state.activeBlock.props.methods.down()
    // }

  };

  Stage.prototype.finishBlock = function (block) {// if (this.isGameOver) {
    //   this.beforeDestroy();
    //   return this.game.setGameState("gameOver");
    // }
    // this.settledBlocks.push(block);
    // this.placeBlockInGrid(block);
    // this.activeBlock = this.queue.pop();
    // this.activeBlock.init("stage");
    // this.queue.push(new Block(++this.blockIndex, this, "queue"));
    // //if the block spawned invalidly, instant game over
    // if (!this.activeBlock.blockPositionIsValid) {
    //   this.isGameOver = true;
    //   this.beforeDestroy();
    //   return this.game.setGameState("gameOver");
    // }
    // this.completedRows.map((rowIndex) => {
    //   this.clearedLines++;
    //   this.updateScoreUI();
    //   const uniqueBlockIdsInRow = uniq(this.internalGrid[rowIndex]);
    //   const blocksIdsThatShouldFall = uniq(
    //     this.internalGrid
    //       .filter((row, i) => i < rowIndex) //
    //       .flat()
    //       .filter((cell) => cell > 0)
    //       .filter((gridCel) => !uniqueBlockIdsInRow.includes(gridCel))
    //   );
    //   this.settledBlocks
    //     .filter((settledBlock) => uniqueBlockIdsInRow.includes(settledBlock.id))
    //     .forEach((blockWithClearedRow) =>
    //       blockWithClearedRow.clearRow(rowIndex)
    //     );
    //   blocksIdsThatShouldFall.forEach((blockId: number) =>
    //     this.settledBlocks[blockId - 1].moveDown()
    //   );
    //   this.internalGrid.splice(rowIndex, 1);
    //   this.internalGrid.unshift(new Array(this.gridWidth).fill(0));
    // });
  };

  Stage.prototype.updateScoreUI = function () {// this.d3UI.select(".score .value").text(this.score);
  };

  Stage.prototype.placeBlockInGrid = function (block) {// block.shape.map((y, yIndex) => {
    //   y.map((x, xIndex) => {
    //     if (x && y) {
    //       this.internalGrid[yIndex + block.y][xIndex + block.x] = block.id;
    //     }
    //   });
    // });
  };

  Stage.prototype.blockWillCollideYOnNextTick = function (block) {
    // return block.shape
    //   .map((row, rowIndex) => {
    //     return row.map((atom, columnIndex) => {
    //       if (!atom) return false; //Empty atom in this slot
    //       if (block.y + rowIndex + 1 >= this.gridHeight) {
    //         return true; //Block reached bottom of stage
    //       }
    //       return (
    //         //returns the value of the target spot in the internal grid for the atom
    //         this.internalGrid[block.y + rowIndex + 1] &&
    //         this.internalGrid[block.y + rowIndex + 1][block.x + columnIndex]
    //       );
    //     });
    //   })
    //   .flat()
    //   .some((d) => d);
    return false;
  };

  Stage.prototype.blockWillCollideXOnNextTick = function (block, dir) {
    // return block.shape
    //   .map((row, rowIndex) => {
    //     return row.map((atom, columnIndex) => {
    //       if (!atom) return false;
    //       return (
    //         //returns the value of the target spot in the internal grid for the atom
    //         this.internalGrid[block.y + rowIndex] &&
    //         this.internalGrid[block.y + rowIndex][block.x + columnIndex + dir]
    //       );
    //     });
    //   })
    //   .flat()
    //   .some((d) => d);
    return false;
  };

  Object.defineProperty(Stage.prototype, "completedRows", {
    get: function get() {
      // return this.internalGrid.reduce((acc, row, rowIndex) => {
      //   if (row.every((d) => d)) {
      //     acc.push(rowIndex);
      //   }
      //   return acc;
      // }, []);  
      return [1];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Stage.prototype, "score", {
    get: function get() {
      return 1; // return this.clearedLines;
    },
    enumerable: false,
    configurable: true
  });

  Stage.prototype.initUI = function () {// this.d3Stage = selectAll("body").append("div").attr("class", "stage");
    // this.d3Stage
    //   .append("svg")
    //   .attr(
    //     "style",
    //     `width: ${(this.gridWidth * this.blockSize) / 10}rem; height: ${
    //       (this.gridHeight * this.blockSize) / 10
    //     }rem`
    //   );
    // this.d3UI = select("body").append("div").attr("class", "ui");
    // const queue = this.d3UI.append("div").attr("class", "queue ui-block");
    // queue.append("div").attr("class", "label").text("Next");
    // queue
    //   .append("div")
    //   .attr("class", "value")
    //   .append("svg")
    //   // .attr('viewbox', "0 0 100 100")
    //   // .attr('perserveAspectRatio', true)
    //   .attr("width", this.blockSize * 4 * this.queueScaleFactor)
    //   .attr("height", this.blockSize * 2 * this.queueScaleFactor);
    // this.d3Queue = queue;
    // const score = this.d3UI.append("div").attr("class", "score ui-block");
    // score.append("div").attr("class", "label").text("Lines");
    // score.append("div").attr("class", "value").text(this.score);
    // const highScore = this.d3UI
    //   .append("div")
    //   .attr("class", "highscore ui-block");
    // highScore.append("div").attr("class", "label").text("Highscore");
    // highScore
    //   .append("div")
    //   .attr("class", "value")
    //   .text(HighScores.getLocalHighScore()?.score || 0);
    // this.updateScoreUI();
  };

  Stage.prototype.render = function (props, state) {
    return jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, {
      children: [jsx_runtime_1.jsx("div", __assign({
        class: "stage"
      }, {
        children: jsx_runtime_1.jsxs("svg", __assign({
          class: "plx",
          style: {
            width: props.settings.width * props.settings.blockSize / 10 + "rem",
            height: props.settings.height * props.settings.blockSize / 10 + "rem"
          }
        }, {
          children: [jsx_runtime_1.jsx(block_1.default, __assign({}, this.state.activeBlock), void 0), jsx_runtime_1.jsx(GridLines_1.default, {
            settings: props.settings
          }, void 0)]
        }), void 0)
      }), void 0), jsx_runtime_1.jsx("div", {
        class: "ui"
      }, void 0)]
    }, void 0);
  };

  Stage.prototype.beforeDestroy = function () {// this.d3Stage.attr("class", "stage is-game-over");
    // clearInterval(this.tickInterval);
  };

  return Stage;
}(preact_1.Component);

exports.default = Stage;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","./block":"src/block.tsx","./controls/controls":"src/controls/controls.ts","preact":"node_modules/preact/dist/preact.module.js","./GridLines":"src/GridLines.tsx"}],"src/animations.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  fadeIn: [[{
    opacity: 0
  }, {
    opacity: 1
  }], {
    duration: 400,
    easing: "steps(4, end)"
  }],
  fadeOut: [[{
    opacity: 1
  }, {
    opacity: 0
  }], {
    duration: 400,
    easing: "steps(4, end)"
  }],
  boop: [[{
    transform: 'scale(1)'
  }, {
    transform: 'scale(1.3)'
  }, {
    transform: 'scale(1)'
  }], {
    duration: 100,
    easing: "steps(3, end)"
  }]
};
},{}],"src/states/splash.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_runtime_1 = require("preact/jsx-runtime");

var preact_1 = require("preact");

var utils_1 = require("../utils");

var animations_1 = __importDefault(require("../animations"));

var controls_1 = __importDefault(require("./../controls/controls"));

var Splash =
/** @class */
function (_super) {
  __extends(Splash, _super);

  function Splash() {
    var _this = _super.call(this) || this;

    controls_1.default('splash', {
      continue: _this.continue.bind(_this)
    });
    return _this;
  }

  Splash.prototype.continue = function () {
    var _a;

    var _this = this;

    var animation = (_a = document.querySelector(".splash")). //todo: use ref instead
    animate.apply(_a, __spread(animations_1.default.fadeOut));

    animation.onfinish = function () {
      document.querySelector(".splash").remove(); //can be better

      _this.props.game.setGameState("playing");
    };
  };

  Splash.prototype.render = function (props, state) {
    return jsx_runtime_1.jsxs("div", __assign({
      class: "splash"
    }, {
      children: [jsx_runtime_1.jsx("div", __assign({
        class: "title"
      }, {
        children: "Tetris"
      }), void 0), jsx_runtime_1.jsx("div", __assign({
        class: "subtitle"
      }, {
        children: "By Berend"
      }), void 0), jsx_runtime_1.jsx("div", __assign({
        class: "begin"
      }, {
        children: props.game.isDesktop ? utils_1.explodeText("Press space to start") : utils_1.explodeText("Touch here to start")
      }), void 0), jsx_runtime_1.jsxs("div", __assign({
        class: "social-container"
      }, {
        children: [jsx_runtime_1.jsx("a", __assign({
          href: "https://github.com/Berenddeperend/tetris",
          target: "_blank"
        }, {
          children: "Github"
        }), void 0), jsx_runtime_1.jsxs("span", {
          children: ["version ", undefined]
        }, void 0)]
      }), void 0)]
    }), void 0);
  };

  return Splash;
}(preact_1.Component);

exports.default = Splash;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","preact":"node_modules/preact/dist/preact.module.js","../utils":"src/utils.tsx","../animations":"src/animations.ts","./../controls/controls":"src/controls/controls.ts"}],"src/inputName.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_runtime_1 = require("preact/jsx-runtime");

var preact_1 = require("preact");

var lastUsedNickname = window.localStorage.getItem("lastUsedNickname");

var InputName =
/** @class */
function (_super) {
  __extends(InputName, _super);

  function InputName() {
    var _this = _super.call(this) || this;

    _this.ref = preact_1.createRef();

    _this.setNickName = function (e) {
      _this.setState({
        nickName: e.target.value
      });

      _this.props.onNameChange(e);

      window.localStorage.setItem("lastUsedNickname", e.target.value);
    };

    _this.state = {
      nickName: lastUsedNickname
    };
    return _this;
  }

  InputName.prototype.componentDidMount = function () {
    this.ref.current.focus();
  };

  InputName.prototype.render = function () {
    return jsx_runtime_1.jsx("input", {
      maxLength: 6,
      ref: this.ref,
      type: "text",
      value: this.state.nickName,
      class: "input-name",
      spellcheck: false,
      onInput: this.setNickName
    }, void 0);
  };

  return InputName;
}(preact_1.Component);

exports.default = InputName;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","preact":"node_modules/preact/dist/preact.module.js"}],"src/highScores.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_runtime_1 = require("preact/jsx-runtime"); // import { html, render, PreactNode } from "./dom";


var preact_1 = require("preact");

var animations_1 = __importDefault(require("./animations"));

var inputName_1 = __importDefault(require("./inputName"));

var HighScores =
/** @class */
function () {
  function HighScores(newScore) {
    var _a;

    this.highScores = this.getAllLocalHighScores();
    this.newHighScore = newScore;
    var self = this; //blegh

    var newScoreId = this.getAllLocalHighScores().length + 1;
    this.newHighScore.id = newScoreId;
    this.setScore(__assign(__assign({}, newScore), {
      id: newScoreId
    }));
    this.removeDeprecatedHighScores();

    var Entries =
    /** @class */
    function (_super) {
      __extends(Entries, _super);

      function Entries() {
        var _this = _super.call(this) || this;

        _this.render = function () {
          return self.getAllLocalHighScores().filter(function (highScore, index) {
            return index < _this.state.limit;
          }).map(function (highScore, index) {
            return jsx_runtime_1.jsxs("tr", __assign({
              class: highScore.id === newScoreId ? "current" : null
            }, {
              children: [jsx_runtime_1.jsx("td", __assign({
                class: "rank"
              }, {
                children: index + 1
              }), void 0), jsx_runtime_1.jsx("td", __assign({
                class: "name"
              }, {
                children: highScore.id === newScoreId ? jsx_runtime_1.jsx(inputName_1.default, {
                  onNameChange: self.onNameChanged.bind(self)
                }, void 0) : highScore === null || highScore === void 0 ? void 0 : highScore.name
              }), void 0), jsx_runtime_1.jsx("td", __assign({
                class: "score"
              }, {
                children: highScore.score
              }), void 0)]
            }), void 0);
          });
        };

        _this.state = {
          limit: 5
        };
        return _this;
      }

      return Entries;
    }(preact_1.Component);

    var Placeholders = function Placeholders() {
      return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, {
        children: new Array(4).fill("").map(function () {
          return jsx_runtime_1.jsxs("tr", __assign({
            class: "placeholder"
          }, {
            children: [jsx_runtime_1.jsx("td", __assign({
              class: "rank"
            }, {
              children: "-"
            }), void 0), jsx_runtime_1.jsx("td", __assign({
              class: "name"
            }, {
              children: "-"
            }), void 0), jsx_runtime_1.jsx("td", __assign({
              class: "score"
            }, {
              children: "-"
            }), void 0)]
          }), void 0);
        })
      }, void 0);
    };

    var html = jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, {
      children: [jsx_runtime_1.jsx("h3", __assign({
        class: "highscore-title"
      }, {
        children: "Highscores"
      }), void 0), jsx_runtime_1.jsx("div", __assign({
        class: "highscore-table-container"
      }, {
        children: jsx_runtime_1.jsx("table", __assign({
          class: "highscore-table"
        }, {
          children: jsx_runtime_1.jsxs("tbody", {
            children: [jsx_runtime_1.jsx(Entries, {}, void 0), jsx_runtime_1.jsx(Placeholders, {}, void 0)]
          }, void 0)
        }), void 0)
      }), void 0)]
    }, void 0);
    preact_1.render(html, document.querySelector(".highscore-list"));

    (_a = document.querySelector(".highscore-list")).animate.apply(_a, __spread(animations_1.default.fadeIn));
  }

  HighScores.prototype.onNameChanged = function (e) {
    this.newHighScore.name = e.target.value;
    this.removeHighScoreById(this.newHighScore.id);
    this.setScore(this.newHighScore);
  };

  HighScores.prototype.removeDeprecatedHighScores = function () {
    var newHighScores = this.getAllLocalHighScores().filter(function (score) {
      return score.hasOwnProperty('v');
    });
    window.localStorage.setItem("highScore", JSON.stringify(newHighScores));
  };

  HighScores.prototype.removeHighScoreById = function (id) {
    var newHighScores = this.getAllLocalHighScores().filter(function (score) {
      return score.id !== id;
    });
    window.localStorage.setItem("highScore", JSON.stringify(newHighScores));
  };

  HighScores.prototype.setScore = function (highScore) {
    var prevScores = JSON.parse(window.localStorage.getItem("highScore"));
    var newScores = prevScores ? __spread(prevScores, [highScore]).sort(function (a, b) {
      return b.score - a.score;
    }) : [highScore];
    window.localStorage.setItem("highScore", JSON.stringify(newScores));
  };

  HighScores.prototype.getAllLocalHighScores = function () {
    var scores = JSON.parse(window.localStorage.getItem("highScore"));
    return scores ? JSON.parse(window.localStorage.getItem("highScore")) : [];
  };

  HighScores.getLocalHighScore = function () {
    var scores = JSON.parse(window.localStorage.getItem("highScore"));
    return scores ? JSON.parse(window.localStorage.getItem("highScore"))[0] : null;
  };

  return HighScores;
}();

exports.default = HighScores;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","preact":"node_modules/preact/dist/preact.module.js","./animations":"src/animations.ts","./inputName":"src/inputName.tsx"}],"src/states/gameOver.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_runtime_1 = require("preact/jsx-runtime");

var highScores_1 = __importDefault(require("../highScores"));

var preact_1 = require("preact");

var utils_1 = require("../utils");

var animations_1 = __importDefault(require("../animations"));

var GameOver =
/** @class */
function (_super) {
  __extends(GameOver, _super);

  function GameOver(game) {
    var _this = _super.call(this) || this;

    _this.game = game;
    return _this;
  }

  GameOver.prototype.componentDidMount = function () {
    var _this = this;

    var gameOverContainer = document.querySelector(".game-over-container");
    gameOverContainer.animate.apply(gameOverContainer, __spread(animations_1.default.fadeIn));
    window.setTimeout(function () {
      var animation = gameOverContainer.animate.apply(gameOverContainer, __spread(animations_1.default.fadeOut));

      animation.onfinish = function () {
        var _a, _b;

        gameOverContainer.remove();
        new highScores_1.default({
          score: (_b = (_a = _this.game) === null || _a === void 0 ? void 0 : _a.stage) === null || _b === void 0 ? void 0 : _b.score,
          name: window.localStorage.getItem("lastUsedNickname"),
          date: new Date(),
          v: undefined
        });
      };
    }, 2000);
  };

  GameOver.prototype.render = function () {
    return jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, {
      children: [jsx_runtime_1.jsx("div", __assign({
        class: "game-over-container"
      }, {
        children: jsx_runtime_1.jsx("div", __assign({
          class: "game-over"
        }, {
          children: utils_1.explodeText("game over")
        }), void 0)
      }), void 0), jsx_runtime_1.jsx("div", {
        class: "highscore-list"
      }, void 0)]
    }, void 0);
  };

  Object.defineProperty(GameOver.prototype, "controls", {
    get: function get() {
      var _this = this;

      return {
        retry: function retry() {
          document.querySelector(".stage").remove(); //not sure if this works yet.

          document.querySelector(".game-over").remove(); //not sure if this works yet.

          document.querySelector(".ui").remove(); //not sure if this works yet.

          _this.game.setGameState("playing");
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  return GameOver;
}(preact_1.Component);

exports.default = GameOver;
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","../highScores":"src/highScores.tsx","preact":"node_modules/preact/dist/preact.module.js","../utils":"src/utils.tsx","../animations":"src/animations.ts"}],"src/controls/keyboardControls.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var controls_1 = require("./controls");

var KeyboardControls =
/** @class */
function () {
  function KeyboardControls(game) {
    this.onKeyDown = function (e) {
      if (game.state.gameState === "playing") {
        switch (e.code) {
          case "ArrowRight":
            // return game.stage.controls.right();
            return controls_1.controls.playing.right();

          case "ArrowLeft":
            // return game.stage.controls.left();
            return controls_1.controls.playing.left();

          case "ArrowDown":
            // return game.stage.controls.down();
            return controls_1.controls.playing.down();

          case "ArrowUp":
            // return game.stage.controls.instaFall();
            return controls_1.controls.playing.instaFall();

          case "Space":
            // return game.stage.controls.rotate();
            return controls_1.controls.playing.rotate();
        }
      } else if (game.state.gameState === "splash") {
        switch (e.code) {
          case "Space":
            return controls_1.controls.splash.continue();
        }
      } else if (game.state.gameState === "gameOver") {
        switch (e.code) {
          case "Space": // return game.gameOver.controls.retry();

        }
      }
    };

    this.init();
  }

  KeyboardControls.prototype.init = function () {
    document.addEventListener("keydown", this.onKeyDown);
  };

  KeyboardControls.prototype.destroy = function () {
    document.removeEventListener("keydown", this.onKeyDown);
  };

  return KeyboardControls;
}();

exports.default = KeyboardControls;
},{"./controls":"src/controls/controls.ts"}],"src/controls/touchControls.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TouchControls =
/** @class */
function () {
  function TouchControls(game) {
    var _this = this;

    this.onTap = function (e) {
      e.preventDefault();

      if (_this.game.gameState === "splash") {
        _this.game.splash.controls.continue();
      }

      if (_this.game.gameState === "gameOver") {// this.game.gameOver.controls.retry();
      }

      if (_this.game.gameState === "playing") {
        if (_this.interval) {
          clearInterval(_this.interval);
        }

        var action = function action() {
          var x = e.touches[e.touches.length - 1].clientX;
          var y = e.touches[e.touches.length - 1].clientY;
          var xPercentage = Math.round(x) / _this.deviceWidth * 100;
          var yPercentage = Math.round(y) / _this.deviceHeight * 100;

          if (yPercentage > 80) {
            return _this.game.stage.controls.down();
          }

          if (xPercentage < 25) {
            return _this.game.stage.controls.left();
          }

          if (xPercentage > 75) {
            return _this.game.stage.controls.right();
          }

          var activeBlockTapped = _this.game.stage.activeBlock.d3Self.node().contains(e.target);

          if (activeBlockTapped) {
            return _this.game.stage.controls.rotate();
          } // return this.game.stage.controls.rotate();

        };

        var executedAction = action();

        if (["left", "right", "down"].includes(executedAction)) {
          _this.interval = window.setInterval(action, 80);
        }
      }
    };

    this.onTapRelease = function (e) {
      clearInterval(_this.interval);
    };

    this.deviceWidth = document.querySelector("body").clientWidth;
    this.deviceHeight = document.querySelector("body").clientHeight;
    this.game = game;
    this.init();
  }

  TouchControls.prototype.init = function () {
    document.addEventListener("touchstart", this.onTap);
    document.addEventListener("touchend", this.onTapRelease);
  };

  TouchControls.prototype.destroy = function () {
    document.removeEventListener("touchstart", this.onTap);
  };

  return TouchControls;
}();

exports.default = TouchControls;
},{}],"node_modules/hammerjs/hammer.js":[function(require,module,exports) {
var define;
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function (window, document, exportName, undefined) {
  'use strict';

  var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
  var TEST_ELEMENT = document.createElement('div');
  var TYPE_FUNCTION = 'function';
  var round = Math.round;
  var abs = Math.abs;
  var now = Date.now;
  /**
   * set a timeout with a given scope
   * @param {Function} fn
   * @param {Number} timeout
   * @param {Object} context
   * @returns {number}
   */

  function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
  }
  /**
   * if the argument is an array, we want to execute the fn on each entry
   * if it aint an array we don't want to do a thing.
   * this is used by all the methods that accept a single and array argument.
   * @param {*|Array} arg
   * @param {String} fn
   * @param {Object} [context]
   * @returns {Boolean}
   */


  function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
      each(arg, context[fn], context);
      return true;
    }

    return false;
  }
  /**
   * walk objects and arrays
   * @param {Object} obj
   * @param {Function} iterator
   * @param {Object} context
   */


  function each(obj, iterator, context) {
    var i;

    if (!obj) {
      return;
    }

    if (obj.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
      i = 0;

      while (i < obj.length) {
        iterator.call(context, obj[i], i, obj);
        i++;
      }
    } else {
      for (i in obj) {
        obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
      }
    }
  }
  /**
   * wrap a method with a deprecation warning and stack trace
   * @param {Function} method
   * @param {String} name
   * @param {String} message
   * @returns {Function} A new function wrapping the supplied method.
   */


  function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function () {
      var e = new Error('get-stack-trace');
      var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
      var log = window.console && (window.console.warn || window.console.log);

      if (log) {
        log.call(window.console, deprecationMessage, stack);
      }

      return method.apply(this, arguments);
    };
  }
  /**
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} target
   * @param {...Object} objects_to_assign
   * @returns {Object} target
   */


  var assign;

  if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];

        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }

      return output;
    };
  } else {
    assign = Object.assign;
  }
  /**
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} dest
   * @param {Object} src
   * @param {Boolean} [merge=false]
   * @returns {Object} dest
   */


  var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;

    while (i < keys.length) {
      if (!merge || merge && dest[keys[i]] === undefined) {
        dest[keys[i]] = src[keys[i]];
      }

      i++;
    }

    return dest;
  }, 'extend', 'Use `assign`.');
  /**
   * merge the values from src in the dest.
   * means that properties that exist in dest will not be overwritten by src
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} dest
   */

  var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
  }, 'merge', 'Use `assign`.');
  /**
   * simple class inheritance
   * @param {Function} child
   * @param {Function} base
   * @param {Object} [properties]
   */

  function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;
    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
      assign(childP, properties);
    }
  }
  /**
   * simple function bind
   * @param {Function} fn
   * @param {Object} context
   * @returns {Function}
   */


  function bindFn(fn, context) {
    return function boundFn() {
      return fn.apply(context, arguments);
    };
  }
  /**
   * let a boolean value also be a function that must return a boolean
   * this first item in args will be used as the context
   * @param {Boolean|Function} val
   * @param {Array} [args]
   * @returns {Boolean}
   */


  function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
      return val.apply(args ? args[0] || undefined : undefined, args);
    }

    return val;
  }
  /**
   * use the val2 when val1 is undefined
   * @param {*} val1
   * @param {*} val2
   * @returns {*}
   */


  function ifUndefined(val1, val2) {
    return val1 === undefined ? val2 : val1;
  }
  /**
   * addEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function addEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.addEventListener(type, handler, false);
    });
  }
  /**
   * removeEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function removeEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.removeEventListener(type, handler, false);
    });
  }
  /**
   * find if a node is in the given parent
   * @method hasParent
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @return {Boolean} found
   */


  function hasParent(node, parent) {
    while (node) {
      if (node == parent) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  }
  /**
   * small indexOf wrapper
   * @param {String} str
   * @param {String} find
   * @returns {Boolean} found
   */


  function inStr(str, find) {
    return str.indexOf(find) > -1;
  }
  /**
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */


  function splitStr(str) {
    return str.trim().split(/\s+/g);
  }
  /**
   * find if a array contains the object using indexOf or a simple polyFill
   * @param {Array} src
   * @param {String} find
   * @param {String} [findByKey]
   * @return {Boolean|Number} false when not found, or the index
   */


  function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
      return src.indexOf(find);
    } else {
      var i = 0;

      while (i < src.length) {
        if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
          return i;
        }

        i++;
      }

      return -1;
    }
  }
  /**
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */


  function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  }
  /**
   * unique array with objects based on a key (like 'id') or just by the array's value
   * @param {Array} src [{id:1},{id:2},{id:1}]
   * @param {String} [key]
   * @param {Boolean} [sort=False]
   * @returns {Array} [{id:1},{id:2}]
   */


  function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
      var val = key ? src[i][key] : src[i];

      if (inArray(values, val) < 0) {
        results.push(src[i]);
      }

      values[i] = val;
      i++;
    }

    if (sort) {
      if (!key) {
        results = results.sort();
      } else {
        results = results.sort(function sortUniqueArray(a, b) {
          return a[key] > b[key];
        });
      }
    }

    return results;
  }
  /**
   * get the prefixed property
   * @param {Object} obj
   * @param {String} property
   * @returns {String|Undefined} prefixed
   */


  function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);
    var i = 0;

    while (i < VENDOR_PREFIXES.length) {
      prefix = VENDOR_PREFIXES[i];
      prop = prefix ? prefix + camelProp : property;

      if (prop in obj) {
        return prop;
      }

      i++;
    }

    return undefined;
  }
  /**
   * get a unique id
   * @returns {number} uniqueId
   */


  var _uniqueId = 1;

  function uniqueId() {
    return _uniqueId++;
  }
  /**
   * get the window object of an element
   * @param {HTMLElement} element
   * @returns {DocumentView|Window}
   */


  function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return doc.defaultView || doc.parentWindow || window;
  }

  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
  var SUPPORT_TOUCH = ('ontouchstart' in window);
  var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
  var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
  var INPUT_TYPE_TOUCH = 'touch';
  var INPUT_TYPE_PEN = 'pen';
  var INPUT_TYPE_MOUSE = 'mouse';
  var INPUT_TYPE_KINECT = 'kinect';
  var COMPUTE_INTERVAL = 25;
  var INPUT_START = 1;
  var INPUT_MOVE = 2;
  var INPUT_END = 4;
  var INPUT_CANCEL = 8;
  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;
  var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
  var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
  var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
  var PROPS_XY = ['x', 'y'];
  var PROPS_CLIENT_XY = ['clientX', 'clientY'];
  /**
   * create new input type manager
   * @param {Manager} manager
   * @param {Function} callback
   * @returns {Input}
   * @constructor
   */

  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }

  Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function () {},

    /**
     * bind the events
     */
    init: function () {
      this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function () {
      this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
  };
  /**
   * create new input type manager
   * called by the Manager constructor
   * @param {Hammer} manager
   * @returns {Input}
   */

  function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
      Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
      Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
      Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
      Type = MouseInput;
    } else {
      Type = TouchMouseInput;
    }

    return new Type(manager, inputHandler);
  }
  /**
   * handle input events
   * @param {Manager} manager
   * @param {String} eventType
   * @param {Object} input
   */


  function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
    var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
      manager.session = {};
    } // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'


    input.eventType = eventType; // compute scale, rotation etc

    computeInputData(manager, input); // emit secret event

    manager.emit('hammer.input', input);
    manager.recognize(input);
    manager.session.prevInput = input;
  }
  /**
   * extend the data with some usable properties like scale, rotate, velocity etc
   * @param {Object} manager
   * @param {Object} input
   */


  function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length; // store the first input to calculate the distance and direction

    if (!session.firstInput) {
      session.firstInput = simpleCloneInputData(input);
    } // to compute scale and rotation we need to store the multiple touches


    if (pointersLength > 1 && !session.firstMultiple) {
      session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
      session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;
    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);
    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
    input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
    computeIntervalInputData(session, input); // find the correct target

    var target = manager.element;

    if (hasParent(input.srcEvent.target, target)) {
      target = input.srcEvent.target;
    }

    input.target = target;
  }

  function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
      prevDelta = session.prevDelta = {
        x: prevInput.deltaX || 0,
        y: prevInput.deltaY || 0
      };
      offset = session.offsetDelta = {
        x: center.x,
        y: center.y
      };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
  }
  /**
   * velocity is calculated every x ms
   * @param {Object} session
   * @param {Object} input
   */


  function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity,
        velocityX,
        velocityY,
        direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
      var deltaX = input.deltaX - last.deltaX;
      var deltaY = input.deltaY - last.deltaY;
      var v = getVelocity(deltaTime, deltaX, deltaY);
      velocityX = v.x;
      velocityY = v.y;
      velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
      direction = getDirection(deltaX, deltaY);
      session.lastInterval = input;
    } else {
      // use latest velocity info if it doesn't overtake a minimum period
      velocity = last.velocity;
      velocityX = last.velocityX;
      velocityY = last.velocityY;
      direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
  }
  /**
   * create a simple clone from the input used for storage of firstInput and firstMultiple
   * @param {Object} input
   * @returns {Object} clonedInputData
   */


  function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;

    while (i < input.pointers.length) {
      pointers[i] = {
        clientX: round(input.pointers[i].clientX),
        clientY: round(input.pointers[i].clientY)
      };
      i++;
    }

    return {
      timeStamp: now(),
      pointers: pointers,
      center: getCenter(pointers),
      deltaX: input.deltaX,
      deltaY: input.deltaY
    };
  }
  /**
   * get the center of all the pointers
   * @param {Array} pointers
   * @return {Object} center contains `x` and `y` properties
   */


  function getCenter(pointers) {
    var pointersLength = pointers.length; // no need to loop when only one touch

    if (pointersLength === 1) {
      return {
        x: round(pointers[0].clientX),
        y: round(pointers[0].clientY)
      };
    }

    var x = 0,
        y = 0,
        i = 0;

    while (i < pointersLength) {
      x += pointers[i].clientX;
      y += pointers[i].clientY;
      i++;
    }

    return {
      x: round(x / pointersLength),
      y: round(y / pointersLength)
    };
  }
  /**
   * calculate the velocity between two points. unit is in px per ms.
   * @param {Number} deltaTime
   * @param {Number} x
   * @param {Number} y
   * @return {Object} velocity `x` and `y`
   */


  function getVelocity(deltaTime, x, y) {
    return {
      x: x / deltaTime || 0,
      y: y / deltaTime || 0
    };
  }
  /**
   * get the direction between two points
   * @param {Number} x
   * @param {Number} y
   * @return {Number} direction
   */


  function getDirection(x, y) {
    if (x === y) {
      return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
      return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }
  /**
   * calculate the absolute distance between two points
   * @param {Object} p1 {x, y}
   * @param {Object} p2 {x, y}
   * @param {Array} [props] containing x and y keys
   * @return {Number} distance
   */


  function getDistance(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.sqrt(x * x + y * y);
  }
  /**
   * calculate the angle between two coordinates
   * @param {Object} p1
   * @param {Object} p2
   * @param {Array} [props] containing x and y keys
   * @return {Number} angle
   */


  function getAngle(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
  }
  /**
   * calculate the rotation degrees between two pointersets
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} rotation
   */


  function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }
  /**
   * calculate the scale factor between two pointersets
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} scale
   */


  function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }

  var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
  };
  var MOUSE_ELEMENT_EVENTS = 'mousedown';
  var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
  /**
   * Mouse events input
   * @constructor
   * @extends Input
   */

  function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;
    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
  }

  inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
      var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

      if (eventType & INPUT_START && ev.button === 0) {
        this.pressed = true;
      }

      if (eventType & INPUT_MOVE && ev.which !== 1) {
        eventType = INPUT_END;
      } // mouse must be down


      if (!this.pressed) {
        return;
      }

      if (eventType & INPUT_END) {
        this.pressed = false;
      }

      this.callback(this.manager, eventType, {
        pointers: [ev],
        changedPointers: [ev],
        pointerType: INPUT_TYPE_MOUSE,
        srcEvent: ev
      });
    }
  });
  var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
  }; // in IE10 the pointer types is defined as an enum

  var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

  };
  var POINTER_ELEMENT_EVENTS = 'pointerdown';
  var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

  if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
  }
  /**
   * Pointer events input
   * @constructor
   * @extends Input
   */


  function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;
    Input.apply(this, arguments);
    this.store = this.manager.session.pointerEvents = [];
  }

  inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
      var store = this.store;
      var removePointer = false;
      var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
      var isTouch = pointerType == INPUT_TYPE_TOUCH; // get index of the event in the store

      var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
        if (storeIndex < 0) {
          store.push(ev);
          storeIndex = store.length - 1;
        }
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        removePointer = true;
      } // it not found, so the pointer hasn't been down (so it's probably a hover)


      if (storeIndex < 0) {
        return;
      } // update the event in the store


      store[storeIndex] = ev;
      this.callback(this.manager, eventType, {
        pointers: store,
        changedPointers: [ev],
        pointerType: pointerType,
        srcEvent: ev
      });

      if (removePointer) {
        // remove from the store
        store.splice(storeIndex, 1);
      }
    }
  });
  var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
  var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * Touch events input
   * @constructor
   * @extends Input
   */

  function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;
    Input.apply(this, arguments);
  }

  inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
      var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

      if (type === INPUT_START) {
        this.started = true;
      }

      if (!this.started) {
        return;
      }

      var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

      if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
        this.started = false;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    }
  });
  /**
   * @this {TouchInput}
   * @param {Object} ev
   * @param {Number} type flag
   * @returns {undefined|Array} [all, changed]
   */

  function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
      all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
  }

  var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * Multi-user touch events input
   * @constructor
   * @extends Input
   */

  function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};
    Input.apply(this, arguments);
  }

  inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
      var type = TOUCH_INPUT_MAP[ev.type];
      var touches = getTouches.call(this, ev, type);

      if (!touches) {
        return;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    }
  });
  /**
   * @this {TouchInput}
   * @param {Object} ev
   * @param {Number} type flag
   * @returns {undefined|Array} [all, changed]
   */

  function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0].identifier] = true;
      return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target; // get target touches from touches

    targetTouches = allTouches.filter(function (touch) {
      return hasParent(touch.target, target);
    }); // collect touches

    if (type === INPUT_START) {
      i = 0;

      while (i < targetTouches.length) {
        targetIds[targetTouches[i].identifier] = true;
        i++;
      }
    } // filter changed touches to only contain touches that exist in the collected target ids


    i = 0;

    while (i < changedTouches.length) {
      if (targetIds[changedTouches[i].identifier]) {
        changedTargetTouches.push(changedTouches[i]);
      } // cleanup removed touches


      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouches[i].identifier];
      }

      i++;
    }

    if (!changedTargetTouches.length) {
      return;
    }

    return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
  }
  /**
   * Combined touch and mouse input
   *
   * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
   * This because touch devices also emit mouse events while doing a touch.
   *
   * @constructor
   * @extends Input
   */


  var DEDUP_TIMEOUT = 2500;
  var DEDUP_DISTANCE = 25;

  function TouchMouseInput() {
    Input.apply(this, arguments);
    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);
    this.primaryTouch = null;
    this.lastTouches = [];
  }

  inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
      var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
          isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

      if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
        return;
      } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


      if (isTouch) {
        recordTouches.call(this, inputEvent, inputData);
      } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
        return;
      }

      this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    }
  });

  function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
      this.primaryTouch = eventData.changedPointers[0].identifier;
      setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      setLastTouch.call(this, eventData);
    }
  }

  function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
      var lastTouch = {
        x: touch.clientX,
        y: touch.clientY
      };
      this.lastTouches.push(lastTouch);
      var lts = this.lastTouches;

      var removeLastTouch = function () {
        var i = lts.indexOf(lastTouch);

        if (i > -1) {
          lts.splice(i, 1);
        }
      };

      setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
  }

  function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX,
        y = eventData.srcEvent.clientY;

    for (var i = 0; i < this.lastTouches.length; i++) {
      var t = this.lastTouches[i];
      var dx = Math.abs(x - t.x),
          dy = Math.abs(y - t.y);

      if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
        return true;
      }
    }

    return false;
  }

  var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
  var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined; // magical touchAction value

  var TOUCH_ACTION_COMPUTE = 'compute';
  var TOUCH_ACTION_AUTO = 'auto';
  var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

  var TOUCH_ACTION_NONE = 'none';
  var TOUCH_ACTION_PAN_X = 'pan-x';
  var TOUCH_ACTION_PAN_Y = 'pan-y';
  var TOUCH_ACTION_MAP = getTouchActionProps();
  /**
   * Touch Action
   * sets the touchAction property or uses the js alternative
   * @param {Manager} manager
   * @param {String} value
   * @constructor
   */

  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }

  TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function (value) {
      // find out the touch-action by the event handlers
      if (value == TOUCH_ACTION_COMPUTE) {
        value = this.compute();
      }

      if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
        this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
      }

      this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function () {
      this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function () {
      var actions = [];
      each(this.manager.recognizers, function (recognizer) {
        if (boolOrFn(recognizer.options.enable, [recognizer])) {
          actions = actions.concat(recognizer.getTouchAction());
        }
      });
      return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function (input) {
      var srcEvent = input.srcEvent;
      var direction = input.offsetDirection; // if the touch action did prevented once this session

      if (this.manager.session.prevented) {
        srcEvent.preventDefault();
        return;
      }

      var actions = this.actions;
      var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

      if (hasNone) {
        //do not prevent defaults if this is a tap gesture
        var isTapPointer = input.pointers.length === 1;
        var isTapMovement = input.distance < 2;
        var isTapTouchTime = input.deltaTime < 250;

        if (isTapPointer && isTapMovement && isTapTouchTime) {
          return;
        }
      }

      if (hasPanX && hasPanY) {
        // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
        return;
      }

      if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
        return this.preventSrc(srcEvent);
      }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function (srcEvent) {
      this.manager.session.prevented = true;
      srcEvent.preventDefault();
    }
  };
  /**
   * when the touchActions are collected they are not a valid value, so we need to clean things up. *
   * @param {String} actions
   * @returns {*}
   */

  function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
      return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning

    if (hasPanX && hasPanY) {
      return TOUCH_ACTION_NONE;
    } // pan-x OR pan-y


    if (hasPanX || hasPanY) {
      return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    } // manipulation


    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
      return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
  }

  function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
      return false;
    }

    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
      // If css.supports is not supported but there is native touch-action assume it supports
      // all values. This is the case for IE 10 and 11.
      touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
  }
  /**
   * Recognizer flow explained; *
   * All recognizers have the initial state of POSSIBLE when a input session starts.
   * The definition of a input session is from the first input until the last input, with all it's movement in it. *
   * Example session for mouse-input: mousedown -> mousemove -> mouseup
   *
   * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
   * which determines with state it should be.
   *
   * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
   * POSSIBLE to give it another change on the next cycle.
   *
   *               Possible
   *                  |
   *            +-----+---------------+
   *            |                     |
   *      +-----+-----+               |
   *      |           |               |
   *   Failed      Cancelled          |
   *                          +-------+------+
   *                          |              |
   *                      Recognized       Began
   *                                         |
   *                                      Changed
   *                                         |
   *                                  Ended/Recognized
   */


  var STATE_POSSIBLE = 1;
  var STATE_BEGAN = 2;
  var STATE_CHANGED = 4;
  var STATE_ENDED = 8;
  var STATE_RECOGNIZED = STATE_ENDED;
  var STATE_CANCELLED = 16;
  var STATE_FAILED = 32;
  /**
   * Recognizer
   * Every recognizer needs to extend from this class.
   * @constructor
   * @param {Object} options
   */

  function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});
    this.id = uniqueId();
    this.manager = null; // default is enable true

    this.options.enable = ifUndefined(this.options.enable, true);
    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }

  Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function (options) {
      assign(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

      this.manager && this.manager.touchAction.update();
      return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function (otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
        return this;
      }

      var simultaneous = this.simultaneous;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (!simultaneous[otherRecognizer.id]) {
        simultaneous[otherRecognizer.id] = otherRecognizer;
        otherRecognizer.recognizeWith(this);
      }

      return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function (otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      delete this.simultaneous[otherRecognizer.id];
      return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function (otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
        return this;
      }

      var requireFail = this.requireFail;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (inArray(requireFail, otherRecognizer) === -1) {
        requireFail.push(otherRecognizer);
        otherRecognizer.requireFailure(this);
      }

      return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function (otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      var index = inArray(this.requireFail, otherRecognizer);

      if (index > -1) {
        this.requireFail.splice(index, 1);
      }

      return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function () {
      return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function (otherRecognizer) {
      return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function (input) {
      var self = this;
      var state = this.state;

      function emit(event) {
        self.manager.emit(event, input);
      } // 'panstart' and 'panmove'


      if (state < STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }

      emit(self.options.event); // simple 'eventName' events

      if (input.additionalEvent) {
        // additional event(panleft, panright, pinchin, pinchout...)
        emit(input.additionalEvent);
      } // panend and pancancel


      if (state >= STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function (input) {
      if (this.canEmit()) {
        return this.emit(input);
      } // it's failing anyway


      this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function () {
      var i = 0;

      while (i < this.requireFail.length) {
        if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
          return false;
        }

        i++;
      }

      return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function (inputData) {
      // make a new copy of the inputData
      // so we can change the inputData without messing up the other recognizers
      var inputDataClone = assign({}, inputData); // is is enabled and allow recognizing?

      if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
        this.reset();
        this.state = STATE_FAILED;
        return;
      } // reset when we've reached the end


      if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
        this.state = STATE_POSSIBLE;
      }

      this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
      // so trigger an event

      if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
        this.tryEmit(inputDataClone);
      }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function (inputData) {},
    // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function () {},

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function () {}
  };
  /**
   * get a usable string, used as event postfix
   * @param {Const} state
   * @returns {String} state
   */

  function stateStr(state) {
    if (state & STATE_CANCELLED) {
      return 'cancel';
    } else if (state & STATE_ENDED) {
      return 'end';
    } else if (state & STATE_CHANGED) {
      return 'move';
    } else if (state & STATE_BEGAN) {
      return 'start';
    }

    return '';
  }
  /**
   * direction cons to string
   * @param {Const} direction
   * @returns {String}
   */


  function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
      return 'down';
    } else if (direction == DIRECTION_UP) {
      return 'up';
    } else if (direction == DIRECTION_LEFT) {
      return 'left';
    } else if (direction == DIRECTION_RIGHT) {
      return 'right';
    }

    return '';
  }
  /**
   * get a recognizer by name if it is bound to a manager
   * @param {Recognizer|String} otherRecognizer
   * @param {Recognizer} recognizer
   * @returns {Recognizer}
   */


  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;

    if (manager) {
      return manager.get(otherRecognizer);
    }

    return otherRecognizer;
  }
  /**
   * This recognizer is just used as a base for the simple attribute recognizers.
   * @constructor
   * @extends Recognizer
   */


  function AttrRecognizer() {
    Recognizer.apply(this, arguments);
  }

  inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
      /**
       * @type {Number}
       * @default 1
       */
      pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function (input) {
      var optionPointers = this.options.pointers;
      return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function (input) {
      var state = this.state;
      var eventType = input.eventType;
      var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
      var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

      if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
        return state | STATE_CANCELLED;
      } else if (isRecognized || isValid) {
        if (eventType & INPUT_END) {
          return state | STATE_ENDED;
        } else if (!(state & STATE_BEGAN)) {
          return STATE_BEGAN;
        }

        return state | STATE_CHANGED;
      }

      return STATE_FAILED;
    }
  });
  /**
   * Pan
   * Recognized when the pointer is down and moved in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */

  function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);
    this.pX = null;
    this.pY = null;
  }

  inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    },
    getTouchAction: function () {
      var direction = this.options.direction;
      var actions = [];

      if (direction & DIRECTION_HORIZONTAL) {
        actions.push(TOUCH_ACTION_PAN_Y);
      }

      if (direction & DIRECTION_VERTICAL) {
        actions.push(TOUCH_ACTION_PAN_X);
      }

      return actions;
    },
    directionTest: function (input) {
      var options = this.options;
      var hasMoved = true;
      var distance = input.distance;
      var direction = input.direction;
      var x = input.deltaX;
      var y = input.deltaY; // lock to axis?

      if (!(direction & options.direction)) {
        if (options.direction & DIRECTION_HORIZONTAL) {
          direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
          hasMoved = x != this.pX;
          distance = Math.abs(input.deltaX);
        } else {
          direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
          hasMoved = y != this.pY;
          distance = Math.abs(input.deltaY);
        }
      }

      input.direction = direction;
      return hasMoved && distance > options.threshold && direction & options.direction;
    },
    attrTest: function (input) {
      return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
    },
    emit: function (input) {
      this.pX = input.deltaX;
      this.pY = input.deltaY;
      var direction = directionStr(input.direction);

      if (direction) {
        input.additionalEvent = this.options.event + direction;
      }

      this._super.emit.call(this, input);
    }
  });
  /**
   * Pinch
   * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
   * @constructor
   * @extends AttrRecognizer
   */

  function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }

  inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
      event: 'pinch',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function () {
      return [TOUCH_ACTION_NONE];
    },
    attrTest: function (input) {
      return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },
    emit: function (input) {
      if (input.scale !== 1) {
        var inOut = input.scale < 1 ? 'in' : 'out';
        input.additionalEvent = this.options.event + inOut;
      }

      this._super.emit.call(this, input);
    }
  });
  /**
   * Press
   * Recognized when the pointer is down for x ms without any movement.
   * @constructor
   * @extends Recognizer
   */

  function PressRecognizer() {
    Recognizer.apply(this, arguments);
    this._timer = null;
    this._input = null;
  }

  inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
      event: 'press',
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9 // a minimal movement is ok, but keep it low

    },
    getTouchAction: function () {
      return [TOUCH_ACTION_AUTO];
    },
    process: function (input) {
      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTime = input.deltaTime > options.time;
      this._input = input; // we only allow little movement
      // and we've reached an end event, so a tap is possible

      if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
        this.reset();
      } else if (input.eventType & INPUT_START) {
        this.reset();
        this._timer = setTimeoutContext(function () {
          this.state = STATE_RECOGNIZED;
          this.tryEmit();
        }, options.time, this);
      } else if (input.eventType & INPUT_END) {
        return STATE_RECOGNIZED;
      }

      return STATE_FAILED;
    },
    reset: function () {
      clearTimeout(this._timer);
    },
    emit: function (input) {
      if (this.state !== STATE_RECOGNIZED) {
        return;
      }

      if (input && input.eventType & INPUT_END) {
        this.manager.emit(this.options.event + 'up', input);
      } else {
        this._input.timeStamp = now();
        this.manager.emit(this.options.event, this._input);
      }
    }
  });
  /**
   * Rotate
   * Recognized when two or more pointer are moving in a circular motion.
   * @constructor
   * @extends AttrRecognizer
   */

  function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }

  inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
      event: 'rotate',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function () {
      return [TOUCH_ACTION_NONE];
    },
    attrTest: function (input) {
      return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
  });
  /**
   * Swipe
   * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */

  function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }

  inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    },
    getTouchAction: function () {
      return PanRecognizer.prototype.getTouchAction.call(this);
    },
    attrTest: function (input) {
      var direction = this.options.direction;
      var velocity;

      if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
        velocity = input.overallVelocity;
      } else if (direction & DIRECTION_HORIZONTAL) {
        velocity = input.overallVelocityX;
      } else if (direction & DIRECTION_VERTICAL) {
        velocity = input.overallVelocityY;
      }

      return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },
    emit: function (input) {
      var direction = directionStr(input.offsetDirection);

      if (direction) {
        this.manager.emit(this.options.event + direction, input);
      }

      this.manager.emit(this.options.event, input);
    }
  });
  /**
   * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
   * between the given interval and position. The delay option can be used to recognize multi-taps without firing
   * a single tap.
   *
   * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
   * multi-taps being recognized.
   * @constructor
   * @extends Recognizer
   */

  function TapRecognizer() {
    Recognizer.apply(this, arguments); // previous time and center,
    // used for tap counting

    this.pTime = false;
    this.pCenter = false;
    this._timer = null;
    this._input = null;
    this.count = 0;
  }

  inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10 // a multi-tap can be a bit off the initial position

    },
    getTouchAction: function () {
      return [TOUCH_ACTION_MANIPULATION];
    },
    process: function (input) {
      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTouchTime = input.deltaTime < options.time;
      this.reset();

      if (input.eventType & INPUT_START && this.count === 0) {
        return this.failTimeout();
      } // we only allow little movement
      // and we've reached an end event, so a tap is possible


      if (validMovement && validTouchTime && validPointers) {
        if (input.eventType != INPUT_END) {
          return this.failTimeout();
        }

        var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
        var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
        this.pTime = input.timeStamp;
        this.pCenter = input.center;

        if (!validMultiTap || !validInterval) {
          this.count = 1;
        } else {
          this.count += 1;
        }

        this._input = input; // if tap count matches we have recognized it,
        // else it has began recognizing...

        var tapCount = this.count % options.taps;

        if (tapCount === 0) {
          // no failing requirements, immediately trigger the tap event
          // or wait as long as the multitap interval to trigger
          if (!this.hasRequireFailures()) {
            return STATE_RECOGNIZED;
          } else {
            this._timer = setTimeoutContext(function () {
              this.state = STATE_RECOGNIZED;
              this.tryEmit();
            }, options.interval, this);
            return STATE_BEGAN;
          }
        }
      }

      return STATE_FAILED;
    },
    failTimeout: function () {
      this._timer = setTimeoutContext(function () {
        this.state = STATE_FAILED;
      }, this.options.interval, this);
      return STATE_FAILED;
    },
    reset: function () {
      clearTimeout(this._timer);
    },
    emit: function () {
      if (this.state == STATE_RECOGNIZED) {
        this._input.tapCount = this.count;
        this.manager.emit(this.options.event, this._input);
      }
    }
  });
  /**
   * Simple way to create a manager with a default set of recognizers.
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */

  function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
  }
  /**
   * @const {string}
   */


  Hammer.VERSION = '2.0.7';
  /**
   * default settings
   * @namespace
   */

  Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
    [RotateRecognizer, {
      enable: false
    }], [PinchRecognizer, {
      enable: false
    }, ['rotate']], [SwipeRecognizer, {
      direction: DIRECTION_HORIZONTAL
    }], [PanRecognizer, {
      direction: DIRECTION_HORIZONTAL
    }, ['swipe']], [TapRecognizer], [TapRecognizer, {
      event: 'doubletap',
      taps: 2
    }, ['tap']], [PressRecognizer]],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
      /**
       * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userSelect: 'none',

      /**
       * Disable the Windows Phone grippers when pressing an element.
       * @type {String}
       * @default 'none'
       */
      touchSelect: 'none',

      /**
       * Disables the default callout shown when you touch and hold a touch target.
       * On iOS, when you touch and hold a touch target such as a link, Safari displays
       * a callout containing information about the link. This property allows you to disable that callout.
       * @type {String}
       * @default 'none'
       */
      touchCallout: 'none',

      /**
       * Specifies whether zooming is enabled. Used by IE10>
       * @type {String}
       * @default 'none'
       */
      contentZooming: 'none',

      /**
       * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userDrag: 'none',

      /**
       * Overrides the highlight color shown when the user taps a link or a JavaScript
       * clickable element in iOS. This property obeys the alpha value, if specified.
       * @type {String}
       * @default 'rgba(0,0,0,0)'
       */
      tapHighlightColor: 'rgba(0,0,0,0)'
    }
  };
  var STOP = 1;
  var FORCED_STOP = 2;
  /**
   * Manager
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */

  function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = this.add(new item[0](item[1]));
      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }

  Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function (options) {
      assign(this.options, options); // Options that need a little more setup

      if (options.touchAction) {
        this.touchAction.update();
      }

      if (options.inputTarget) {
        // Clean up existing event listeners and reinitialize
        this.input.destroy();
        this.input.target = options.inputTarget;
        this.input.init();
      }

      return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function (force) {
      this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function (inputData) {
      var session = this.session;

      if (session.stopped) {
        return;
      } // run the touch-action polyfill


      this.touchAction.preventDefaults(inputData);
      var recognizer;
      var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
      // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
      // if no recognizer is detecting a thing, it is set to `null`

      var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
      // or when we're in a new session

      if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
        curRecognizer = session.curRecognizer = null;
      }

      var i = 0;

      while (i < recognizers.length) {
        recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
        // 1.   allow if the session is NOT forced stopped (see the .stop() method)
        // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
        //      that is being recognized.
        // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
        //      this can be setup with the `recognizeWith()` method on the recognizer.

        if (session.stopped !== FORCED_STOP && ( // 1
        !curRecognizer || recognizer == curRecognizer || // 2
        recognizer.canRecognizeWith(curRecognizer))) {
          // 3
          recognizer.recognize(inputData);
        } else {
          recognizer.reset();
        } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
        // current active recognizer. but only if we don't already have an active recognizer


        if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
          curRecognizer = session.curRecognizer = recognizer;
        }

        i++;
      }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function (recognizer) {
      if (recognizer instanceof Recognizer) {
        return recognizer;
      }

      var recognizers = this.recognizers;

      for (var i = 0; i < recognizers.length; i++) {
        if (recognizers[i].options.event == recognizer) {
          return recognizers[i];
        }
      }

      return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function (recognizer) {
      if (invokeArrayArg(recognizer, 'add', this)) {
        return this;
      } // remove existing


      var existing = this.get(recognizer.options.event);

      if (existing) {
        this.remove(existing);
      }

      this.recognizers.push(recognizer);
      recognizer.manager = this;
      this.touchAction.update();
      return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function (recognizer) {
      if (invokeArrayArg(recognizer, 'remove', this)) {
        return this;
      }

      recognizer = this.get(recognizer); // let's make sure this recognizer exists

      if (recognizer) {
        var recognizers = this.recognizers;
        var index = inArray(recognizers, recognizer);

        if (index !== -1) {
          recognizers.splice(index, 1);
          this.touchAction.update();
        }
      }

      return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function (events, handler) {
      if (events === undefined) {
        return;
      }

      if (handler === undefined) {
        return;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        handlers[event] = handlers[event] || [];
        handlers[event].push(handler);
      });
      return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function (events, handler) {
      if (events === undefined) {
        return;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        if (!handler) {
          delete handlers[event];
        } else {
          handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
        }
      });
      return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function (event, data) {
      // we also want to trigger dom events
      if (this.options.domEvents) {
        triggerDomEvent(event, data);
      } // no handlers, so skip it all


      var handlers = this.handlers[event] && this.handlers[event].slice();

      if (!handlers || !handlers.length) {
        return;
      }

      data.type = event;

      data.preventDefault = function () {
        data.srcEvent.preventDefault();
      };

      var i = 0;

      while (i < handlers.length) {
        handlers[i](data);
        i++;
      }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function () {
      this.element && toggleCssProps(this, false);
      this.handlers = {};
      this.session = {};
      this.input.destroy();
      this.element = null;
    }
  };
  /**
   * add/remove the css properties as defined in manager.options.cssProps
   * @param {Manager} manager
   * @param {Boolean} add
   */

  function toggleCssProps(manager, add) {
    var element = manager.element;

    if (!element.style) {
      return;
    }

    var prop;
    each(manager.options.cssProps, function (value, name) {
      prop = prefixed(element.style, name);

      if (add) {
        manager.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = manager.oldCssProps[prop] || '';
      }
    });

    if (!add) {
      manager.oldCssProps = {};
    }
  }
  /**
   * trigger dom event
   * @param {String} event
   * @param {Object} data
   */


  function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
  }

  assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,
    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,
    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,
    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,
    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,
    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,
    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
  }); // this prevents errors when Hammer is loaded in the presence of an AMD
  //  style loader but by script tag, not by the loader.

  var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line

  freeGlobal.Hammer = Hammer;

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return Hammer;
    });
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
  } else {
    window[exportName] = Hammer;
  }
})(window, document, 'Hammer');
},{}],"src/controls/gestureControls.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var hammerjs_1 = __importDefault(require("hammerjs"));

var GestureControls =
/** @class */
function () {
  function GestureControls(game) {
    var _this = this;

    this.hasInstaFallen = false;
    this.sensitivity = 3; //higher is less sensitive;

    this.panCounter = 0;
    this.dir = "";
    var body = document.querySelector("body");
    var gestures = new hammerjs_1.default(body, {});
    gestures.on("panleft panright swipeup swipedown tap", function (e) {
      if (game.gameState === "playing") {
        switch (e.type) {
          // case "panleft":
          //   return stage.controls.left();
          //   // return this.throttledFn("panleft", () => stage.controls.left());
          // case "panright":
          //   return stage.controls.right();
          //   // return this.throttledFn("panright", () => stage.controls.right());
          case "swipedown":
            return game.stage.controls.down();

          case "swipeup":
            return game.stage.controls.instaFall();
          // case "tap":
          //   return stage.controls.rotate();

          case "panend":
            return _this.hasInstaFallen = false;
        }
      }
    });
  }

  GestureControls.prototype.throttledFn = function (hammerEventType, fn) {
    if (this.dir === hammerEventType) {
      this.panCounter++;
    } else {
      this.dir = hammerEventType;
      this.panCounter = 0;
    }

    if (this.panCounter % this.sensitivity === 0) {
      return fn();
    }
  };

  GestureControls.prototype.destroy = function () {};

  return GestureControls;
}();

exports.default = GestureControls;
},{"hammerjs":"node_modules/hammerjs/hammer.js"}],"src/Defaults.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultGameSettings = void 0;
exports.defaultGameSettings = {
  width: 10,
  height: 20,
  blockSize: 24,
  gridGutterSize: 1,
  gridOverBlocks: true,
  queueScaleFactor: 0.75
};
},{}],"node_modules/preact/devtools/dist/devtools.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHookName = t;

var _preact = require("preact");

function t(o, e) {
  return _preact.options.__a && _preact.options.__a(e), o;
}

"undefined" != typeof window && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.5.12", _preact.options, {
  Fragment: _preact.Fragment,
  Component: _preact.Component
});
},{"preact":"node_modules/preact/dist/preact.module.js"}],"node_modules/preact/debug/dist/debug.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPropWarnings = r;

var _preact = require("preact");

require("preact/devtools");

var o = {};

function r() {
  o = {};
}

function a(n) {
  return n.type === _preact.Fragment ? "Fragment" : "function" == typeof n.type ? n.type.displayName || n.type.name : "string" == typeof n.type ? n.type : "#text";
}

var i = [],
    s = [];

function c() {
  return i.length > 0 ? i[i.length - 1] : null;
}

var l = !1;

function u(n) {
  return "function" == typeof n.type && n.type != _preact.Fragment;
}

function f(n) {
  for (var t = [n], e = n; null != e.__o;) t.push(e.__o), e = e.__o;

  return t.reduce(function (n, t) {
    n += "  in " + a(t);
    var e = t.__source;
    return e ? n += " (at " + e.fileName + ":" + e.lineNumber + ")" : l || (l = !0, console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")), n + "\n";
  }, "");
}

var p = "function" == typeof WeakMap,
    d = _preact.Component.prototype.setState;

_preact.Component.prototype.setState = function (n, t) {
  return null == this.__v ? null == this.state && console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n' + f(c())) : null == this.__P && console.warn('Can\'t call "this.setState" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n' + f(this.__v)), d.call(this, n, t);
};

var h = _preact.Component.prototype.forceUpdate;

function y(n) {
  var t = n.props,
      e = a(n),
      o = "";

  for (var r in t) if (t.hasOwnProperty(r) && "children" !== r) {
    var i = t[r];
    "function" == typeof i && (i = "function " + (i.displayName || i.name) + "() {}"), i = Object(i) !== i || i.toString ? i + "" : Object.prototype.toString.call(i), o += " " + r + "=" + JSON.stringify(i);
  }

  var s = t.children;
  return "<" + e + o + (s && s.length ? ">..</" + e + ">" : " />");
}

_preact.Component.prototype.forceUpdate = function (n) {
  return null == this.__v ? console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n' + f(c())) : null == this.__P && console.warn('Can\'t call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n' + f(this.__v)), h.call(this, n);
}, function () {
  !function () {
    var t = _preact.options.__b,
        e = _preact.options.diffed,
        o = _preact.options.__,
        r = _preact.options.vnode,
        a = _preact.options.__r;
    _preact.options.diffed = function (n) {
      u(n) && s.pop(), i.pop(), e && e(n);
    }, _preact.options.__b = function (n) {
      u(n) && i.push(n), t && t(n);
    }, _preact.options.__ = function (n, t) {
      s = [], o && o(n, t);
    }, _preact.options.vnode = function (n) {
      n.__o = s.length > 0 ? s[s.length - 1] : null, r && r(n);
    }, _preact.options.__r = function (n) {
      u(n) && s.push(n), a && a(n);
    };
  }();
  var t = !1,
      e = _preact.options.__b,
      r = _preact.options.diffed,
      c = _preact.options.vnode,
      l = _preact.options.__e,
      d = _preact.options.__,
      h = _preact.options.__h,
      m = p ? {
    useEffect: new WeakMap(),
    useLayoutEffect: new WeakMap(),
    lazyPropTypes: new WeakMap()
  } : null,
      v = [];
  _preact.options.__e = function (n, t, e) {
    if (t && t.__c && "function" == typeof n.then) {
      var o = n;
      n = new Error("Missing Suspense. The throwing component was: " + a(t));

      for (var r = t; r; r = r.__) if (r.__c && r.__c.__c) {
        n = o;
        break;
      }

      if (n instanceof Error) throw n;
    }

    try {
      l(n, t, e), "function" != typeof n.then && setTimeout(function () {
        throw n;
      });
    } catch (n) {
      throw n;
    }
  }, _preact.options.__ = function (n, t) {
    if (!t) throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");
    var e;

    switch (t.nodeType) {
      case 1:
      case 11:
      case 9:
        e = !0;
        break;

      default:
        e = !1;
    }

    if (!e) {
      var o = a(n);
      throw new Error("Expected a valid HTML node as a second argument to render.\tReceived " + t + " instead: render(<" + o + " />, " + t + ");");
    }

    d && d(n, t);
  }, _preact.options.__b = function (n) {
    var r = n.type,
        i = function n(t) {
      return t ? "function" == typeof t.type ? n(t.__) : t : {};
    }(n.__);

    if (t = !0, void 0 === r) throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + y(n) + "\n\n" + f(n));

    if (null != r && "object" == typeof r) {
      if (void 0 !== r.__k && void 0 !== r.__e) throw new Error("Invalid type passed to createElement(): " + r + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + a(n) + " = " + y(r) + ";\n  let vnode = <My" + a(n) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + f(n));
      throw new Error("Invalid type passed to createElement(): " + (Array.isArray(r) ? "array" : r));
    }

    if ("thead" !== r && "tfoot" !== r && "tbody" !== r || "table" === i.type ? "tr" === r && "thead" !== i.type && "tfoot" !== i.type && "tbody" !== i.type && "table" !== i.type ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + y(n) + "\n\n" + f(n)) : "td" === r && "tr" !== i.type ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + y(n) + "\n\n" + f(n)) : "th" === r && "tr" !== i.type && console.error("Improper nesting of table. Your <th> should have a <tr>." + y(n) + "\n\n" + f(n)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + y(n) + "\n\n" + f(n)), void 0 !== n.ref && "function" != typeof n.ref && "object" != typeof n.ref && !("$$typeof" in n)) throw new Error('Component\'s "ref" property should be a function, or an object created by createRef(), but got [' + typeof n.ref + "] instead\n" + y(n) + "\n\n" + f(n));
    if ("string" == typeof n.type) for (var s in n.props) if ("o" === s[0] && "n" === s[1] && "function" != typeof n.props[s] && null != n.props[s]) throw new Error("Component's \"" + s + '" property should be a function, but got [' + typeof n.props[s] + "] instead\n" + y(n) + "\n\n" + f(n));

    if ("function" == typeof n.type && n.type.propTypes) {
      if ("Lazy" === n.type.displayName && m && !m.lazyPropTypes.has(n.type)) {
        var c = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";

        try {
          var l = n.type();
          m.lazyPropTypes.set(n.type, !0), console.warn(c + "Component wrapped in lazy() is " + a(l));
        } catch (n) {
          console.warn(c + "We will log the wrapped component's name once it is loaded.");
        }
      }

      var u = n.props;
      n.type.__f && delete (u = function (n, t) {
        for (var e in t) n[e] = t[e];

        return n;
      }({}, u)).ref, function (n, t, e, r, a) {
        Object.keys(n).forEach(function (e) {
          var i;

          try {
            i = n[e](t, e, r, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (n) {
            i = n;
          }

          !i || i.message in o || (o[i.message] = !0, console.error("Failed prop type: " + i.message + (a && "\n" + a() || "")));
        });
      }(n.type.propTypes, u, 0, a(n), function () {
        return f(n);
      });
    }

    e && e(n);
  }, _preact.options.__h = function (n, e, o) {
    if (!n || !t) throw new Error("Hook can only be invoked from render methods.");
    h && h(n, e, o);
  };

  var b = function (n, t) {
    return {
      get: function () {
        var e = "get" + n + t;
        v && v.indexOf(e) < 0 && (v.push(e), console.warn("getting vnode." + n + " is deprecated, " + t));
      },
      set: function () {
        var e = "set" + n + t;
        v && v.indexOf(e) < 0 && (v.push(e), console.warn("setting vnode." + n + " is not allowed, " + t));
      }
    };
  },
      w = {
    nodeName: b("nodeName", "use vnode.type"),
    attributes: b("attributes", "use vnode.props"),
    children: b("children", "use vnode.props.children")
  },
      g = Object.create({}, w);

  _preact.options.vnode = function (n) {
    var t = n.props;

    if (null !== n.type && null != t && ("__source" in t || "__self" in t)) {
      var e = n.props = {};

      for (var o in t) {
        var r = t[o];
        "__source" === o ? n.__source = r : "__self" === o ? n.__self = r : e[o] = r;
      }
    }

    n.__proto__ = g, c && c(n);
  }, _preact.options.diffed = function (n) {
    if (n.__k && n.__k.forEach(function (t) {
      if (t && void 0 === t.type) {
        delete t.__, delete t.__b;
        var e = Object.keys(t).join(",");
        throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + e + "}.\n\n" + f(n));
      }
    }), t = !1, r && r(n), null != n.__k) for (var e = [], o = 0; o < n.__k.length; o++) {
      var a = n.__k[o];

      if (a && null != a.key) {
        var i = a.key;

        if (-1 !== e.indexOf(i)) {
          console.error('Following component has two or more children with the same key attribute: "' + i + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + y(n) + "\n\n" + f(n));
          break;
        }

        e.push(i);
      }
    }
  };
}();
},{"preact":"node_modules/preact/dist/preact.module.js","preact/devtools":"node_modules/preact/devtools/dist/devtools.module.js"}],"src/tetris.tsx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_runtime_1 = require("preact/jsx-runtime"); // if(process.env.DEBUG === 'true') {
//   import("preact/debug");
// }


var stage_1 = __importDefault(require("./stage"));

var splash_1 = __importDefault(require("./states/splash"));

var gameOver_1 = __importDefault(require("./states/gameOver"));

var keyboardControls_1 = __importDefault(require("./controls/keyboardControls"));

var touchControls_1 = __importDefault(require("./controls/touchControls"));

var gestureControls_1 = __importDefault(require("./controls/gestureControls"));

var preact_1 = require("preact");

var Defaults_1 = require("./Defaults"); //todo: remove


require("preact/debug");

var Tetris =
/** @class */
function (_super) {
  __extends(Tetris, _super);

  function Tetris() {
    var _this = _super.call(this) || this;

    _this.gameMode = "default";
    _this.state = {
      gameState: "splash"
    }; // this.setGameState("splash");

    new keyboardControls_1.default(_this);
    new touchControls_1.default(_this);
    new gestureControls_1.default(_this);

    function setVH() {
      document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px"); //https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    }

    window.addEventListener("resize", setVH);
    setVH();
    return _this;
  }

  Tetris.prototype.setGameState = function (gameState) {
    this.setState({
      gameState: gameState
    });
    this.gameState = gameState; // switch (gameState) {
    //   case "splash":
    //     return this.splash = new Splash(this);
    //   case "playing":
    //     return (this.stage = new Stage({ width: 10 }, this));
    //   case "gameOver":
    //     return this.gameOver = new GameOver(this);
    // }
  };

  Object.defineProperty(Tetris.prototype, "isMobile", {
    get: function get() {
      var breakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--breakpoint"));
      return window.innerWidth < breakpoint;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Tetris.prototype, "isDesktop", {
    get: function get() {
      return !this.isMobile;
    },
    enumerable: false,
    configurable: true
  });

  Tetris.prototype.render = function () {
    switch (this.state.gameState) {
      case "splash":
        return this.splash = jsx_runtime_1.jsx(splash_1.default, {
          game: this
        }, void 0);

      case "playing":
        // return this.stage = <Stage />
        return jsx_runtime_1.jsx(stage_1.default, {
          game: this,
          settings: __assign(__assign({}, Defaults_1.defaultGameSettings), {
            width: 5
          })
        }, void 0); // return <Block id={1} stage={null} settings={defaultGameSettings} />

        return;

      case "gameOver":
        return this.gameOver = new gameOver_1.default(this);
    }
  };

  return Tetris;
}(preact_1.Component);

exports.default = Tetris;
preact_1.render(jsx_runtime_1.jsx(Tetris, {}, void 0), document.body);
},{"preact/jsx-runtime":"node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js","./stage":"src/stage.tsx","./states/splash":"src/states/splash.tsx","./states/gameOver":"src/states/gameOver.tsx","./controls/keyboardControls":"src/controls/keyboardControls.ts","./controls/touchControls":"src/controls/touchControls.ts","./controls/gestureControls":"src/controls/gestureControls.ts","preact":"node_modules/preact/dist/preact.module.js","./Defaults":"src/Defaults.ts","preact/debug":"node_modules/preact/debug/dist/debug.module.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50153" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/tetris.tsx"], null)
//# sourceMappingURL=/tetris.ac363ac8.js.map