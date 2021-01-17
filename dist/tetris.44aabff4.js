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
})({"node_modules/d3-selection/src/namespaces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.xhtml = void 0;
var xhtml = "http://www.w3.org/1999/xhtml";
exports.xhtml = xhtml;
var _default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
exports.default = _default;
},{}],"node_modules/d3-selection/src/namespace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespaces = _interopRequireDefault(require("./namespaces.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  var prefix = name += "",
      i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name; // eslint-disable-line no-prototype-builtins
}
},{"./namespaces.js":"node_modules/d3-selection/src/namespaces.js"}],"node_modules/d3-selection/src/creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("./namespace.js"));

var _namespaces = require("./namespaces.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
},{"./namespace.js":"node_modules/d3-selection/src/namespace.js","./namespaces.js":"node_modules/d3-selection/src/namespaces.js"}],"node_modules/d3-selection/src/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function none() {}

function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}
},{}],"node_modules/d3-selection/src/selection/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

var _selector = _interopRequireDefault(require("../selector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","../selector.js":"node_modules/d3-selection/src/selector.js"}],"node_modules/d3-selection/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
  : Array.from(x); // Map, Set, iterable, string, or anything else
}
},{}],"node_modules/d3-selection/src/selectorAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function empty() {
  return [];
}

function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}
},{}],"node_modules/d3-selection/src/selection/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

var _array = _interopRequireDefault(require("../array.js"));

var _selectorAll = _interopRequireDefault(require("../selectorAll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function arrayAll(select) {
  return function () {
    var group = select.apply(this, arguments);
    return group == null ? [] : (0, _array.default)(group);
  };
}

function _default(select) {
  if (typeof select === "function") select = arrayAll(select);else select = (0, _selectorAll.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","../array.js":"node_modules/d3-selection/src/array.js","../selectorAll.js":"node_modules/d3-selection/src/selectorAll.js"}],"node_modules/d3-selection/src/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.childMatcher = childMatcher;

function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function (node) {
    return node.matches(selector);
  };
}
},{}],"node_modules/d3-selection/src/selection/selectChild.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _matcher = require("../matcher.js");

var find = Array.prototype.find;

function childFind(match) {
  return function () {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function _default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : (0, _matcher.childMatcher)(match)));
}
},{"../matcher.js":"node_modules/d3-selection/src/matcher.js"}],"node_modules/d3-selection/src/selection/selectChildren.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _matcher = require("../matcher.js");

var filter = Array.prototype.filter;

function children() {
  return this.children;
}

function childrenFilter(match) {
  return function () {
    return filter.call(this.children, match);
  };
}

function _default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : (0, _matcher.childMatcher)(match)));
}
},{"../matcher.js":"node_modules/d3-selection/src/matcher.js"}],"node_modules/d3-selection/src/selection/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

var _matcher = _interopRequireDefault(require("../matcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","../matcher.js":"node_modules/d3-selection/src/matcher.js"}],"node_modules/d3-selection/src/selection/sparse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(update) {
  return new Array(update.length);
}
},{}],"node_modules/d3-selection/src/selection/enter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.EnterNode = EnterNode;

var _sparse = _interopRequireDefault(require("./sparse.js"));

var _index = require("./index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
},{"./sparse.js":"node_modules/d3-selection/src/selection/sparse.js","./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"node_modules/d3-selection/src/selection/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

var _enter = require("./enter.js");

var _array = _interopRequireDefault(require("../array.js"));

var _constant = _interopRequireDefault(require("../constant.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length; // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.

  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Put any non-null nodes that don’t fit into exit.


  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map(),
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue; // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.

  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";

      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  } // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.


  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";

    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Add any remaining nodes that were not bound to data to exit.


  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function _default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = (0, _array.default)(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key); // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.

    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;

        while (!(next = updateGroup[i1]) && ++i1 < dataLength);

        previous._next = next || null;
      }
    }
  }

  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","./enter.js":"node_modules/d3-selection/src/selection/enter.js","../array.js":"node_modules/d3-selection/src/array.js","../constant.js":"node_modules/d3-selection/src/constant.js"}],"node_modules/d3-selection/src/selection/exit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sparse = _interopRequireDefault(require("./sparse.js"));

