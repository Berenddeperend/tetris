parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"RhqW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={gridX:20,gridY:10,gridLineWidth:1,blockSize:24,gridOverBlocks:!0};
},{}],"UzOB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.xhtml=void 0;var t="http://www.w3.org/1999/xhtml";exports.xhtml=t;var w={svg:"http://www.w3.org/2000/svg",xhtml:t,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};exports.default=w;
},{}],"OLJ5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;var e=r(require("./namespaces.js"));function r(e){return e&&e.__esModule?e:{default:e}}function t(r){var t=r+="",s=t.indexOf(":");return s>=0&&"xmlns"!==(t=r.slice(0,s))&&(r=r.slice(s+1)),e.default.hasOwnProperty(t)?{space:e.default[t],local:r}:r}
},{"./namespaces.js":"UzOB"}],"EIjt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var e=n(require("./namespace.js")),t=require("./namespaces.js");function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return function(){var n=this.ownerDocument,r=this.namespaceURI;return r===t.xhtml&&n.documentElement.namespaceURI===t.xhtml?n.createElement(e):n.createElementNS(r,e)}}function u(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function a(t){var n=(0,e.default)(t);return(n.local?u:r)(n)}
},{"./namespace.js":"OLJ5","./namespaces.js":"UzOB"}],"xs2I":[function(require,module,exports) {
"use strict";function e(){}function t(t){return null==t?e:function(){return this.querySelector(t)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"LRy5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_;var e=require("./index.js"),t=r(require("../selector.js"));function r(e){return e&&e.__esModule?e:{default:e}}function _(r){"function"!=typeof r&&(r=(0,t.default)(r));for(var _=this._groups,a=_.length,n=new Array(a),u=0;u<a;++u)for(var o,s,i=_[u],l=i.length,d=n[u]=new Array(l),f=0;f<l;++f)(o=i[f])&&(s=r.call(o,o.__data__,f,i))&&("__data__"in o&&(s.__data__=o.__data__),d[f]=s);return new e.Selection(n,this._parents)}
},{"./index.js":"jpDG","../selector.js":"xs2I"}],"TVIB":[function(require,module,exports) {
"use strict";function e(e){return"object"==typeof e&&"length"in e?e:Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"mHY5":[function(require,module,exports) {
"use strict";function e(){return[]}function t(t){return null==t?e:function(){return this.querySelectorAll(t)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"ijGs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var e=require("./index.js"),r=u(require("../array.js")),t=u(require("../selectorAll.js"));function u(e){return e&&e.__esModule?e:{default:e}}function n(e){return function(){var t=e.apply(this,arguments);return null==t?[]:(0,r.default)(t)}}function l(r){r="function"==typeof r?n(r):(0,t.default)(r);for(var u=this._groups,l=u.length,o=[],a=[],s=0;s<l;++s)for(var i,f=u[s],c=f.length,d=0;d<c;++d)(i=f[d])&&(o.push(r.call(i,i.__data__,d,f)),a.push(i));return new e.Selection(o,a)}
},{"./index.js":"jpDG","../array.js":"TVIB","../selectorAll.js":"mHY5"}],"PkZe":[function(require,module,exports) {
"use strict";function t(t){return function(){return this.matches(t)}}function e(t){return function(e){return e.matches(t)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t,exports.childMatcher=e;
},{}],"o9VE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var t=require("../matcher.js"),e=Array.prototype.find;function r(t){return function(){return e.call(this.children,t)}}function n(){return this.firstElementChild}function i(e){return this.select(null==e?n:r("function"==typeof e?e:(0,t.childMatcher)(e)))}
},{"../matcher.js":"PkZe"}],"VY5c":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var e=require("../matcher.js"),t=Array.prototype.filter;function r(){return this.children}function n(e){return function(){return t.call(this.children,e)}}function i(t){return this.selectAll(null==t?r:n("function"==typeof t?t:(0,e.childMatcher)(t)))}
},{"../matcher.js":"PkZe"}],"hrVj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=require("./index.js"),r=t(require("../matcher.js"));function t(e){return e&&e.__esModule?e:{default:e}}function n(t){"function"!=typeof t&&(t=(0,r.default)(t));for(var n=this._groups,u=n.length,a=new Array(u),o=0;o<u;++o)for(var s,i=n[o],l=i.length,f=a[o]=[],_=0;_<l;++_)(s=i[_])&&t.call(s,s.__data__,_,i)&&f.push(s);return new e.Selection(a,this._parents)}
},{"./index.js":"jpDG","../matcher.js":"PkZe"}],"NmjR":[function(require,module,exports) {
"use strict";function e(e){return new Array(e.length)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"wXei":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n,exports.EnterNode=s;var e=r(require("./sparse.js")),t=require("./index.js");function r(e){return e&&e.__esModule?e:{default:e}}function n(){return new t.Selection(this._enter||this._groups.map(e.default),this._parents)}function s(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}s.prototype={constructor:s,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};
},{"./sparse.js":"NmjR","./index.js":"jpDG"}],"H3qE":[function(require,module,exports) {
"use strict";function e(e){return function(){return e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"QmPF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=require("./index.js"),r=require("./enter.js"),t=a(require("../array.js")),n=a(require("../constant.js"));function a(e){return e&&e.__esModule?e:{default:e}}function _(e,t,n,a,_,o){for(var l,u=0,f=t.length,i=o.length;u<i;++u)(l=t[u])?(l.__data__=o[u],a[u]=l):n[u]=new r.EnterNode(e,o[u]);for(;u<f;++u)(l=t[u])&&(_[u]=l)}function o(e,t,n,a,_,o,l){var u,f,i,s=new Map,d=t.length,c=o.length,h=new Array(d);for(u=0;u<d;++u)(f=t[u])&&(h[u]=i=l.call(f,f.__data__,u,t)+"",s.has(i)?_[u]=f:s.set(i,f));for(u=0;u<c;++u)i=l.call(e,o[u],u,o)+"",(f=s.get(i))?(a[u]=f,f.__data__=o[u],s.delete(i)):n[u]=new r.EnterNode(e,o[u]);for(u=0;u<d;++u)(f=t[u])&&s.get(h[u])===f&&(_[u]=f)}function l(e){return e.__data__}function u(r,a){if(!arguments.length)return Array.from(this,l);var u=a?o:_,f=this._parents,i=this._groups;"function"!=typeof r&&(r=(0,n.default)(r));for(var s=i.length,d=new Array(s),c=new Array(s),h=new Array(s),g=0;g<s;++g){var w=f[g],y=i[g],v=y.length,A=(0,t.default)(r.call(w,w&&w.__data__,g,f)),p=A.length,j=c[g]=new Array(p),x=d[g]=new Array(p);u(w,y,j,x,h[g]=new Array(v),A,a);for(var q,M,E=0,N=0;E<p;++E)if(q=j[E]){for(E>=N&&(N=E+1);!(M=x[N])&&++N<p;);q._next=M||null}}return(d=new e.Selection(d,f))._enter=c,d._exit=h,d}
},{"./index.js":"jpDG","./enter.js":"wXei","../array.js":"TVIB","../constant.js":"H3qE"}],"tchs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s;var e=r(require("./sparse.js")),t=require("./index.js");function r(e){return e&&e.__esModule?e:{default:e}}function s(){return new t.Selection(this._exit||this._groups.map(e.default),this._parents)}
},{"./sparse.js":"NmjR","./index.js":"jpDG"}],"oO6z":[function(require,module,exports) {
"use strict";function e(e,t,r){var n=this.enter(),o=this,u=this.exit();return n="function"==typeof e?e(n):n.append(e+""),null!=t&&(o=t(o)),null==r?u.remove():r(u),n&&o?n.merge(o).order():o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"i5nV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=require("./index.js");function r(r){if(!(r instanceof e.Selection))throw new Error("invalid merge");for(var t=this._groups,n=r._groups,o=t.length,i=n.length,s=Math.min(o,i),a=new Array(o),l=0;l<s;++l)for(var u,f=t[l],h=n[l],c=f.length,g=a[l]=new Array(c),p=0;p<c;++p)(u=f[p]||h[p])&&(g[p]=u);for(;l<o;++l)a[l]=t[l];return new e.Selection(a,this._parents)}
},{"./index.js":"jpDG"}],"RepQ":[function(require,module,exports) {
"use strict";function e(){for(var e=this._groups,t=-1,r=e.length;++t<r;)for(var o,n=e[t],s=n.length-1,i=n[s];--s>=0;)(o=n[s])&&(i&&4^o.compareDocumentPosition(i)&&i.parentNode.insertBefore(o,i),i=o);return this}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"D8yW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;var r=require("./index.js");function e(e){function n(r,t){return r&&t?e(r.__data__,t.__data__):!r-!t}e||(e=t);for(var a=this._groups,o=a.length,u=new Array(o),_=0;_<o;++_){for(var s,i=a[_],d=i.length,f=u[_]=new Array(d),c=0;c<d;++c)(s=i[c])&&(f[c]=s);f.sort(n)}return new r.Selection(u,this._parents).order()}function t(r,e){return r<e?-1:r>e?1:r>=e?0:NaN}
},{"./index.js":"jpDG"}],"pbQ4":[function(require,module,exports) {
"use strict";function e(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"kO0T":[function(require,module,exports) {
"use strict";function e(){return Array.from(this)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"xFUP":[function(require,module,exports) {
"use strict";function e(){for(var e=this._groups,r=0,t=e.length;r<t;++r)for(var u=e[r],n=0,o=u.length;n<o;++n){var l=u[n];if(l)return l}return null}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"w9fp":[function(require,module,exports) {
"use strict";function e(){let e=0;for(const t of this)++e;return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"UFOA":[function(require,module,exports) {
"use strict";function e(){return!this.node()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"q4XW":[function(require,module,exports) {
"use strict";function e(e){for(var t=this._groups,r=0,o=t.length;r<o;++r)for(var s,a=t[r],l=0,u=a.length;l<u;++l)(s=a[l])&&e.call(s,s.__data__,l,a);return this}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"Tdf9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var t=e(require("../namespace.js"));function e(t){return t&&t.__esModule?t:{default:t}}function n(t){return function(){this.removeAttribute(t)}}function u(t){return function(){this.removeAttributeNS(t.space,t.local)}}function r(t,e){return function(){this.setAttribute(t,e)}}function i(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function o(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n)}}function c(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function l(e,l){var s=(0,t.default)(e);if(arguments.length<2){var a=this.node();return s.local?a.getAttributeNS(s.space,s.local):a.getAttribute(s)}return this.each((null==l?s.local?u:n:"function"==typeof l?s.local?c:o:s.local?i:r)(s,l))}
},{"../namespace.js":"OLJ5"}],"D1dR":[function(require,module,exports) {
"use strict";function e(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"VXjm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o,exports.styleValue=l;var e=t(require("../window.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(e){return function(){this.style.removeProperty(e)}}function n(e,t,r){return function(){this.style.setProperty(e,t,r)}}function u(e,t,r){return function(){var n=t.apply(this,arguments);null==n?this.style.removeProperty(e):this.style.setProperty(e,n,r)}}function o(e,t,o){return arguments.length>1?this.each((null==t?r:"function"==typeof t?u:n)(e,t,null==o?"":o)):l(this.node(),e)}function l(t,r){return t.style.getPropertyValue(r)||(0,e.default)(t).getComputedStyle(t,null).getPropertyValue(r)}
},{"../window.js":"D1dR"}],"QOWh":[function(require,module,exports) {
"use strict";function t(t){return function(){delete this[t]}}function e(t,e){return function(){this[t]=e}}function n(t,e){return function(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n}}function u(u,i){return arguments.length>1?this.each((null==i?t:"function"==typeof i?n:e)(u,i)):this.node()[u]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;
},{}],"rtNW":[function(require,module,exports) {
"use strict";function t(t){return t.trim().split(/^|\s+/)}function n(t){return t.classList||new e(t)}function e(n){this._node=n,this._names=t(n.getAttribute("class")||"")}function i(t,e){for(var i=n(t),s=-1,r=e.length;++s<r;)i.add(e[s])}function s(t,e){for(var i=n(t),s=-1,r=e.length;++s<r;)i.remove(e[s])}function r(t){return function(){i(this,t)}}function o(t){return function(){s(this,t)}}function u(t,n){return function(){(n.apply(this,arguments)?i:s)(this,t)}}function f(e,i){var s=t(e+"");if(arguments.length<2){for(var f=n(this.node()),c=-1,a=s.length;++c<a;)if(!f.contains(s[c]))return!1;return!0}return this.each(("function"==typeof i?u:i?r:o)(s,i))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=f,e.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};
},{}],"hAJ3":[function(require,module,exports) {
"use strict";function t(){this.textContent=""}function n(t){return function(){this.textContent=t}}function e(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function o(o){return arguments.length?this.each(null==o?t:("function"==typeof o?e:n)(o)):this.node().textContent}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o;
},{}],"FiSM":[function(require,module,exports) {
"use strict";function n(){this.innerHTML=""}function t(n){return function(){this.innerHTML=n}}function e(n){return function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}}function i(i){return arguments.length?this.each(null==i?n:("function"==typeof i?e:t)(i)):this.node().innerHTML}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;
},{}],"gvi7":[function(require,module,exports) {
"use strict";function e(){this.nextSibling&&this.parentNode.appendChild(this)}function t(){return this.each(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"gv51":[function(require,module,exports) {
"use strict";function e(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function t(){return this.each(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"efv1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=t(require("../creator.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(t){var r="function"==typeof t?t:(0,e.default)(t);return this.select(function(){return this.appendChild(r.apply(this,arguments))})}
},{"../creator.js":"EIjt"}],"ILQF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=r(require("../creator.js")),t=r(require("../selector.js"));function r(e){return e&&e.__esModule?e:{default:e}}function u(){return null}function n(r,n){var l="function"==typeof r?r:(0,e.default)(r),o=null==n?u:"function"==typeof n?n:(0,t.default)(n);return this.select(function(){return this.insertBefore(l.apply(this,arguments),o.apply(this,arguments)||null)})}
},{"../creator.js":"EIjt","../selector.js":"xs2I"}],"quBB":[function(require,module,exports) {
"use strict";function e(){var e=this.parentNode;e&&e.removeChild(this)}function t(){return this.each(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"UpcG":[function(require,module,exports) {
"use strict";function e(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function t(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function n(n){return this.select(n?t:e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;
},{}],"fuQ8":[function(require,module,exports) {
"use strict";function e(e){return arguments.length?this.property("__data__",e):this.node().__data__}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"j4rF":[function(require,module,exports) {
"use strict";function e(e){return function(t){e.call(this,t,this.__data__)}}function t(e){return e.trim().split(/^|\s+/).map(function(e){var t="",n=e.indexOf(".");return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}function n(e){return function(){var t=this.__on;if(t){for(var n,i=0,r=-1,o=t.length;i<o;++i)n=t[i],e.type&&n.type!==e.type||n.name!==e.name?t[++r]=n:this.removeEventListener(n.type,n.listener,n.options);++r?t.length=r:delete this.__on}}}function i(t,n,i){return function(){var r,o=this.__on,s=e(n);if(o)for(var a=0,u=o.length;a<u;++a)if((r=o[a]).type===t.type&&r.name===t.name)return this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=s,r.options=i),void(r.value=n);this.addEventListener(t.type,s,i),r={type:t.type,name:t.name,value:n,listener:s,options:i},o?o.push(r):this.__on=[r]}}function r(e,r,o){var s,a,u=t(e+""),p=u.length;if(!(arguments.length<2)){for(f=r?i:n,s=0;s<p;++s)this.each(f(u[s],r,o));return this}var f=this.node().__on;if(f)for(var l,h=0,v=f.length;h<v;++h)for(s=0,l=f[h];s<p;++s)if((a=u[s]).type===l.type&&a.name===l.name)return l.value}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;
},{}],"enVu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var t=e(require("../window.js"));function e(t){return t&&t.__esModule?t:{default:t}}function n(e,n,u){var i=(0,t.default)(e),r=i.CustomEvent;"function"==typeof r?r=new r(n,u):(r=i.document.createEvent("Event"),u?(r.initEvent(n,u.bubbles,u.cancelable),r.detail=u.detail):r.initEvent(n,!1,!1)),e.dispatchEvent(r)}function u(t,e){return function(){return n(this,t,e)}}function i(t,e){return function(){return n(this,t,e.apply(this,arguments))}}function r(t,e){return this.each(("function"==typeof e?i:u)(t,e))}
},{"../window.js":"D1dR"}],"rmGH":[function(require,module,exports) {
"use strict";function*e(){for(var e=this._groups,t=0,r=e.length;t<r;++t)for(var o,s=e[t],l=0,u=s.length;l<u;++l)(o=s[l])&&(yield o)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"jpDG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Selection=F,exports.default=exports.root=void 0;var e=B(require("./select.js")),r=B(require("./selectAll.js")),t=B(require("./selectChild.js")),u=B(require("./selectChildren.js")),l=B(require("./filter.js")),s=B(require("./data.js")),i=B(require("./enter.js")),a=B(require("./exit.js")),d=B(require("./join.js")),o=B(require("./merge.js")),f=B(require("./order.js")),n=B(require("./sort.js")),j=B(require("./call.js")),q=B(require("./nodes.js")),c=B(require("./node.js")),p=B(require("./size.js")),m=B(require("./empty.js")),h=B(require("./each.js")),x=B(require("./attr.js")),y=B(require("./style.js")),v=B(require("./property.js")),_=B(require("./classed.js")),C=B(require("./text.js")),g=B(require("./html.js")),w=B(require("./raise.js")),b=B(require("./lower.js")),z=B(require("./append.js")),A=B(require("./insert.js")),M=B(require("./remove.js")),S=B(require("./clone.js")),E=B(require("./datum.js")),O=B(require("./on.js")),P=B(require("./dispatch.js")),k=B(require("./iterator.js"));function B(e){return e&&e.__esModule?e:{default:e}}var D=[null];function F(e,r){this._groups=e,this._parents=r}function G(){return new F([[document.documentElement]],D)}function H(){return this}exports.root=D,F.prototype=G.prototype={constructor:F,select:e.default,selectAll:r.default,selectChild:t.default,selectChildren:u.default,filter:l.default,data:s.default,enter:i.default,exit:a.default,join:d.default,merge:o.default,selection:H,order:f.default,sort:n.default,call:j.default,nodes:q.default,node:c.default,size:p.default,empty:m.default,each:h.default,attr:x.default,style:y.default,property:v.default,classed:_.default,text:C.default,html:g.default,raise:w.default,lower:b.default,append:z.default,insert:A.default,remove:M.default,clone:S.default,datum:E.default,on:O.default,dispatch:P.default,[Symbol.iterator]:k.default};var I=G;exports.default=I;
},{"./select.js":"LRy5","./selectAll.js":"ijGs","./selectChild.js":"o9VE","./selectChildren.js":"VY5c","./filter.js":"hrVj","./data.js":"QmPF","./enter.js":"wXei","./exit.js":"tchs","./join.js":"oO6z","./merge.js":"i5nV","./order.js":"RepQ","./sort.js":"D8yW","./call.js":"pbQ4","./nodes.js":"kO0T","./node.js":"xFUP","./size.js":"w9fp","./empty.js":"UFOA","./each.js":"q4XW","./attr.js":"Tdf9","./style.js":"VXjm","./property.js":"QOWh","./classed.js":"rtNW","./text.js":"hAJ3","./html.js":"FiSM","./raise.js":"gvi7","./lower.js":"gv51","./append.js":"efv1","./insert.js":"ILQF","./remove.js":"quBB","./clone.js":"UpcG","./datum.js":"fuQ8","./on.js":"j4rF","./dispatch.js":"enVu","./iterator.js":"rmGH"}],"iTOx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;var e=require("./selection/index.js");function t(t){return"string"==typeof t?new e.Selection([[document.querySelector(t)]],[document.documentElement]):new e.Selection([[t]],e.root)}
},{"./selection/index.js":"jpDG"}],"tmZM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=r(require("./creator.js")),t=r(require("./select.js"));function r(e){return e&&e.__esModule?e:{default:e}}function u(r){return(0,t.default)((0,e.default)(r).call(document.documentElement))}
},{"./creator.js":"EIjt","./select.js":"iTOx"}],"JuPP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;var t=0;function e(){return new r}function r(){this._="@"+(++t).toString(36)}r.prototype=e.prototype={constructor:r,get:function(t){for(var e=this._;!(e in t);)if(!(t=t.parentNode))return;return t[e]},set:function(t,e){return t[this._]=e},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};
},{}],"mu9P":[function(require,module,exports) {
"use strict";function e(e){let t;for(;t=e.sourceEvent;)e=t;return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"SNxp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=t(require("./sourceEvent.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(t,r){if(t=(0,e.default)(t),void 0===r&&(r=t.currentTarget),r){var n=r.ownerSVGElement||r;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=t.clientX,i.y=t.clientY,[(i=i.matrixTransform(r.getScreenCTM().inverse())).x,i.y]}if(r.getBoundingClientRect){var u=r.getBoundingClientRect();return[t.clientX-u.left-r.clientLeft,t.clientY-u.top-r.clientTop]}}return[t.pageX,t.pageY]}
},{"./sourceEvent.js":"mu9P"}],"mxYx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=t(require("./pointer.js")),r=t(require("./sourceEvent.js"));function t(e){return e&&e.__esModule?e:{default:e}}function u(t,u){return t.target&&(t=(0,r.default)(t),void 0===u&&(u=t.currentTarget),t=t.touches||[t]),Array.from(t,r=>(0,e.default)(r,u))}
},{"./pointer.js":"SNxp","./sourceEvent.js":"mu9P"}],"toE0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=r(require("./array.js")),t=require("./selection/index.js");function r(e){return e&&e.__esModule?e:{default:e}}function n(r){return"string"==typeof r?new t.Selection([document.querySelectorAll(r)],[document.documentElement]):new t.Selection([null==r?[]:(0,e.default)(r)],t.root)}
},{"./array.js":"TVIB","./selection/index.js":"jpDG"}],"lm1C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"create",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"creator",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"local",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"matcher",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(exports,"namespace",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(exports,"namespaces",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(exports,"pointer",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(exports,"pointers",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(exports,"select",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(exports,"selectAll",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(exports,"selection",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(exports,"selector",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(exports,"selectorAll",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(exports,"style",{enumerable:!0,get:function(){return d.styleValue}}),Object.defineProperty(exports,"window",{enumerable:!0,get:function(){return b.default}});var e=j(require("./create.js")),r=j(require("./creator.js")),t=j(require("./local.js")),n=j(require("./matcher.js")),u=j(require("./namespace.js")),o=j(require("./namespaces.js")),l=j(require("./pointer.js")),i=j(require("./pointers.js")),s=j(require("./select.js")),c=j(require("./selectAll.js")),a=j(require("./selection/index.js")),f=j(require("./selector.js")),p=j(require("./selectorAll.js")),d=require("./selection/style.js"),b=j(require("./window.js"));function j(e){return e&&e.__esModule?e:{default:e}}
},{"./create.js":"tmZM","./creator.js":"EIjt","./local.js":"JuPP","./matcher.js":"PkZe","./namespace.js":"OLJ5","./namespaces.js":"UzOB","./pointer.js":"SNxp","./pointers.js":"mxYx","./select.js":"iTOx","./selectAll.js":"toE0","./selection/index.js":"jpDG","./selector.js":"xs2I","./selectorAll.js":"mHY5","./selection/style.js":"VXjm","./window.js":"D1dR"}],"RYKK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.possibleForms=void 0,exports.possibleForms=[{color:"purple",shape:[[0,1,0],[1,1,1]]},{color:"green",shape:[[0,1,1],[1,1,0]]},{color:"red",shape:[[1,1,0],[0,1,1]]},{color:"yellow",shape:[[1,1],[1,1]]},{color:"red",shape:[[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0],[0,1,0,1,0],[1,1,0,1,1],[1,0,0,0,1],[0,1,1,1,0]]},{color:"light-blue",shape:[[1,1,1,1]]},{color:"dark-blue",shape:[[1,0,0],[1,1,1]]},{color:"orange",shape:[[0,0,1],[1,1,1]]}];
},{}],"IyTV":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("d3-selection"),i=t(require("./constants")),s=require("./possibleForms"),o=function(){function t(t){void 0===t&&(t=0),this.x=0,this.y=0;var e=s.possibleForms[Math.floor(Math.random()*s.possibleForms.length)];this.shape=e.shape,this.color=e.color,this.x=Math.floor((i.default.gridX-this.shape[0].length)/2),this.id=t,this.init()}return t.prototype.rotate=function(){for(var t=this.shape[0].length,e=this.shape.length,i=[],s=0;s<t;s++)i.push([]);for(var o=0;o<e;o++)for(var r=0;r<t;r++)i[r][o]=this.shape[o][r];this.shape=i.map(function(t){return t.reverse()}),this.redraw()},t.prototype.init=function(){this.d3Self=e.selectAll(".stage svg").insert("g",i.default.gridOverBlocks?":first-child":null).attr("class","block "+this.color),this.redraw()},t.prototype.redraw=function(){var t=this;this.d3Self.selectAll("rect").remove(),this.shape.map(function(e,s){e.map(function(o,r){o&&e&&t.d3Self.append("rect").attr("width",i.default.blockSize).attr("height",i.default.blockSize).attr("x",r*i.default.blockSize).attr("y",s*i.default.blockSize).attr("class","atom")})}),this.updatePosition()},t.prototype.moveDown=function(){this.y++,this.updatePosition()},t.prototype.moveX=function(t){this.x+t+this.shape[0].length>i.default.gridX||this.x+t<0||(this.x=this.x+t,this.updatePosition())},t.prototype.updatePosition=function(){this.d3Self.attr("transform","translate("+this.x*i.default.blockSize+", "+this.y*i.default.blockSize+")")},t}();exports.default=o;
},{"d3-selection":"lm1C","./constants":"RhqW","./possibleForms":"RYKK"}],"Vp1G":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=t(require("./block")),e=require("d3-selection"),r=t(require("./constants")),o=function(){function t(t){var e=void 0===t?{}:t,r=e.width,o=void 0===r?10:r,n=e.height,c=void 0===n?10:n,a=e.blockSize,s=void 0===a?10:a,l=e.gridGutterSize,h=void 0===l?1:l;this.settledBlocks=[],this.queue=[],this.blockCount=0,this.width=o,this.height=c,this.blockSize=s,this.gridGutterSize=h,this.drawGridLines(),this.initializeInternalGrid(),this.setEventListeners(),this.activeBlock=new i.default}return t.prototype.initializeInternalGrid=function(){this.internalGrid=[];for(var t=0;t<this.height;t++){this.internalGrid.push([]);for(var i=0;i<this.width;i++)this.internalGrid[t][i]=0}},t.prototype.setEventListeners=function(){var t=this;document.addEventListener("keydown",function(i){switch(i.code){case"ArrowRight":return t.activeBlock.moveX(1);case"ArrowLeft":return t.activeBlock.moveX(-1);case"ArrowDown":return t.tick();case"ArrowUp":for(;!t.activeBlockWillCollideYOnNextTick();)t.activeBlock.moveDown();t.finishCurrentBlock();case"Space":return t.activeBlock.rotate()}})},t.prototype.tick=function(){this.activeBlockWillCollideYOnNextTick()?this.finishCurrentBlock():this.activeBlock.moveDown()},t.prototype.finishCurrentBlock=function(){this.settledBlocks.push(this.activeBlock),this.placeActiveBlockInGrid(),this.activeBlock=new i.default(++this.blockCount)},t.prototype.placeActiveBlockInGrid=function(){var t=this;this.activeBlock.shape.map(function(i,e){i.map(function(r,o){r&&i&&(t.internalGrid[e+t.activeBlock.y][o+t.activeBlock.x]=1)})})},t.prototype.activeBlockWillCollideYOnNextTick=function(){var t=this;return this.activeBlock.shape.map(function(i,e,o){return i.map(function(i,o){if(!i)return!1;if(t.activeBlock.y+e+1>=r.default.gridY)return console.log("reached bottom of stage"),!0;var n=t.internalGrid[t.activeBlock.y+e+1]&&t.internalGrid[t.activeBlock.y+e+1][t.activeBlock.x+o];return console.log("targetCellOnGrid: ",n),n})}).flat().some(function(t){return t})},t.prototype.drawGridLines=function(t,i,r){void 0===t&&(t=this.width),void 0===i&&(i=this.height),void 0===r&&(r=this.blockSize);for(var o=e.selectAll(".stage svg").append("g").attr("class","gridlines").attr("width",t*r).attr("height",i*r).attr("style","stroke-width: "+this.gridGutterSize+"px").attr("viewBox","0 0 "+t*r+" "+i*r),n=o.append("g").attr("class","rows"),c=o.append("g").attr("class","columns"),a=0;a<i+1;a++)n.append("line").attr("x1",0).attr("x2",t*r).attr("y1",a*r).attr("y2",a*r);for(a=0;a<t+1;a++)c.append("line").attr("y1",0).attr("y2",i*r).attr("x1",a*r).attr("x2",a*r)},t}();exports.default=o;
},{"./block":"IyTV","d3-selection":"lm1C","./constants":"RhqW"}],"rDTz":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./constants")),i=require("d3-selection"),r=e(require("./stage")),u=i.selectAll(".stage").append("svg"),d=new r.default({width:t.default.gridX,height:t.default.gridY,blockSize:t.default.blockSize,gridGutterSize:t.default.gridLineWidth});function l(){}window.setInterval(function(){d.tick()},1e3),l();
},{"./constants":"RhqW","d3-selection":"lm1C","./stage":"Vp1G"}]},{},["rDTz"], null)
//# sourceMappingURL=/tetris.a4a103ab.js.map