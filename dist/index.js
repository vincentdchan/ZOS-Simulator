/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Window = exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Date:   2017-08-12 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ************************/

var _main = __webpack_require__(7);

var _main2 = _interopRequireDefault(_main);

var _htmlparser = __webpack_require__(10);

var htmlparser = _interopRequireWildcard(_htmlparser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
    _createClass(Component, [{
        key: "dom",
        set: function set(value) {
            this._dom = value;
        },
        get: function get() {
            return this._dom;
        }
    }]);

    function Component() {
        _classCallCheck(this, Component);

        this._slot = {};
        this.$refs = {};
    }

    _createClass(Component, [{
        key: "onMounted",
        value: function onMounted() {}
    }, {
        key: "Render",
        value: function Render(dom) {
            dom.appendChild(this._dom);
            this.onMounted();
        }
    }, {
        key: "RenderTemplate",
        value: function RenderTemplate(template) {
            var handle = new htmlparser.DefaultHandler(function (error, dom) {
                if (error) {
                    console.error(error);
                }
            });

            var parser = new htmlparser.Parser(handle);
            parser.parseComplete(template);
            // console.log(JSON.stringify(handle.dom, null, 2));
            var doms = this.vListToDomList(handle.dom);
            return doms[0];
        }
    }, {
        key: "vListToDomList",
        value: function vListToDomList(vlist) {
            var _this = this;

            return vlist.map(function (dom_node) {
                switch (dom_node.type) {
                    case "text":
                        return document.createTextNode(dom_node.data);
                    case "tag":
                        var dom = void 0;
                        if (dom_node.name == "slot") {
                            dom = document.createElement("div");
                            if ("attribs" in dom_node && "name" in dom_node.attribs) {
                                var slot_name = dom_node.attribs.name;
                                _this._slot[slot_name] = dom;
                                dom.setAttribute('data-slot-name', slot_name);
                            } else {
                                _this._slot['default'] = dom;
                                dom.setAttribute('data-slot-name', 'default');
                            }
                        } else {
                            dom = document.createElement(dom_node.name);
                            for (var attr_key in dom_node.attribs) {
                                if (attr_key == 'ref') {
                                    var attr_value = dom_node.attribs[attr_key];
                                    _this.$refs[attr_value] = dom;
                                } else {
                                    var _attr_value = dom_node.attribs[attr_key];
                                    dom.setAttribute(attr_key, _attr_value);
                                }
                            }
                            if ('children' in dom_node) {
                                _this.vListToDomList(dom_node['children']).forEach(function (value) {
                                    dom.appendChild(value);
                                });
                            }
                        }
                        return dom;
                    case "comment":
                        break;
                    case "script":
                        break;
                    default:
                        console.log(dom_node);
                }
            });
        }
    }, {
        key: "Slot",
        value: function Slot(name, value) {
            var slot_dom = this._slot[name];
            var parent = slot_dom.parentNode;
            parent.replaceChild(value, slot_dom);
            this._slot[name] = value;
        }

        // unbind the callback from higher dom

    }, {
        key: "Dispose",
        value: function Dispose() {}
    }]);

    return Component;
}();

var TitleBar = function (_Component) {
    _inherits(TitleBar, _Component);

    function TitleBar() {
        _classCallCheck(this, TitleBar);

        return _possibleConstructorReturn(this, (TitleBar.__proto__ || Object.getPrototypeOf(TitleBar)).apply(this, arguments));
    }

    _createClass(TitleBar, [{
        key: "Render",
        value: function Render() {}
    }]);

    return TitleBar;
}(Component);

var window_template = "<div class=\"window\" ref=\"frame\">\n    <div class=\"titleBar unselectable\" ref=\"titlebar\">\n        <div class=\"right\">\n            <i class=\"fa fa-window-close\" aria-hidden=\"true\"></i>\n        </div>\n        <p class=\"name\" ref=\"title_content\"></p>\n    </div>\n    <div>\n        <slot name=\"default\" />\n    </div>\n</div>";