var _index = require("./index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}
},{"./sparse.js":"node_modules/d3-selection/src/selection/sparse.js","./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/selection/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
      update = this,
      exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
},{}],"node_modules/d3-selection/src/selection/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

function _default(selection) {
  if (!(selection instanceof _index.Selection)) throw new Error("invalid merge");

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index.Selection(merges, this._parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/selection/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}
},{}],"node_modules/d3-selection/src/selection/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

function _default(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }

    sortgroup.sort(compareNode);
  }

  return new _index.Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/selection/call.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
},{}],"node_modules/d3-selection/src/selection/nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  return Array.from(this);
}
},{}],"node_modules/d3-selection/src/selection/node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}
},{}],"node_modules/d3-selection/src/selection/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  let size = 0;

  for (const node of this) ++size; // eslint-disable-line no-unused-vars


  return size;
}
},{}],"node_modules/d3-selection/src/selection/empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  return !this.node();
}
},{}],"node_modules/d3-selection/src/selection/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}
},{}],"node_modules/d3-selection/src/selection/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("../namespace.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function _default(name, value) {
  var fullname = (0, _namespace.default)(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }

  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
},{"../namespace.js":"node_modules/d3-selection/src/namespace.js"}],"node_modules/d3-selection/src/window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
  node.document && node // node is a Window
  || node.defaultView; // node is a Document
}
},{}],"node_modules/d3-selection/src/selection/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;

var _window = _interopRequireDefault(require("../window.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}

function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}
},{"../window.js":"node_modules/d3-selection/src/window.js"}],"node_modules/d3-selection/src/selection/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}

function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
},{}],"node_modules/d3-selection/src/selection/classed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);

    if (i < 0) {
      this._names.push(name);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);

    if (i >= 0) {
      this._names.splice(i, 1);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function _default(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()),
        i = -1,
        n = names.length;

    while (++i < n) if (!list.contains(names[i])) return false;

    return true;
  }

  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
},{}],"node_modules/d3-selection/src/selection/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
},{}],"node_modules/d3-selection/src/selection/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
},{}],"node_modules/d3-selection/src/selection/raise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function _default() {
  return this.each(raise);
}
},{}],"node_modules/d3-selection/src/selection/lower.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function _default() {
  return this.each(lower);
}
},{}],"node_modules/d3-selection/src/selection/append.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
},{"../creator.js":"node_modules/d3-selection/src/creator.js"}],"node_modules/d3-selection/src/selection/insert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator.js"));

var _selector = _interopRequireDefault(require("../selector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function constantNull() {
  return null;
}

function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
      select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
},{"../creator.js":"node_modules/d3-selection/src/creator.js","../selector.js":"node_modules/d3-selection/src/selector.js"}],"node_modules/d3-selection/src/selection/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function _default() {
  return this.each(remove);
}
},{}],"node_modules/d3-selection/src/selection/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function selection_cloneShallow() {
  var clone = this.cloneNode(false),
      parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true),
      parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
},{}],"node_modules/d3-selection/src/selection/datum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
},{}],"node_modules/d3-selection/src/selection/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function contextListener(listener) {
  return function (event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
        i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}

function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;

    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }

    if (++i) on.length = i;else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function () {
    var on = this.__on,
        o,
        listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      options: options
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}

function _default(typename, value, options) {
  var typenames = parseTypenames(typename + ""),
      i,
      n = typenames.length,
      t;

  if (arguments.length < 2) {
    var on = this.node().__on;

    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;

  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));

  return this;
}
},{}],"node_modules/d3-selection/src/selection/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _window = _interopRequireDefault(require("../window.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
},{"../window.js":"node_modules/d3-selection/src/window.js"}],"node_modules/d3-selection/src/selection/iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function* _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}
},{}],"node_modules/d3-selection/src/selection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.default = exports.root = void 0;

var _select = _interopRequireDefault(require("./select.js"));

var _selectAll = _interopRequireDefault(require("./selectAll.js"));