var Window = exports.Window = function (_Component2) {
    _inherits(Window, _Component2);

    function Window(wm) {
        _classCallCheck(this, Window);

        var _this3 = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this));

        _this3._dom = _this3.RenderTemplate(window_template);

        _this3.x = 16;
        _this3.y = 16;
        _this3.width = 400;
        _this3.height = 300;
        _this3.title = "Window";
        _this3.titleBarPressed = false;
        _this3._focused = false;
        _this3.wm = wm;
        _this3.zIndex = _this3.wm.zIndexCounter();

        _this3.windowsID = _this3.wm.GetNewId();
        _this3.wm.addEventListener("focusedWindowChanged", function (id) {
            if (id === _this3.windowsID) {
                _this3.focus();
            } else {
                _this3.unfocus();
            }
        });
        window.addEventListener("mousemove", function (event) {
            return _this3.onMouseMove(event);
        });

        _this3.$refs.titlebar.addEventListener('mouseup', function (e) {
            return _this3.onTitleBarMouseUp(e);
        });
        _this3.$refs.titlebar.addEventListener('mousedown', function (e) {
            return _this3.onTitleBarMouseDown(e);
        });
        _this3._dom.addEventListener('mousedown', function (e) {
            return _this3.onMouseDown(e);
        });
        return _this3;
    }

    _createClass(Window, [{
        key: "focus",
        value: function focus() {
            if (!this._focused) {
                this._focused = true;
                this.zIndex = this.wm.zIndexCounter();
                this._dom.classList.add('glowing-border');
            }
        }
    }, {
        key: "unfocus",
        value: function unfocus() {
            this._focused = false;
            this._dom.classList.remove('glowing-border');
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(event) {
            this.wm.FocusWindow(this.windowsID);
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(event) {
            if (this.titleBarPressed) {
                this.x = event.clientX - this.lastOffset.x, this.y = event.clientY - this.lastOffset.y, this.lastOffset = {
                    x: event.clientX - this.x,
                    y: event.clientY - this.y
                };
            }
        }
    }, {
        key: "onTitleBarMouseDown",
        value: function onTitleBarMouseDown(event) {
            this.titleBarPressed = true;
            this.lastOffset = {
                x: event.clientX - this.x,
                y: event.clientY - this.y
            };

            this.zIndex = this.wm.zIndexCounter();
        }
    }, {
        key: "onTitleBarMouseUp",
        value: function onTitleBarMouseUp(event) {
            this.titleBarPressed = false;
        }
    }, {
        key: "title",
        get: function get() {
            return this._title;
        },
        set: function set(value) {
            if (this._title != value) {
                this.$refs['title_content'].innerText = value;
                this._title = value;
            }
        }
    }, {
        key: "x",
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            if (this._x !== value) {
                this._x = value;
                this._dom.style.left = value + 'px';
            }
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            if (this._y !== value) {
                this._y = value;
                this._dom.style.top = value + 'px';
            }
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(value) {
            if (this._width !== value) {
                this._width = value;
                this._dom.style.width = value + 'px';
            }
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(value) {
            if (this._height !== value) {
                this._height = value;
                this._dom.style.height = value + 'px';
            }
        }
    }, {
        key: "zIndex",
        get: function get() {
            return this._zIndex;
        },
        set: function set(value) {
            if (this._zIndex !== value) {
                this._zIndex = value;
                this._dom.style.zIndex = value;
            }
        }
    }]);

    return Window;
}(Component);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _WindowsManager = __webpack_require__(5);

var _Window = __webpack_require__(0);

var _TextEditor = __webpack_require__(11);

var _FileWindow = __webpack_require__(14);

var _ProgramExecutor = __webpack_require__(18);

var _TaskManager = __webpack_require__(22);

/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

var _require = __webpack_require__(21),
    VirtualLine = _require.VirtualLine;

var measure_font = "船";

document.addEventListener("DOMContentLoaded", function (event) {
    var canvas = document.getElementById("main-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.font = "12px Microsoft YaHei";

    var text = ctx.measureText(measure_font);
    var font_width = text.width;
    var font_height = text.height;

    var virtuallines = [];

    function Initialize() {
        virtuallines = [];

        var virtuallines_length = Math.ceil(canvas.width / font_width);

        for (var i = 0; i < virtuallines_length; i++) {
            var vl = new VirtualLine(i * (font_width + 2), font_width, canvas.height, font_width, 20);
            virtuallines.push(vl);
        }
    }

    window.addEventListener("resize", function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        Initialize();
    });

    Initialize();

    var lastTime = new Date();
    var accuTime = 0;

    function tick() {
        var now = new Date();
        var deltaTime = (now.getTime() - lastTime.getTime()) / 1000;

        accuTime += deltaTime;

        if (accuTime > 0.08) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            virtuallines.forEach(function (v) {
                v.paint(ctx, deltaTime);
            });
            accuTime = 0;
        }

        lastTime = now;

        requestAnimationFrame(tick);
    };

    tick();

    var wm = new _WindowsManager.WindowsManager();

    // ReactDOM.render(<div>
    //     <TextEditor 
    //         titleName="Untitled 2"
    //         windowsManager={wm} />
    //     <FileWindow 
    //         titleName="File Manager"
    //         windowsManager={wm} />
    //     <ProgramExecutor 
    //         titleName="ProgramExecutor"
    //         windowsManager={wm} />
    // </div>,
    //     document.getElementById('world'));
    var my_window = new _TextEditor.TextEditor(wm);
    var pe = new _ProgramExecutor.ProgramExecutor(wm);
    var fw = new _FileWindow.FileWindow(wm);
    var taskManager = new _TaskManager.TaskManager(wm);

    var world = document.getElementById('world');
    my_window.Render(world);
    pe.Render(world);
    fw.Render(world);
    taskManager.Render(world);
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WindowsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Emitter2 = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date:   2017-08-12 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ************************/

var WindowsManager = exports.WindowsManager = function (_Emitter) {
    _inherits(WindowsManager, _Emitter);

    function WindowsManager() {
        _classCallCheck(this, WindowsManager);

        var _this = _possibleConstructorReturn(this, (WindowsManager.__proto__ || Object.getPrototypeOf(WindowsManager)).call(this));

        _this._id_counter = 0;
        _this._focused_id = 0;

        var zIndex = 0;
        _this.zIndexCounter = function () {
            return zIndex++;
        };
        return _this;
    }

    _createClass(WindowsManager, [{
        key: "GetZIndexCounter",
        value: function GetZIndexCounter() {
            return this.zIndexCounter;
        }
    }, {
        key: "FocusWindow",
        value: function FocusWindow(id) {
            this._focused_id = id;
            this.emit("focusedWindowChanged", id);
        }
    }, {
        key: "GetFocusedId",
        value: function GetFocusedId() {
            return this._focused_id;
        }
    }, {
        key: "GetNewId",
        value: function GetNewId() {
            return this._id_counter++;
        }
    }]);

    return WindowsManager;
}(_Emitter2.Emitter);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

var Emitter = exports.Emitter = function () {
    function Emitter() {
        _classCallCheck(this, Emitter);

        this._map = {};
    }

    _createClass(Emitter, [{
        key: "addEventListener",
        value: function addEventListener(name, callback) {
            if (name in this._map) {
                this._map[name].push(callback);
            } else {
                this._map[name] = [callback];
            }
        }
    }, {
        key: "emit",
        value: function emit() {
            var args = Array.prototype.slice.call(arguments);
            var name = args[0];
            args = args.slice(1);
            if (name in this._map) {
                this._map[name].forEach(function (v) {
                    return v.apply(undefined, args);
                });
            }
        }
    }]);

    return Emitter;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.undraggable {\n  user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-drag: none;\n  -webkit-user-select: none;\n  -ms-user-select: none; }\n\n.clicked {\n  transform: translateX(2px) translateY(2px); }\n\n* {\n  box-sizing: border-box; }\n\n.col-1 {\n  width: 8.33%; }\n\n.col-2 {\n  width: 16.66%; }\n\n.col-3 {\n  width: 25%; }\n\n.col-4 {\n  width: 33.33%; }\n\n.col-5 {\n  width: 41.66%; }\n\n.col-6 {\n  width: 50%; }\n\n.col-7 {\n  width: 58.33%; }\n\n.col-8 {\n  width: 66.66%; }\n\n.col-9 {\n  width: 75%; }\n\n.col-10 {\n  width: 83.33%; }\n\n.col-11 {\n  width: 91.66%; }\n\n.col-12 {\n  width: 100%; }\n\n[class*=\"col-\"] {\n  float: left; }\n\n.row::after {\n  content: \"\";\n  clear: both;\n  display: table; }\n\n.glowing-border {\n  outline: none;\n  border-color: #9ecaed;\n  box-shadow: 0 0 20px #49afff; }\n\n.window {\n  position: fixed;\n  background-color: white;\n  border-style: solid;\n  border-width: 2px;\n  border-color: white; }\n  .window .titleBar {\n    width: 100%;\n    background-color: lightblue;\n    height: 16px; }\n    .window .titleBar .name {\n      font-size: 14px;\n      color: black;\n      margin: 0px;\n      cursor: default; }\n    .window .titleBar p {\n      line-height: 16px; }\n  .window .right {\n    position: absolute;\n    right: 0px;\n    font-size: 14px;\n    line-height: 16px; }\n  .window .right:hover {\n    background-color: white;\n    color: lightblue; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__filename, __dirname) {/***********************************************
Copyright 2010, 2011, Chris Winberry <chris@winberry.net>. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
***********************************************/
/* v1.7.6 */

(function () {

function runningInNode () {
	return(
		("function") == "function"
		&&
		(typeof exports) == "object"
		&&
		(typeof module) == "object"
		&&
		(typeof __filename) == "string"
		&&
		(typeof __dirname) == "string"
		);
}

if (!runningInNode()) {
	if (!this.Tautologistics)
		this.Tautologistics = {};
	else if (this.Tautologistics.NodeHtmlParser)
		return; //NodeHtmlParser already defined!
	this.Tautologistics.NodeHtmlParser = {};
	exports = this.Tautologistics.NodeHtmlParser;
}

//Types of elements found in the DOM
var ElementType = {
	  Text: "text" //Plain text
	, Directive: "directive" //Special tag <!...>
	, Comment: "comment" //Special tag <!--...-->
	, Script: "script" //Special tag <script>...</script>
	, Style: "style" //Special tag <style>...</style>
	, Tag: "tag" //Any tag that isn't special
}

function Parser (handler, options) {
	this._options = options ? options : { };
	if (this._options.includeLocation == undefined) {
		this._options.includeLocation = false; //Do not track element position in document by default
	}

	this.validateHandler(handler);
	this._handler = handler;
	this.reset();
}

	//**"Static"**//
	//Regular expressions used for cleaning up and parsing (stateless)
	Parser._reTrim = /(^\s+|\s+$)/g; //Trim leading/trailing whitespace
	Parser._reTrimComment = /(^\!--|--$)/g; //Remove comment tag markup from comment contents
	Parser._reWhitespace = /\s/g; //Used to find any whitespace to split on
	Parser._reTagName = /^\s*(\/?)\s*([^\s\/]+)/; //Used to find the tag name for an element

	//Regular expressions used for parsing (stateful)
	Parser._reAttrib = //Find attributes in a tag
		/([^=<>\"\'\s]+)\s*=\s*"([^"]*)"|([^=<>\"\'\s]+)\s*=\s*'([^']*)'|([^=<>\"\'\s]+)\s*=\s*([^'"\s]+)|([^=<>\"\'\s\/]+)/g;
	Parser._reTags = /[\<\>]/g; //Find tag markers

	//**Public**//
	//Methods//
	//Parses a complete HTML and pushes it to the handler
	Parser.prototype.parseComplete = function Parser$parseComplete (data) {
		this.reset();
		this.parseChunk(data);
		this.done();
	}

	//Parses a piece of an HTML document
	Parser.prototype.parseChunk = function Parser$parseChunk (data) {
		if (this._done)
			this.handleError(new Error("Attempted to parse chunk after parsing already done"));
		this._buffer += data; //FIXME: this can be a bottleneck
		this.parseTags();
	}

	//Tells the parser that the HTML being parsed is complete
	Parser.prototype.done = function Parser$done () {
		if (this._done)
			return;
		this._done = true;
	
		//Push any unparsed text into a final element in the element list
		if (this._buffer.length) {
			var rawData = this._buffer;
			this._buffer = "";
			var element = {
				  raw: rawData
				, data: (this._parseState == ElementType.Text) ? rawData : rawData.replace(Parser._reTrim, "")
				, type: this._parseState
				};
			if (this._parseState == ElementType.Tag || this._parseState == ElementType.Script || this._parseState == ElementType.Style)
				element.name = this.parseTagName(element.data);
			this.parseAttribs(element);
			this._elements.push(element);
		}
	
		this.writeHandler();
		this._handler.done();
	}

	//Resets the parser to a blank state, ready to parse a new HTML document
	Parser.prototype.reset = function Parser$reset () {
		this._buffer = "";
		this._done = false;
		this._elements = [];
		this._elementsCurrent = 0;
		this._current = 0;
		this._next = 0;
		this._location = {
			  row: 0
			, col: 0
			, charOffset: 0
			, inBuffer: 0
		};
		this._parseState = ElementType.Text;
		this._prevTagSep = '';
		this._tagStack = [];
		this._handler.reset();
	}
	
	//**Private**//
	//Properties//
	Parser.prototype._options = null; //Parser options for how to behave
	Parser.prototype._handler = null; //Handler for parsed elements
	Parser.prototype._buffer = null; //Buffer of unparsed data
	Parser.prototype._done = false; //Flag indicating whether parsing is done
	Parser.prototype._elements =  null; //Array of parsed elements
	Parser.prototype._elementsCurrent = 0; //Pointer to last element in _elements that has been processed
	Parser.prototype._current = 0; //Position in data that has already been parsed
	Parser.prototype._next = 0; //Position in data of the next tag marker (<>)
	Parser.prototype._location = null; //Position tracking for elements in a stream
	Parser.prototype._parseState = ElementType.Text; //Current type of element being parsed
	Parser.prototype._prevTagSep = ''; //Previous tag marker found
	//Stack of element types previously encountered; keeps track of when
	//parsing occurs inside a script/comment/style tag
	Parser.prototype._tagStack = null;

	//Methods//
	//Takes an array of elements and parses any found attributes
	Parser.prototype.parseTagAttribs = function Parser$parseTagAttribs (elements) {
		var idxEnd = elements.length;
		var idx = 0;
	
		while (idx < idxEnd) {
			var element = elements[idx++];
			if (element.type == ElementType.Tag || element.type == ElementType.Script || element.type == ElementType.style)
				this.parseAttribs(element);
		}
	
		return(elements);
	}

	//Takes an element and adds an "attribs" property for any element attributes found 
	Parser.prototype.parseAttribs = function Parser$parseAttribs (element) {
		//Only parse attributes for tags
		if (element.type != ElementType.Script && element.type != ElementType.Style && element.type != ElementType.Tag)
			return;
	
		var tagName = element.data.split(Parser._reWhitespace, 1)[0];
		var attribRaw = element.data.substring(tagName.length);
		if (attribRaw.length < 1)
			return;
	
		var match;
		Parser._reAttrib.lastIndex = 0;
		while (match = Parser._reAttrib.exec(attribRaw)) {
			if (element.attribs == undefined)
				element.attribs = {};
	
			if (typeof match[1] == "string" && match[1].length) {
				element.attribs[match[1]] = match[2];
			} else if (typeof match[3] == "string" && match[3].length) {
				element.attribs[match[3].toString()] = match[4].toString();
			} else if (typeof match[5] == "string" && match[5].length) {
				element.attribs[match[5]] = match[6];
			} else if (typeof match[7] == "string" && match[7].length) {
				element.attribs[match[7]] = match[7];
			}
		}
	}

	//Extracts the base tag name from the data value of an element
	Parser.prototype.parseTagName = function Parser$parseTagName (data) {
		if (data == null || data == "")
			return("");
		var match = Parser._reTagName.exec(data);
		if (!match)
			return("");
		return((match[1] ? "/" : "") + match[2]);
	}

	//Parses through HTML text and returns an array of found elements
	//I admit, this function is rather large but splitting up had an noticeable impact on speed
	Parser.prototype.parseTags = function Parser$parseTags () {
		var bufferEnd = this._buffer.length - 1;
		while (Parser._reTags.test(this._buffer)) {
			this._next = Parser._reTags.lastIndex - 1;
			var tagSep = this._buffer.charAt(this._next); //The currently found tag marker
			var rawData = this._buffer.substring(this._current, this._next); //The next chunk of data to parse
	
			//A new element to eventually be appended to the element list
			var element = {
				  raw: rawData
				, data: (this._parseState == ElementType.Text) ? rawData : rawData.replace(Parser._reTrim, "")
				, type: this._parseState
			};
	
			var elementName = this.parseTagName(element.data);
	
			//This section inspects the current tag stack and modifies the current
			//element if we're actually parsing a special area (script/comment/style tag)
			if (this._tagStack.length) { //We're parsing inside a script/comment/style tag
				if (this._tagStack[this._tagStack.length - 1] == ElementType.Script) { //We're currently in a script tag
					if (elementName.toLowerCase() == "/script") //Actually, we're no longer in a script tag, so pop it off the stack
						this._tagStack.pop();
					else { //Not a closing script tag
						if (element.raw.indexOf("!--") != 0) { //Make sure we're not in a comment
							//All data from here to script close is now a text element
							element.type = ElementType.Text;
							//If the previous element is text, append the current text to it
							if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Text) {
								var prevElement = this._elements[this._elements.length - 1];
								prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep + element.raw;
								element.raw = element.data = ""; //This causes the current element to not be added to the element list
							}
						}
					}
				}
				else if (this._tagStack[this._tagStack.length - 1] == ElementType.Style) { //We're currently in a style tag
					if (elementName.toLowerCase() == "/style") //Actually, we're no longer in a style tag, so pop it off the stack
						this._tagStack.pop();
					else {
						if (element.raw.indexOf("!--") != 0) { //Make sure we're not in a comment
							//All data from here to style close is now a text element
							element.type = ElementType.Text;
							//If the previous element is text, append the current text to it
							if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Text) {
								var prevElement = this._elements[this._elements.length - 1];
								if (element.raw != "") {
									prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep + element.raw;
									element.raw = element.data = ""; //This causes the current element to not be added to the element list
								} else { //Element is empty, so just append the last tag marker found
									prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep;
								}
							} else { //The previous element was not text
								if (element.raw != "") {
									element.raw = element.data = element.raw;
								}
							}
						}
					}
				}
				else if (this._tagStack[this._tagStack.length - 1] == ElementType.Comment) { //We're currently in a comment tag
					var rawLen = element.raw.length;
					if (element.raw.charAt(rawLen - 2) == "-" && element.raw.charAt(rawLen - 1) == "-" && tagSep == ">") {
						//Actually, we're no longer in a style tag, so pop it off the stack
						this._tagStack.pop();
						//If the previous element is a comment, append the current text to it
						if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Comment) {
							var prevElement = this._elements[this._elements.length - 1];
							prevElement.raw = prevElement.data = (prevElement.raw + element.raw).replace(Parser._reTrimComment, "");
							element.raw = element.data = ""; //This causes the current element to not be added to the element list
							element.type = ElementType.Text;
						}
						else //Previous element not a comment
							element.type = ElementType.Comment; //Change the current element's type to a comment
					}
					else { //Still in a comment tag
						element.type = ElementType.Comment;
						//If the previous element is a comment, append the current text to it
						if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Comment) {
							var prevElement = this._elements[this._elements.length - 1];
							prevElement.raw = prevElement.data = prevElement.raw + element.raw + tagSep;
							element.raw = element.data = ""; //This causes the current element to not be added to the element list
							element.type = ElementType.Text;
						}
						else
							element.raw = element.data = element.raw + tagSep;
					}
				}
			}
	
			//Processing of non-special tags
			if (element.type == ElementType.Tag) {
				element.name = elementName;
				var elementNameCI = elementName.toLowerCase();
				
				if (element.raw.indexOf("!--") == 0) { //This tag is really comment
					element.type = ElementType.Comment;
					delete element["name"];
					var rawLen = element.raw.length;
					//Check if the comment is terminated in the current element
					if (element.raw.charAt(rawLen - 1) == "-" && element.raw.charAt(rawLen - 2) == "-" && tagSep == ">")
						element.raw = element.data = element.raw.replace(Parser._reTrimComment, "");
					else { //It's not so push the comment onto the tag stack
						element.raw += tagSep;
						this._tagStack.push(ElementType.Comment);
					}
				}
				else if (element.raw.indexOf("!") == 0 || element.raw.indexOf("?") == 0) {
					element.type = ElementType.Directive;
					//TODO: what about CDATA?
				}
				else if (elementNameCI == "script") {
					element.type = ElementType.Script;
					//Special tag, push onto the tag stack if not terminated
					if (element.data.charAt(element.data.length - 1) != "/")
						this._tagStack.push(ElementType.Script);
				}
				else if (elementNameCI == "/script")
					element.type = ElementType.Script;
				else if (elementNameCI == "style") {
					element.type = ElementType.Style;
					//Special tag, push onto the tag stack if not terminated
					if (element.data.charAt(element.data.length - 1) != "/")
						this._tagStack.push(ElementType.Style);
				}
				else if (elementNameCI == "/style")
					element.type = ElementType.Style;
				if (element.name && element.name.charAt(0) == "/")
					element.data = element.name;
			}
	
			//Add all tags and non-empty text elements to the element list
			if (element.raw != "" || element.type != ElementType.Text) {
				if (this._options.includeLocation && !element.location) {
					element.location = this.getLocation(element.type == ElementType.Tag);
				}
				this.parseAttribs(element);
				this._elements.push(element);
				//If tag self-terminates, add an explicit, separate closing tag
				if (
					element.type != ElementType.Text
					&&
					element.type != ElementType.Comment
					&&
					element.type != ElementType.Directive
					&&
					element.data.charAt(element.data.length - 1) == "/"
					)
					this._elements.push({
						  raw: "/" + element.name
						, data: "/" + element.name
						, name: "/" + element.name
						, type: element.type
					});
			}
			this._parseState = (tagSep == "<") ? ElementType.Tag : ElementType.Text;
			this._current = this._next + 1;
			this._prevTagSep = tagSep;
		}

		if (this._options.includeLocation) {
			this.getLocation();
			this._location.row += this._location.inBuffer;
			this._location.inBuffer = 0;
			this._location.charOffset = 0;
		}
		this._buffer = (this._current <= bufferEnd) ? this._buffer.substring(this._current) : "";
		this._current = 0;
	
		this.writeHandler();
	}

	Parser.prototype.getLocation = function Parser$getLocation (startTag) {
		var c,
			l = this._location,
			end = this._current - (startTag ? 1 : 0),
			chunk = startTag && l.charOffset == 0 && this._current == 0;
		
		for (; l.charOffset < end; l.charOffset++) {
			c = this._buffer.charAt(l.charOffset);
			if (c == '\n') {
				l.inBuffer++;
				l.col = 0;
			} else if (c != '\r') {
				l.col++;
			}
		}
		return {
			  line: l.row + l.inBuffer + 1
			, col: l.col + (chunk ? 0: 1)
		};
	}

	//Checks the handler to make it is an object with the right "interface"
	Parser.prototype.validateHandler = function Parser$validateHandler (handler) {
		if ((typeof handler) != "object")
			throw new Error("Handler is not an object");
		if ((typeof handler.reset) != "function")
			throw new Error("Handler method 'reset' is invalid");
		if ((typeof handler.done) != "function")
			throw new Error("Handler method 'done' is invalid");
		if ((typeof handler.writeTag) != "function")
			throw new Error("Handler method 'writeTag' is invalid");
		if ((typeof handler.writeText) != "function")
			throw new Error("Handler method 'writeText' is invalid");
		if ((typeof handler.writeComment) != "function")
			throw new Error("Handler method 'writeComment' is invalid");
		if ((typeof handler.writeDirective) != "function")
			throw new Error("Handler method 'writeDirective' is invalid");
	}

	//Writes parsed elements out to the handler
	Parser.prototype.writeHandler = function Parser$writeHandler (forceFlush) {
		forceFlush = !!forceFlush;
		if (this._tagStack.length && !forceFlush)
			return;
		while (this._elements.length) {
			var element = this._elements.shift();
			switch (element.type) {
				case ElementType.Comment:
					this._handler.writeComment(element);
					break;
				case ElementType.Directive:
					this._handler.writeDirective(element);
					break;
				case ElementType.Text:
					this._handler.writeText(element);
					break;
				default:
					this._handler.writeTag(element);
					break;
			}
		}
	}

	Parser.prototype.handleError = function Parser$handleError (error) {
		if ((typeof this._handler.error) == "function")
			this._handler.error(error);
		else
			throw error;
	}

//TODO: make this a trully streamable handler
function RssHandler (callback) {
	RssHandler.super_.call(this, callback, { ignoreWhitespace: true, verbose: false, enforceEmptyTags: false });
}
inherits(RssHandler, DefaultHandler);

	RssHandler.prototype.done = function RssHandler$done () {
		var feed = { };
		var feedRoot;

		var found = DomUtils.getElementsByTagName(function (value) { return(value == "rss" || value == "feed"); }, this.dom, false);
		if (found.length) {
			feedRoot = found[0];
		}
		if (feedRoot) {
			if (feedRoot.name == "rss") {
				feed.type = "rss";
				feedRoot = feedRoot.children[0]; //<channel/>
				feed.id = "";
				try {
					feed.title = DomUtils.getElementsByTagName("title", feedRoot.children, false)[0].children[0].data;
				} catch (ex) { }
				try {
					feed.link = DomUtils.getElementsByTagName("link", feedRoot.children, false)[0].children[0].data;
				} catch (ex) { }
				try {
					feed.description = DomUtils.getElementsByTagName("description", feedRoot.children, false)[0].children[0].data;
				} catch (ex) { }
				try {
					feed.updated = new Date(DomUtils.getElementsByTagName("lastBuildDate", feedRoot.children, false)[0].children[0].data);
				} catch (ex) { }
				try {
					feed.author = DomUtils.getElementsByTagName("managingEditor", feedRoot.children, false)[0].children[0].data;
				} catch (ex) { }
				feed.items = [];
				DomUtils.getElementsByTagName("item", feedRoot.children).forEach(function (item, index, list) {
					var entry = {};
					try {
						entry.id = DomUtils.getElementsByTagName("guid", item.children, false)[0].children[0].data;
					} catch (ex) { }
					try {
						entry.title = DomUtils.getElementsByTagName("title", item.children, false)[0].children[0].data;
					} catch (ex) { }
					try {
						entry.link = DomUtils.getElementsByTagName("link", item.children, false)[0].children[0].data;
					} catch (ex) { }
					try {
						entry.description = DomUtils.getElementsByTagName("description", item.children, false)[0].children[0].data;
					} catch (ex) { }
					try {
						entry.pubDate = new Date(DomUtils.getElementsByTagName("pubDate", item.children, false)[0].children[0].data);
					} catch (ex) { }
					feed.items.push(entry);
				});
			} else {
				feed.type = "atom";
				try {
					feed.id = DomUtils.getElementsByTagName("id", feedRoot.children, false)[0].children[0].data;
				} catch (ex) { }
				try {
					feed.title = DomUtils.getElementsByTagName("title", feedRoot.children, false)[0].children[0].data;
				} catch (ex) { }
				try {
					feed.link = DomUtils.getElementsByTagName("link", feedRoot.children, false)[0].attribs.href;
				} catch (ex) { }
				try {
					feed.description = DomUtils.getElementsByTagName("subtitle", feedRoot.children, false)[0].children[0].data;
				} catch (ex) { }
				try {
					feed.updated = new Date(DomUtils.getElementsByTagName("updated", feedRoot.children, false)[0].children[0].data);
				} catch (ex) { }
				try {
					feed.author = DomUtils.getElementsByTagName("email", feedRoot.children, true)[0].children[0].data;
				} catch (ex) { }
				feed.items = [];
				DomUtils.getElementsByTagName("entry", feedRoot.children).forEach(function (item, index, list) {
					var entry = {};
					try {
						entry.id = DomUtils.getElementsByTagName("id", item.children, false)[0].children[0].data;
					} catch (ex) { }
					try {
						entry.title = DomUtils.getElementsByTagName("title", item.children, false)[0].children[0].data;
					} catch (ex) { }
					try {
						entry.link = DomUtils.getElementsByTagName("link", item.children, false)[0].attribs.href;
					} catch (ex) { }
					try {
						entry.description = DomUtils.getElementsByTagName("summary", item.children, false)[0].children[0].data;
					} catch (ex) { }
					try {
						entry.pubDate = new Date(DomUtils.getElementsByTagName("updated", item.children, false)[0].children[0].data);
					} catch (ex) { }
					feed.items.push(entry);
				});
			}

			this.dom = feed;
		}
		RssHandler.super_.prototype.done.call(this);
	}

///////////////////////////////////////////////////

function DefaultHandler (callback, options) {
	this.reset();
	this._options = options ? options : { };
	if (this._options.ignoreWhitespace == undefined)
		this._options.ignoreWhitespace = false; //Keep whitespace-only text nodes
	if (this._options.verbose == undefined)
		this._options.verbose = true; //Keep data property for tags and raw property for all
	if (this._options.enforceEmptyTags == undefined)
		this._options.enforceEmptyTags = true; //Don't allow children for HTML tags defined as empty in spec
	if ((typeof callback) == "function")
		this._callback = callback;
}

	//**"Static"**//
	//HTML Tags that shouldn't contain child nodes
	DefaultHandler._emptyTags = {
		  area: 1
		, base: 1
		, basefont: 1
		, br: 1
		, col: 1
		, frame: 1
		, hr: 1
		, img: 1
		, input: 1
		, isindex: 1
		, link: 1
		, meta: 1
		, param: 1
		, embed: 1
	}
	//Regex to detect whitespace only text nodes
	DefaultHandler.reWhitespace = /^\s*$/;

	//**Public**//
	//Properties//
	DefaultHandler.prototype.dom = null; //The hierarchical object containing the parsed HTML
	//Methods//
	//Resets the handler back to starting state
	DefaultHandler.prototype.reset = function DefaultHandler$reset() {
		this.dom = [];
		this._done = false;
		this._tagStack = [];
		this._tagStack.last = function DefaultHandler$_tagStack$last () {
			return(this.length ? this[this.length - 1] : null);
		}
	}
	//Signals the handler that parsing is done
	DefaultHandler.prototype.done = function DefaultHandler$done () {
		this._done = true;
		this.handleCallback(null);
	}
	DefaultHandler.prototype.writeTag = function DefaultHandler$writeTag (element) {
		this.handleElement(element);
	} 
	DefaultHandler.prototype.writeText = function DefaultHandler$writeText (element) {
		if (this._options.ignoreWhitespace)
			if (DefaultHandler.reWhitespace.test(element.data))
				return;
		this.handleElement(element);
	} 
	DefaultHandler.prototype.writeComment = function DefaultHandler$writeComment (element) {
		this.handleElement(element);
	} 
	DefaultHandler.prototype.writeDirective = function DefaultHandler$writeDirective (element) {
		this.handleElement(element);
	}
	DefaultHandler.prototype.error = function DefaultHandler$error (error) {
		this.handleCallback(error);
	}

	//**Private**//
	//Properties//
	DefaultHandler.prototype._options = null; //Handler options for how to behave
	DefaultHandler.prototype._callback = null; //Callback to respond to when parsing done
	DefaultHandler.prototype._done = false; //Flag indicating whether handler has been notified of parsing completed
	DefaultHandler.prototype._tagStack = null; //List of parents to the currently element being processed
	//Methods//
	DefaultHandler.prototype.handleCallback = function DefaultHandler$handleCallback (error) {
			if ((typeof this._callback) != "function")
				if (error)
					throw error;
				else
					return;
			this._callback(error, this.dom);
	}
	
	DefaultHandler.prototype.isEmptyTag = function(element) {
		var name = element.name.toLowerCase();
		if (name.charAt(0) == '/') {
			name = name.substring(1);
		}
		return this._options.enforceEmptyTags && !!DefaultHandler._emptyTags[name];
	};
	
	DefaultHandler.prototype.handleElement = function DefaultHandler$handleElement (element) {
		if (this._done)
			this.handleCallback(new Error("Writing to the handler after done() called is not allowed without a reset()"));
		if (!this._options.verbose) {
//			element.raw = null; //FIXME: Not clean
			//FIXME: Serious performance problem using delete
			delete element.raw;
			if (element.type == "tag" || element.type == "script" || element.type == "style")
				delete element.data;
		}
		if (!this._tagStack.last()) { //There are no parent elements
			//If the element can be a container, add it to the tag stack and the top level list
			if (element.type != ElementType.Text && element.type != ElementType.Comment && element.type != ElementType.Directive) {
				if (element.name.charAt(0) != "/") { //Ignore closing tags that obviously don't have an opening tag
					this.dom.push(element);
					if (!this.isEmptyTag(element)) { //Don't add tags to the tag stack that can't have children
						this._tagStack.push(element);
					}
				}
			}
			else //Otherwise just add to the top level list
				this.dom.push(element);
		}
		else { //There are parent elements
			//If the element can be a container, add it as a child of the element
			//on top of the tag stack and then add it to the tag stack
			if (element.type != ElementType.Text && element.type != ElementType.Comment && element.type != ElementType.Directive) {
				if (element.name.charAt(0) == "/") {
					//This is a closing tag, scan the tagStack to find the matching opening tag
					//and pop the stack up to the opening tag's parent
					var baseName = element.name.substring(1);
					if (!this.isEmptyTag(element)) {
						var pos = this._tagStack.length - 1;
						while (pos > -1 && this._tagStack[pos--].name != baseName) { }
						if (pos > -1 || this._tagStack[0].name == baseName)
							while (pos < this._tagStack.length - 1)
								this._tagStack.pop();
					}
				}
				else { //This is not a closing tag
					if (!this._tagStack.last().children)
						this._tagStack.last().children = [];
					this._tagStack.last().children.push(element);
					if (!this.isEmptyTag(element)) //Don't add tags to the tag stack that can't have children
						this._tagStack.push(element);
				}
			}
			else { //This is not a container element
				if (!this._tagStack.last().children)
					this._tagStack.last().children = [];
				this._tagStack.last().children.push(element);
			}
		}
	}

	var DomUtils = {
		  testElement: function DomUtils$testElement (options, element) {
			if (!element) {
				return false;
			}
	
			for (var key in options) {
				if (key == "tag_name") {
					if (element.type != "tag" && element.type != "script" && element.type != "style") {
						return false;
					}
					if (!options["tag_name"](element.name)) {
						return false;
					}
				} else if (key == "tag_type") {
					if (!options["tag_type"](element.type)) {
						return false;
					}
				} else if (key == "tag_contains") {
					if (element.type != "text" && element.type != "comment" && element.type != "directive") {
						return false;
					}
					if (!options["tag_contains"](element.data)) {
						return false;
					}
				} else {
					if (!element.attribs || !options[key](element.attribs[key])) {
						return false;
					}
				}
			}
		
			return true;
		}
	
		, getElements: function DomUtils$getElements (options, currentElement, recurse, limit) {
			recurse = (recurse === undefined || recurse === null) || !!recurse;
			limit = isNaN(parseInt(limit)) ? -1 : parseInt(limit);

			if (!currentElement) {
				return([]);
			}
	
			var found = [];
			var elementList;

			function getTest (checkVal) {
				return(function (value) { return(value == checkVal); });
			}
			for (var key in options) {
				if ((typeof options[key]) != "function") {
					options[key] = getTest(options[key]);
				}
			}
	
			if (DomUtils.testElement(options, currentElement)) {
				found.push(currentElement);
			}

			if (limit >= 0 && found.length >= limit) {
				return(found);
			}

			if (recurse && currentElement.children) {
				elementList = currentElement.children;
			} else if (currentElement instanceof Array) {
				elementList = currentElement;
			} else {
				return(found);
			}
	
			for (var i = 0; i < elementList.length; i++) {
				found = found.concat(DomUtils.getElements(options, elementList[i], recurse, limit));
				if (limit >= 0 && found.length >= limit) {
					break;
				}
			}
	
			return(found);
		}
		
		, getElementById: function DomUtils$getElementById (id, currentElement, recurse) {
			var result = DomUtils.getElements({ id: id }, currentElement, recurse, 1);
			return(result.length ? result[0] : null);
		}
		
		, getElementsByTagName: function DomUtils$getElementsByTagName (name, currentElement, recurse, limit) {
			return(DomUtils.getElements({ tag_name: name }, currentElement, recurse, limit));
		}
		
		, getElementsByTagType: function DomUtils$getElementsByTagType (type, currentElement, recurse, limit) {
			return(DomUtils.getElements({ tag_type: type }, currentElement, recurse, limit));
		}
	}

	function inherits (ctor, superCtor) {
		var tempCtor = function(){};
		tempCtor.prototype = superCtor.prototype;
		ctor.super_ = superCtor;
		ctor.prototype = new tempCtor();
		ctor.prototype.constructor = ctor;
	}

exports.Parser = Parser;

exports.DefaultHandler = DefaultHandler;

exports.RssHandler = RssHandler;

exports.ElementType = ElementType;

exports.DomUtils = DomUtils;

})();

/* WEBPACK VAR INJECTION */}.call(exports, "/index.js", "/"))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextEditor = undefined;

var _Window2 = __webpack_require__(0);

var _textEditor = __webpack_require__(12);

var _textEditor2 = _interopRequireDefault(_textEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date:   2017-08-12 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ************************/

var template = "<div class=\"text-editor\">\n    <div class=\"toolbar\">\n        <span class=\"btn\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i></span>\n        <span class=\"btn\"><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></span>\n    </div>\n    <textarea class=\"real-editor\"></textarea>\n</div>";

var TextEditor = exports.TextEditor = function (_Window) {
    _inherits(TextEditor, _Window);

    function TextEditor(wm) {
        _classCallCheck(this, TextEditor);

        var _this = _possibleConstructorReturn(this, (TextEditor.__proto__ || Object.getPrototypeOf(TextEditor)).call(this, wm));

        _this.Slot('default', _this.RenderTemplate(template));
        return _this;
    }

    return TextEditor;
}(_Window2.Window);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./textEditor.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./textEditor.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".text-editor .toolbar {\n  height: 20px; }\n  .text-editor .toolbar .btn {\n    margin: 2px; }\n  .text-editor .toolbar .btn:hover {\n    background: lightblue; }\n\n.text-editor .real-editor {\n  height: 260px;\n  width: 396px; }\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileWindow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Window2 = __webpack_require__(0);

var _FileItem = __webpack_require__(15);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date:   2017-08-12 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ************************/

var template = "<div class=\"pathContainer\">\n    <input type=\"text\" />\n    <div class=\"itemContainer unselectable\" ref=\"fileContainer\">\n    </div>\n</div>";

var FileWindow = exports.FileWindow = function (_Window) {
    _inherits(FileWindow, _Window);

    function FileWindow(wm) {
        _classCallCheck(this, FileWindow);

        var _this = _possibleConstructorReturn(this, (FileWindow.__proto__ || Object.getPrototypeOf(FileWindow)).call(this, wm));

        _this.Slot('default', _this.RenderTemplate(template));

        var fi1 = new _FileItem.FileItem();
        fi1.fileType = "text";
        fi1.filename = "text1.txt";
        var fi2 = new _FileItem.FileItem();
        fi2.fileType = "folder";
        fi2.filename = "abc";

        _this.$refs.fileContainer.appendChild(fi1.dom);
        _this.$refs.fileContainer.appendChild(fi2.dom);
        return _this;
    }

    _createClass(FileWindow, [{
        key: "render",
        value: function render() {
            var style = {
                height: 260 + "px"
            };
            return null;
        }
    }, {
        key: "inputPathChanged",
        value: function inputPathChanged(event) {
            this.setState({
                path: event.target.value
            });
        }
    }]);

    return FileWindow;
}(_Window2.Window);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _file = __webpack_require__(16);

var _file2 = _interopRequireDefault(_file);

var _Window = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date:   2017-08-12 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ************************/

var template = "<div class=\"file-item\">\n    <img ref=\"iconimg\" class=\"file-icon undraggable\" />\n    <p class=\"filename\" ref=\"filename\"></p>\n</div>";

var FileItem = exports.FileItem = function (_Component) {
    _inherits(FileItem, _Component);

    function FileItem() {
        _classCallCheck(this, FileItem);

        var _this = _possibleConstructorReturn(this, (FileItem.__proto__ || Object.getPrototypeOf(FileItem)).call(this));

        _this._dom = _this.RenderTemplate(template);
        return _this;
    }

    _createClass(FileItem, [{
        key: "fileType",
        get: function get() {
            return this._fileType;
        },
        set: function set(value) {
            this._fileType = value;

            if (this._fileType == "folder") {
                this.$refs.iconimg.setAttribute("src", "assets/images/Folder-icon.png");
            } else {
                this.$refs.iconimg.setAttribute("src", "assets/images/Text-Document-icon.png");
            }
        }
    }, {
        key: "filename",
        get: function get() {
            return this._filename;
        },
        set: function set(value) {
            this._filename = value;
            this.$refs.filename.innerText = value;
        }
    }]);

    return FileItem;
}(_Window.Component);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./file.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./file.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".file-item {\n  display: inline-block;\n  width: 100px;\n  cursor: default; }\n  .file-item .file-icon {\n    width: 100px;\n    height: 100px; }\n  .file-item .filename {\n    color: grey;\n    margin: 0px;\n    text-align: center; }\n\n.file-item:hover {\n  background: lightblue; }\n\n.itemContainer {\n  overflow-y: scroll; }\n\n.pathContainer {\n  width: 100%; }\n  .pathContainer input {\n    width: 99%; }\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProgramExecutor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Window2 = __webpack_require__(0);

var _programExecutor = __webpack_require__(19);

var _programExecutor2 = _interopRequireDefault(_programExecutor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date:   2017-08-12 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ************************/

var template = "<div ref=\"frame\" class=\"program-executor\">\n    <div class=\"toolbar unselectable\">\n        <div ref=\"runBtn\" class=\"item\">\n            <img class=\"undraggable\" src=\"assets/images/exe/run.png\" />\n        </div>\n        <div ref=\"pauseBtn\" class=\"item\">\n            <img class=\"undraggable\" src=\"assets/images/exe/pause.png\" />\n        </div>\n        <div ref=\"stopBtn\" class=\"item\">\n            <img class=\"undraggable\" src=\"assets/images/exe/stop.png\" />\n        </div>\n        <div ref=\"stepForwardBtn\" class=\"item\">\n            <img class=\"undraggable\" src=\"assets/images/exe/step-forward.png\" />\n        </div>\n    </div>\n    <div class=\"main-table row\" ref=\"programFrame\">\n        <div class=\"col-8 code-area\">\n            <div class=\"line\">\n                <div class=\"gutter unselectable\">1</div>\n                <div class=\"content\">ADD R1, 3, 2</div>\n            </div>\n            <div class=\"line\">\n                <div class=\"gutter unselectable\">2</div>\n                <div class=\"content\">ADD 3</div>\n            </div>\n            <div class=\"line\">\n                <div class=\"gutter unselectable\">3</div>\n                <div class=\"content\"></div>\n            </div>\n        </div>\n        <div class=\"col-4 watcher\">\n            <div class=\"variable-area\" ref=\"variableArea\">\n                <div class=\"title unselectable\">Variable Watcher</div>\n                <div class=\"content\">\n                    <div><span class=\"variable\">a</span>: 3</div>\n                    <div><span class=\"variable\">a</span>: 3</div>\n                    <div><span class=\"variable\">a</span>: 3</div>\n                </div>\n            </div>\n            <div class=\"constant-area\" ref=\"variableArea\">\n                <div class=\"title unselectable\">Constant Watcher</div>\n                <div class=\"content\">\n                    <div><span class=\"variable\">a</span>: 3</div>\n                    <div><span class=\"variable\">a</span>: 3</div>\n                    <div><span class=\"variable\">a</span>: 3</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";

var source_code = "\nADD     R1,  1,  1\nADD     R2, R1,  1\nLOAD    R3, R2,  0\nSTORE   R1, R3,  0\n";

function initBtn(btn) {
    var img = btn.querySelector('img');
    btn.addEventListener('mousedown', function (e) {
        img.classList.add('clicked');
    });
    btn.addEventListener('mouseup', function (e) {
        img.classList.remove('clicked');
    });
}

var ProgramExecutor = exports.ProgramExecutor = function (_Window) {
    _inherits(ProgramExecutor, _Window);

    function ProgramExecutor(wm) {
        _classCallCheck(this, ProgramExecutor);

        var _this = _possibleConstructorReturn(this, (ProgramExecutor.__proto__ || Object.getPrototypeOf(ProgramExecutor)).call(this, wm));

        _this.Slot('default', _this.RenderTemplate(template));
        _this.width = 640;
        _this.height = 480;

        _this.$refs.frame.style.height = _this.height - 16 + 'px';
        _this.$refs.programFrame.style.height = _this.height - 16 - 48 + 'px';

        _this.$refs.runBtn.addEventListener('click', function (e) {
            return _this.onRunClicked(e);
        });
        _this.$refs.pauseBtn.addEventListener('click', function (e) {
            return _this.onPauseClicked(e);
        });
        _this.$refs.stopBtn.addEventListener('click', function (e) {
            return _this.onStopClicked(e);
        });
        _this.$refs.stepForwardBtn.addEventListener('click', function (e) {
            return _this.onStepForwardClicked(e);
        });

        initBtn(_this.$refs.runBtn);
        initBtn(_this.$refs.pauseBtn);
        initBtn(_this.$refs.stopBtn);
        initBtn(_this.$refs.stepForwardBtn);

        _this.title = "Program Executor";
        return _this;
    }

    _createClass(ProgramExecutor, [{
        key: "onRunClicked",
        value: function onRunClicked(event) {}
    }, {
        key: "onPauseClicked",
        value: function onPauseClicked(event) {}
    }, {
        key: "onStopClicked",
        value: function onStopClicked(event) {}
    }, {
        key: "onStepForwardClicked",
        value: function onStepForwardClicked(event) {}
    }]);

    return ProgramExecutor;
}(_Window2.Window);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./programExecutor.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./programExecutor.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".program-executor .toolbar {\n  height: 48px; }\n  .program-executor .toolbar .item {\n    display: inline-block; }\n    .program-executor .toolbar .item img {\n      width: 48px;\n      height: 48px; }\n  .program-executor .toolbar .item:hover {\n    background: lightblue; }\n\n.program-executor .line {\n  height: 18px; }\n  .program-executor .line .gutter {\n    display: inline-block;\n    background-color: lightgrey;\n    width: 52px;\n    text-align: right;\n    padding-right: 8px; }\n  .program-executor .line .content {\n    display: inline-block;\n    padding-left: 16px; }\n\n.program-executor .watcher {\n  height: 99%; }\n  .program-executor .watcher .title {\n    font-size: 14px;\n    padding-top: 2px;\n    padding-bottom: 2px;\n    padding-left: 4px;\n    padding-right: 4px;\n    background-color: lightgrey; }\n  .program-executor .watcher .content {\n    padding: 4px; }\n  .program-executor .watcher .variable {\n    color: #6161FF;\n    cursor: default; }\n  .program-executor .watcher .variable:hover {\n    text-decoration: underline; }\n\n.program-executor .variable-area {\n  height: 60%; }\n\n.program-executor .constant-area {\n  height: 40%; }\n\n.program-executor .code-area {\n  height: 99%;\n  overflow-y: scroll; }\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

var resources = "トーマス・アンダーソンは、大手ソフトウェア会社のメタ・コーテックス[3]に勤めるプログラマである。しかし、トーマスにはあらゆるコンピュータ犯罪を起こす天才ハッカー[4]ネオという、もう1つの顔があった。平凡な日々を送っていたトーマスは、ここ最近、起きているのに夢を見ているような感覚に悩まされ「今生きているこの世界は、もしかしたら夢なのではないか」という、漠然とした違和感を抱いていたが、それを裏付ける確証も得られず毎日を過ごしていた。" + "ある日、トーマスは「起きろ、ネオ」「マトリックスが見ている」「白ウサギについて行け」という謎のメールを受け取る。ほどなくしてトリニティと名乗る謎の女性と出会ったトーマスは、トリニティの仲間のモーフィアスを紹介され「貴方が生きているこの世界は、コンピュータによって作られた仮想現実だ」と告げられ、このまま仮想現実で生きるか、現実の世界で目覚めるかの選択を迫られる。日常の違和感に悩まされていたトーマスは現実の世界で目覚める事を選択する。次の瞬間、トーマスは自分が培養槽のようなカプセルの中に閉じ込められ、身動きもできない状態であることに気付く。トリニティ達の言ったことは真実で、現実の世界はコンピュータの反乱[5]によって人間社会が崩壊し、人間の大部分はコンピュータの動力源として培養されていた。覚醒してしまったトーマスは不良品として廃棄されるが、待ち構えていたトリニティとモーフィアスに救われた。" + "トーマスは、モーフィアスが船長を務める工作船「ネブカドネザル号」の仲間として迎えられ、ハッカーとして使っていた名前「ネオ」を名乗ることになった。モーフィアスはネオこそがコンピュータの支配を打ち破る救世主であると信じており、仮想空間での身体の使い方や、拳法などの戦闘技術を習得させた。人類の抵抗軍の一員となったネオは、仮想空間と現実を行き来しながら、人類をコンピュータの支配から解放する戦いに身を投じる事になった。" + "《黑客帝国》（英语：The Matrix）是一部1999年的好莱坞科幻电影，由沃卓斯基姐妹执导，基努·里维斯、劳伦斯·菲什伯恩、凯莉·安摩丝及雨果·威文等人主演，并由香港电影界的袁和平担任武术指导。此片以其独到的哲学和子弹时间的特殊慢镜头及各式电脑特效著名，在全球获取亮眼票房，并在2003年，推出续集《黑客帝国2：重装上阵》及第三集《黑客帝国3：矩阵革命》";

function ShuffleString(str, len) {
    var result = "";
    var str_len = str.length;
    for (var i = 0; i < len; i++) {
        var rd = Math.round(Math.random(new Date()) * str_len);
        result += str[rd];
    }
    return result;
}

var total_level = 128;
var black_level = 72;

var VirtualLine = exports.VirtualLine = function () {
    function VirtualLine(x_offset, width, height, font_width, font_height) {
        _classCallCheck(this, VirtualLine);

        this._x_offset = x_offset;
        this._width = width;
        this._height = height;

        this._font_width = font_width;
        this._font_height = font_height;

        this._content = ShuffleString(resources, total_level);

        this._tick = total_level;
        this._offset_step = Math.round(Math.random() * total_level);
    }

    _createClass(VirtualLine, [{
        key: "paint",
        value: function paint(ctx, deltaTime) {
            var text_length = Math.ceil(this._height / this._font_height);
            for (var i = 0; i < text_length; i++) {
                var absolute_level = (i + this._offset_step - this._tick) % total_level + total_level;
                if (absolute_level > black_level) {
                    var color_level = absolute_level - black_level;
                    var green_level = Math.round(color_level / (total_level - black_level) * 255);
                    if (green_level === 255) {
                        ctx.shadowColor = "white";
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 0;
                        ctx.shadowBlur = 10;
                        ctx.fillStyle = "rgb(20," + green_level.toString() + ",20)";
                    } else {
                        ctx.shadowBlur = 0;
                        ctx.fillStyle = "rgb(0," + green_level.toString() + ",0)";
                    }
                    ctx.fillText(this._content[i], this._x_offset, i * this._font_height);
                }
            }
            this._tick++;

            var test_level = (this._offset_step - this._tick) % total_level + total_level;
            if (test_level === 1) {
                this._content = ShuffleString(resources, total_level);
            }
            /*
            if (this._tick % this._offset_step === 0) {
                this._content = ShuffleString(resources);
            }
            */
        }
    }, {
        key: "x_offset",
        get: function get() {
            return this._x_offset;
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(value) {
            this._width = value;
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(value) {
            this._height = value;
        }
    }]);

    return VirtualLine;
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TaskManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Window2 = __webpack_require__(0);

var _taskManager = __webpack_require__(23);

var _taskManager2 = _interopRequireDefault(_taskManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date:   2017-08-14 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ************************/

var task_manager_template = "<div id=\"task-manager\" class=\"task-manager\">\n    <div class=\"tabs\">\n        <ul class=\"unselectable\">\n            <li v-bind:class=\"{ active: nav_number == 1}\" v-on:click=\"choose(1)\">Process</li>\n            <li v-bind:class=\"{ active: nav_number == 2}\" v-on:click=\"choose(2)\">CPU</li>\n            <li v-bind:class=\"{ active: nav_number == 3}\" v-on:click=\"choose(3)\">Memory</li>\n            <li v-bind:class=\"{ active: nav_number == 4}\" v-on:click=\"choose(4)\">Information</li>\n        </ul>\n    </div>\n    <div class=\"main-frame\">\n        <slot name=\"processPage\" />\n        <slot name=\"cpuPage\" />\n        <slot name=\"memoryPage\" />\n        <slot name=\"infoPage\" />\n    </div>\n</div>";

var process_page_template = "<div v-show=\"nav_number == 1\" class=\"process-page page\">\n    <table>\n        <thead>\n            <tr>\n                <th>PID</th>\n                <th>Process Name</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>#aaa</td>\n                <td>Name.asm</td>\n            </tr>\n        </tbody>\n    </table>\n</div>";

var cpu_page_template = "<div v-show=\"nav_number == 2\" class=\"cpu-page page\">\n</div>";

var memory_page_template = "<div v-show=\"nav_number == 3\" class=\"memory-page page\">\n</div>";

var info_page_template = "<div v-show=\"nav_number == 4\" class=\"info-page page\">\n    <div class=\"content-body\">\n        <h1>ZOS</h1>\n        <table>\n            <tbody>\n                <tr>\n                    <td class=\"name\">ComputerName</td>\n                    <td>ZOS-Simualtor</td>\n                </tr>\n                <tr>\n                    <td class=\"name\">Company</td>\n                    <td>fsociety</td>\n                </tr>\n                <tr>\n                    <td class=\"name\">OS Version</td>\n                    <td>ZOS-1.0.0</td>\n                </tr>\n                <tr>\n                    <td class=\"name\">Processor</td>\n                    <td>ZVM 1.0.0</td>\n                </tr>\n                <tr>\n                    <td class=\"name\">Memory</td>\n                    <td>256k</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>";

var TaskManager = exports.TaskManager = function (_Window) {
    _inherits(TaskManager, _Window);

    function TaskManager(wm) {
        _classCallCheck(this, TaskManager);

        var _this = _possibleConstructorReturn(this, (TaskManager.__proto__ || Object.getPrototypeOf(TaskManager)).call(this, wm));

        _this.Slot('default', _this.RenderTemplate(task_manager_template));

        _this.Slot('processPage', _this.RenderTemplate(process_page_template));
        _this.Slot('cpuPage', _this.RenderTemplate(cpu_page_template));
        _this.Slot('memoryPage', _this.RenderTemplate(memory_page_template));
        _this.Slot('infoPage', _this.RenderTemplate(info_page_template));

        _this.width = 640;
        _this.height = 480;

        _this.title = "Task Manager";
        return _this;
    }

    _createClass(TaskManager, [{
        key: "Render",
        value: function Render(dom) {
            _get(TaskManager.prototype.__proto__ || Object.getPrototypeOf(TaskManager.prototype), "Render", this).call(this, dom);
        }
    }, {
        key: "onMounted",
        value: function onMounted() {
            var app = new Vue({
                el: '#task-manager',
                data: {
                    nav_number: 1,
                    message: 'Hello world'
                },
                methods: {
                    choose: function choose(number) {
                        this.nav_number = number;
                    }
                }
            });
        }
    }]);

    return TaskManager;
}(_Window2.Window);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./taskManager.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./taskManager.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".tabs ul {\n  padding: 0px;\n  margin: 0px; }\n  .tabs ul li {\n    display: inline-block;\n    list-style: none;\n    margin: 0px;\n    padding-top: 8px;\n    padding-bottom: 8px;\n    padding-left: 14px;\n    padding-right: 14px; }\n  .tabs ul li.active {\n    background-color: #ADD8E6; }\n  .tabs ul li:hover {\n    background-color: #C6DAE0;\n    cursor: pointer; }\n\n.process-page table {\n  width: 100%;\n  border-collapse: collapse; }\n  .process-page table tbody tr:hover {\n    background-color: lightgrey; }\n", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map