var _selectChild = _interopRequireDefault(require("./selectChild.js"));

var _selectChildren = _interopRequireDefault(require("./selectChildren.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _data = _interopRequireDefault(require("./data.js"));

var _enter = _interopRequireDefault(require("./enter.js"));

var _exit = _interopRequireDefault(require("./exit.js"));

var _join = _interopRequireDefault(require("./join.js"));

var _merge = _interopRequireDefault(require("./merge.js"));

var _order = _interopRequireDefault(require("./order.js"));

var _sort = _interopRequireDefault(require("./sort.js"));

var _call = _interopRequireDefault(require("./call.js"));

var _nodes = _interopRequireDefault(require("./nodes.js"));

var _node = _interopRequireDefault(require("./node.js"));

var _size = _interopRequireDefault(require("./size.js"));

var _empty = _interopRequireDefault(require("./empty.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _attr = _interopRequireDefault(require("./attr.js"));

var _style = _interopRequireDefault(require("./style.js"));

var _property = _interopRequireDefault(require("./property.js"));

var _classed = _interopRequireDefault(require("./classed.js"));

var _text = _interopRequireDefault(require("./text.js"));

var _html = _interopRequireDefault(require("./html.js"));

var _raise = _interopRequireDefault(require("./raise.js"));

var _lower = _interopRequireDefault(require("./lower.js"));

var _append = _interopRequireDefault(require("./append.js"));

var _insert = _interopRequireDefault(require("./insert.js"));

var _remove = _interopRequireDefault(require("./remove.js"));

var _clone = _interopRequireDefault(require("./clone.js"));

var _datum = _interopRequireDefault(require("./datum.js"));

var _on = _interopRequireDefault(require("./on.js"));

var _dispatch = _interopRequireDefault(require("./dispatch.js"));

var _iterator = _interopRequireDefault(require("./iterator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = [null];
exports.root = root;

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  selectChild: _selectChild.default,
  selectChildren: _selectChildren.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  selection: selection_selection,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default,
  [Symbol.iterator]: _iterator.default
};
var _default = selection;
exports.default = _default;
},{"./select.js":"node_modules/d3-selection/src/selection/select.js","./selectAll.js":"node_modules/d3-selection/src/selection/selectAll.js","./selectChild.js":"node_modules/d3-selection/src/selection/selectChild.js","./selectChildren.js":"node_modules/d3-selection/src/selection/selectChildren.js","./filter.js":"node_modules/d3-selection/src/selection/filter.js","./data.js":"node_modules/d3-selection/src/selection/data.js","./enter.js":"node_modules/d3-selection/src/selection/enter.js","./exit.js":"node_modules/d3-selection/src/selection/exit.js","./join.js":"node_modules/d3-selection/src/selection/join.js","./merge.js":"node_modules/d3-selection/src/selection/merge.js","./order.js":"node_modules/d3-selection/src/selection/order.js","./sort.js":"node_modules/d3-selection/src/selection/sort.js","./call.js":"node_modules/d3-selection/src/selection/call.js","./nodes.js":"node_modules/d3-selection/src/selection/nodes.js","./node.js":"node_modules/d3-selection/src/selection/node.js","./size.js":"node_modules/d3-selection/src/selection/size.js","./empty.js":"node_modules/d3-selection/src/selection/empty.js","./each.js":"node_modules/d3-selection/src/selection/each.js","./attr.js":"node_modules/d3-selection/src/selection/attr.js","./style.js":"node_modules/d3-selection/src/selection/style.js","./property.js":"node_modules/d3-selection/src/selection/property.js","./classed.js":"node_modules/d3-selection/src/selection/classed.js","./text.js":"node_modules/d3-selection/src/selection/text.js","./html.js":"node_modules/d3-selection/src/selection/html.js","./raise.js":"node_modules/d3-selection/src/selection/raise.js","./lower.js":"node_modules/d3-selection/src/selection/lower.js","./append.js":"node_modules/d3-selection/src/selection/append.js","./insert.js":"node_modules/d3-selection/src/selection/insert.js","./remove.js":"node_modules/d3-selection/src/selection/remove.js","./clone.js":"node_modules/d3-selection/src/selection/clone.js","./datum.js":"node_modules/d3-selection/src/selection/datum.js","./on.js":"node_modules/d3-selection/src/selection/on.js","./dispatch.js":"node_modules/d3-selection/src/selection/dispatch.js","./iterator.js":"node_modules/d3-selection/src/selection/iterator.js"}],"node_modules/d3-selection/src/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./selection/index.js");

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
},{"./selection/index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("./creator.js"));

var _select = _interopRequireDefault(require("./select.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}
},{"./creator.js":"node_modules/d3-selection/src/creator.js","./select.js":"node_modules/d3-selection/src/select.js"}],"node_modules/d3-selection/src/local.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;

function local() {
  return new Local();
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;

    while (!(id in node)) if (!(node = node.parentNode)) return;

    return node[id];
  },
  set: function (node, value) {
    return node[this._] = value;
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  }
};
},{}],"node_modules/d3-selection/src/sourceEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(event) {
  let sourceEvent;

  while (sourceEvent = event.sourceEvent) event = sourceEvent;

  return event;
}
},{}],"node_modules/d3-selection/src/pointer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(event, node) {
  event = (0, _sourceEvent.default)(event);
  if (node === undefined) node = event.currentTarget;

  if (node) {
    var svg = node.ownerSVGElement || node;

    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }

    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }

  return [event.pageX, event.pageY];
}
},{"./sourceEvent.js":"node_modules/d3-selection/src/sourceEvent.js"}],"node_modules/d3-selection/src/pointers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _pointer = _interopRequireDefault(require("./pointer.js"));

var _sourceEvent = _interopRequireDefault(require("./sourceEvent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(events, node) {
  if (events.target) {
    // i.e., instanceof Event, not TouchList or iterable
    events = (0, _sourceEvent.default)(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }

  return Array.from(events, event => (0, _pointer.default)(event, node));
}
},{"./pointer.js":"node_modules/d3-selection/src/pointer.js","./sourceEvent.js":"node_modules/d3-selection/src/sourceEvent.js"}],"node_modules/d3-selection/src/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _array = _interopRequireDefault(require("./array.js"));

var _index = require("./selection/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([selector == null ? [] : (0, _array.default)(selector)], _index.root);
}
},{"./array.js":"node_modules/d3-selection/src/array.js","./selection/index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function () {
    return _creator.default;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function () {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function () {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function () {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "pointer", {
  enumerable: true,
  get: function () {
    return _pointer.default;
  }
});
Object.defineProperty(exports, "pointers", {
  enumerable: true,
  get: function () {
    return _pointers.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function () {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function () {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.default;
  }
});

var _create = _interopRequireDefault(require("./create.js"));

var _creator = _interopRequireDefault(require("./creator.js"));

var _local = _interopRequireDefault(require("./local.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

var _namespace = _interopRequireDefault(require("./namespace.js"));

var _namespaces = _interopRequireDefault(require("./namespaces.js"));

var _pointer = _interopRequireDefault(require("./pointer.js"));

var _pointers = _interopRequireDefault(require("./pointers.js"));

var _select = _interopRequireDefault(require("./select.js"));

var _selectAll = _interopRequireDefault(require("./selectAll.js"));

var _index = _interopRequireDefault(require("./selection/index.js"));

var _selector = _interopRequireDefault(require("./selector.js"));

var _selectorAll = _interopRequireDefault(require("./selectorAll.js"));

var _style = require("./selection/style.js");

var _window = _interopRequireDefault(require("./window.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./create.js":"node_modules/d3-selection/src/create.js","./creator.js":"node_modules/d3-selection/src/creator.js","./local.js":"node_modules/d3-selection/src/local.js","./matcher.js":"node_modules/d3-selection/src/matcher.js","./namespace.js":"node_modules/d3-selection/src/namespace.js","./namespaces.js":"node_modules/d3-selection/src/namespaces.js","./pointer.js":"node_modules/d3-selection/src/pointer.js","./pointers.js":"node_modules/d3-selection/src/pointers.js","./select.js":"node_modules/d3-selection/src/select.js","./selectAll.js":"node_modules/d3-selection/src/selectAll.js","./selection/index.js":"node_modules/d3-selection/src/selection/index.js","./selector.js":"node_modules/d3-selection/src/selector.js","./selectorAll.js":"node_modules/d3-selection/src/selectorAll.js","./selection/style.js":"node_modules/d3-selection/src/selection/style.js","./window.js":"node_modules/d3-selection/src/window.js"}],"src/possibleForms.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.possibleForms = void 0;
exports.possibleForms = [{
  color: "purple",
  shape: [[0, 1, 0], [1, 1, 1]]
}, {
  color: "green",
  shape: [[0, 1, 1], [1, 1, 0]]
}, {
  color: "red",
  shape: [[1, 1, 0], [0, 1, 1]]
}, {
  color: "yellow",
  shape: [[1, 1], [1, 1]]
}, {
  color: "dark-blue",
  shape: [[1, 0, 0], [1, 1, 1]]
}, {
  color: "orange",
  shape: [[0, 0, 1], [1, 1, 1]]
}, {
  color: "light-blue",
  shape: [[1, 1, 1, 1]]
}];
},{}],"src/utils.ts":[function(require,module,exports) {
"use strict";

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
exports.cloneDeep = exports.uniq = void 0;

function uniq(arr) {
  return __spread(new Set(arr));
}

exports.uniq = uniq;

function cloneDeep(o) {
  return JSON.parse(JSON.stringify(o));
}

exports.cloneDeep = cloneDeep;
},{}],"src/block.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var d3_selection_1 = require("d3-selection");

var possibleForms_1 = require("./possibleForms");

var utils_1 = require("./utils");

var Block =
/** @class */
function () {
  function Block(id, stage) {
    if (id === void 0) {
      id = 0;
    }

    this.x = 0;
    this.y = 0;
    this.stage = stage;
    var randomBlock = possibleForms_1.possibleForms[Math.floor(Math.random() * possibleForms_1.possibleForms.length)];
    this.shape = utils_1.cloneDeep(randomBlock.shape);
    this.color = randomBlock.color;
    this.x = Math.floor((this.stage.gridWidth - this.shape[0].length) / 2);
    this.id = id;
    this.init();
  }

  Block.prototype.rotate = function () {
    var _this = this;

    var columnCount = this.shape[0].length;
    var rowCount = this.shape.length;
    var newVal = [];

    for (var x = 0; x < columnCount; x++) {
      newVal.push([]);
    }

    for (var row = 0; row < rowCount; row++) {
      for (var column = 0; column < columnCount; column++) {
        newVal[column][row] = this.shape[row][column];
      }
    }

    this.shape = newVal.map(function (row) {
      return row.reverse();
    }); //push block away from wall if gonna overlap
    //sorta inefficient but ok

    this.shape[0].map(function (x, xIndex) {
      if (xIndex + _this.x >= _this.stage.gridWidth) {
        _this.moveX(-1, true);
      }
    });
    this.redraw();
  };

  Block.prototype.init = function () {
    this.d3Self = d3_selection_1.selectAll(".stage svg").insert("g", this.stage.gridOverBlocks ? ":first-child" : null).attr("class", "block " + this.color);
    this.redraw();
  };

  Block.prototype.redraw = function () {
    var _this = this;

    this.d3Self.selectAll("rect").remove();
    this.d3Self.selectAll("g").remove();
    this.shape.map(function (y, yI) {
      y.map(function (x, xI) {
        if (x && y) {
          _this.d3Self.append("g").append("rect").attr("width", _this.stage.blockSize).attr("height", _this.stage.blockSize).attr("x", xI * _this.stage.blockSize).attr("y", yI * _this.stage.blockSize).attr("class", "atom"); // if(constants.debug) {
          //   this.d3Self
          //   .selectAll("g")
          //   .append("text")
          //   .attr("style", "fill: white;")
          //   .attr("x", xI * this.stage.blockSize)
          //   .attr("y", yI * this.stage.blockSize + 10)
          //   .text(() => this.id);
          // }

        }
      });
    });
    this.updatePosition();
  };

  Block.prototype.clearRow = function (rowIndex) {
    var targetShapeRowIndex = rowIndex - this.y;
    this.shape.unshift(new Array(this.shape[0].length).fill(0));
    this.shape.splice(targetShapeRowIndex + 1, 1);
    this.redraw();
  };

  Block.prototype.moveDown = function () {
    this.y++;
    this.updatePosition();
  };

  Block.prototype.moveX = function (x, bypassCollision) {
    if (bypassCollision === void 0) {
      bypassCollision = false;
    }

    if (!bypassCollision) {
      if (this.x + x + this.shape[0].length > this.stage.gridWidth || this.x + x < 0) {
        return; //block moves out of bounds
      }
    }

    this.x = this.x + x;
    this.updatePosition();
  };

  Block.prototype.updatePosition = function () {
    this.d3Self.attr("transform", "translate(" + this.x * this.stage.blockSize + ", " + this.y * this.stage.blockSize + ")");
  };

  return Block;
}();

exports.default = Block;
},{"d3-selection":"node_modules/d3-selection/src/index.js","./possibleForms":"src/possibleForms.ts","./utils":"src/utils.ts"}],"src/stage.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var block_1 = __importDefault(require("./block"));

var d3_selection_1 = require("d3-selection");

var utils_1 = require("./utils");

var tetris_1 = require("./tetris");

var Stage =
/** @class */
function () {
  function Stage(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.width,
        width = _c === void 0 ? 10 : _c,
        _d = _b.height,
        height = _d === void 0 ? 20 : _d,
        _e = _b.blockSize,
        blockSize = _e === void 0 ? 24 : _e,
        _f = _b.gridGutterSize,
        gridGutterSize = _f === void 0 ? 1 : _f,
        _g = _b.gridOverBlocks,
        gridOverBlocks = _g === void 0 ? true : _g;

    this.settledBlocks = [];
    this.queue = [];
    this.blockIndex = 1;
    this.isGameOver = false;
    this.clearedLines = 0;

    this.onKeyDown = function (e) {
      var _this = this;

      switch (e.code) {
        case "ArrowRight":
          if (!this.blockWillCollideXOnNextTick(this.activeBlock, 1)) {
            return this.activeBlock.moveX(1);
          }

          break;

        case "ArrowLeft":
          if (!this.blockWillCollideXOnNextTick(this.activeBlock, -1)) {
            return this.activeBlock.moveX(-1);
          }

          break;

        case "ArrowDown":
          return this.tick();

        case "ArrowUp":
          while (!this.blockWillCollideYOnNextTick(this.activeBlock)) {
            this.activeBlock.moveDown();
          }

          clearInterval(this.tickInterval);
          this.tickInterval = window.setInterval(function () {
            _this.tick();
          }, 1000);
          return this.finishBlock(this.activeBlock);

        case "Space":
          return this.activeBlock.rotate();
      }
    }.bind(this);

    d3_selection_1.selectAll("body").append("div").attr("class", "stage").append("svg");
    this.gridWidth = width;
    this.gridHeight = height;
    this.blockSize = blockSize;
    this.gridGutterSize = gridGutterSize;
    this.gridOverBlocks = gridOverBlocks;
    this.initUI();
    this.initializeInternalGrid();
    this.activeBlock = new block_1.default(this.blockIndex, this);
    document.addEventListener("keydown", this.onKeyDown);
    this.tickInterval = window.setInterval(function () {
      _this.tick();
    }, 1000);
  }

  Stage.prototype.initializeInternalGrid = function () {
    this.internalGrid = [];

    for (var y = 0; y < this.gridHeight; y++) {
      this.internalGrid.push([]);

      for (var x = 0; x < this.gridWidth; x++) {
        this.internalGrid[y][x] = 0;
      }
    }
  };

  Stage.prototype.tick = function () {
    if (this.isGameOver) {
      this.beforeDestroy();
      tetris_1.setGameState("gameOver");
      return;
    }

    if (this.blockWillCollideYOnNextTick(this.activeBlock)) {
      this.finishBlock(this.activeBlock);
    } else {
      this.activeBlock.moveDown();
    }
  };

  Stage.prototype.finishBlock = function (block) {
    var _this = this;

    this.settledBlocks.push(block);
    this.placeBlockInGrid(block);
    this.activeBlock = new block_1.default(++this.blockIndex, this);

    if (this.blockWillCollideYOnNextTick(this.activeBlock)) {
      return this.isGameOver = true;
    }

    this.completedRows.map(function (rowIndex) {
      _this.clearedLines++;

      _this.updateScore();

      var uniqueBlockIdsInRow = utils_1.uniq(_this.internalGrid[rowIndex]);
      var blocksIdsThatShouldFall = utils_1.uniq(_this.internalGrid.filter(function (row, i) {
        return i < rowIndex;
      }) //
      .flat().filter(function (cell) {
        return cell > 0;
      }).filter(function (gridCel) {
        return !uniqueBlockIdsInRow.includes(gridCel);
      }));

      _this.settledBlocks.filter(function (settledBlock) {
        return uniqueBlockIdsInRow.includes(settledBlock.id);
      }).forEach(function (blockWithClearedRow) {
        return blockWithClearedRow.clearRow(rowIndex);
      });

      blocksIdsThatShouldFall.forEach(function (blockId) {
        return _this.settledBlocks[blockId - 1].moveDown();
      });

      _this.internalGrid.splice(rowIndex, 1);

      _this.internalGrid.unshift(new Array(_this.gridWidth).fill(0));
    });
  };

  Stage.prototype.updateScore = function () {
    d3_selection_1.select(".score").text(this.clearedLines);
  };

  Stage.prototype.placeBlockInGrid = function (block) {
    var _this = this;

    block.shape.map(function (y, yIndex) {
      y.map(function (x, xIndex) {
        if (x && y) {
          _this.internalGrid[yIndex + block.y][xIndex + block.x] = block.id;
        }
      });
    });
  };

  Stage.prototype.blockWillCollideYOnNextTick = function (block) {
    var _this = this;

    return block.shape.map(function (row, rowIndex) {
      return row.map(function (atom, columnIndex) {
        if (!atom) return false; //Empty atom in this slot

        if (block.y + rowIndex + 1 >= _this.gridHeight) {
          return true; //Block reached bottom of stage
        }

        return (//returns the value of the target spot in the internal grid for the atom
          _this.internalGrid[block.y + rowIndex + 1] && _this.internalGrid[block.y + rowIndex + 1][block.x + columnIndex]
        );
      });
    }).flat().some(function (d) {
      return d;
    });
  };

  Stage.prototype.blockWillCollideXOnNextTick = function (block, dir) {
    var _this = this;

    return block.shape.map(function (row, rowIndex) {
      return row.map(function (atom, columnIndex) {
        if (!atom) return false;
        return (//returns the value of the target spot in the internal grid for the atom
          _this.internalGrid[block.y + rowIndex] && _this.internalGrid[block.y + rowIndex][block.x + columnIndex + dir]
        );
      });
    }).flat().some(function (d) {
      return d;
    });
  };

  Object.defineProperty(Stage.prototype, "completedRows", {
    get: function get() {
      console.log("called getter");
      return this.internalGrid.reduce(function (acc, row, rowIndex) {
        if (row.every(function (d) {
          return d;
        })) {
          acc.push(rowIndex);
        }

        return acc;
      }, []);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Stage.prototype, "score", {
    get: function get() {
      return this.clearedLines;
    },
    enumerable: false,
    configurable: true
  });

  Stage.prototype.initUI = function () {
    this.drawGridLines();
    d3_selection_1.select("body").append("div").attr("class", "score").text(this.score);
  };

  Stage.prototype.drawGridLines = function (x, y, blockSize) {
    if (x === void 0) {
      x = this.gridWidth;
    }

    if (y === void 0) {
      y = this.gridHeight;
    }

    if (blockSize === void 0) {
      blockSize = this.blockSize;
    }

    var grid = d3_selection_1.selectAll(".stage svg").attr("style", "width: " + x * blockSize + "px; height: " + y * blockSize + "px").append("g").attr("class", "gridlines").attr("width", x * blockSize).attr("height", y * blockSize).attr("style", "stroke-width: " + this.gridGutterSize + "px").attr("viewBox", "0 0 " + x * blockSize + " " + y * blockSize);
    var rows = grid.append("g").attr("class", "rows");
    var columns = grid.append("g").attr("class", "columns");

    for (var i = 0; i < y + 1; i++) {
      rows.append("line").attr("x1", 0).attr("x2", x * blockSize).attr("y1", i * blockSize).attr("y2", i * blockSize);
    }

    for (var i = 0; i < x + 1; i++) {
      columns.append("line").attr("y1", 0).attr("y2", y * blockSize).attr("x1", i * blockSize).attr("x2", i * blockSize);
    }
  };

  Stage.prototype.beforeDestroy = function () {
    clearInterval(this.tickInterval);
    document.removeEventListener("keydown", this.onKeyDown);
  };

  return Stage;
}();

exports.default = Stage;
},{"./block":"src/block.ts","d3-selection":"node_modules/d3-selection/src/index.js","./utils":"src/utils.ts","./tetris":"src/tetris.ts"}],"src/splash.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var d3_selection_1 = require("d3-selection");

var tetris_1 = require("./tetris");

var Splash =
/** @class */
function () {
  function Splash() {
    var splash = d3_selection_1.select("body").append("div").attr("class", "splash");
    splash.append("div").attr("class", "title").text("Tetris");
    splash.append("div").attr("class", "subtitle").text("by Berend");
    splash.append("div").attr("class", "begin").selectAll("span").data("press spacebar to begin".split("")).enter().append("span").attr("class", "letter").attr("style", function (d, i) {
      return "animation-delay: -" + i * 2 + "s";
    }).text(function (d) {
      return d;
    });

    var onKeyDown = function onKeyDown(e) {
      if (e.code === "Space") {
        window.removeEventListener("keydown", onKeyDown);
        d3_selection_1.select(".splash").remove();
        tetris_1.setGameState("playing");
      }
    };

    window.addEventListener("keydown", onKeyDown);
  }

  return Splash;
}();

exports.default = Splash;
},{"d3-selection":"node_modules/d3-selection/src/index.js","./tetris":"src/tetris.ts"}],"src/gameOver.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var d3_selection_1 = require("d3-selection");

var tetris_1 = require("./tetris");

var GameOver =
/** @class */
function () {
  function GameOver() {
    d3_selection_1.select("body").append("div").attr("class", "gameOver").attr('style', function (d, i) {
      return "animation-delay: " + i;
    }).text("u dea, press space to try again");

    var onKeyDown = function onKeyDown(e) {
      if (e.code === "Space") {
        window.removeEventListener("keydown", onKeyDown);
        d3_selection_1.select(".stage").remove();
        d3_selection_1.select(".gameOver").remove();
        d3_selection_1.select(".score").remove();
        tetris_1.setGameState("playing");
      }
    };

    window.addEventListener("keydown", onKeyDown);
  }

  return GameOver;
}();

exports.default = GameOver;
},{"d3-selection":"node_modules/d3-selection/src/index.js","./tetris":"src/tetris.ts"}],"src/tetris.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGameState = void 0;

var stage_1 = __importDefault(require("./stage"));

var splash_1 = __importDefault(require("./splash"));

var gameOver_1 = __importDefault(require("./gameOver"));

function setGameState(gameState) {
  gameState = gameState;

  switch (gameState) {
    case "splash":
      return new splash_1.default();

    case "playing":
      var stage = new stage_1.default();
      break;

    case "gameOver":
      return new gameOver_1.default();
  }
}

exports.setGameState = setGameState;
setGameState('splash');
},{"./stage":"src/stage.ts","./splash":"src/splash.ts","./gameOver":"src/gameOver.ts"}],"../../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52862" + '/');

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
},{}]},{},["../../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/tetris.ts"], null)
//# sourceMappingURL=/tetris.44aabff4.js.map