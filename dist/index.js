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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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

var	fixUrls = __webpack_require__(12);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _WindowsManager = __webpack_require__(7);

var _TextEditor = __webpack_require__(4);

/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

var _require = __webpack_require__(5),
    VirtualLine = _require.VirtualLine;

// import {FileWindow} from "./Files/FileWindow"
// import {ProgramExecutor} from "./ProgramExecutor/ProgramExecutor"

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

    new Vue({

        el: "#world",

        components: {
            'text-editor': _TextEditor.TextEditorComponent
        },

        data: {
            wm: wm
        }

    });

    // let my_window = new TextEditor(wm);
    // let pe = new ProgramExecutor(wm);
    // let fw = new FileWindow(wm);

    // let world = document.getElementById('world');
    // world.appendChild(my_window.dom);
    // world.appendChild(pe.dom);
    // world.appendChild(fw.dom);
});

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextEditorComponent = undefined;

var _Window = __webpack_require__(6);

var _textEditor = __webpack_require__(11);

var _textEditor2 = _interopRequireDefault(_textEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

var template = "<Window v-bind:wm=\"wm\" v-bind:title-content=\"titleContent\">\n    <div class=\"text-editor\">\n        <div class=\"toolbar\">\n            <span class=\"btn\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i></span>\n            <span class=\"btn\"><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></span>\n        </div>\n        <textarea class=\"real-editor\"></textarea>\n    </div>\n</Window>";

var TextEditorComponent = exports.TextEditorComponent = {

    props: ['wm', 'titleContent'],

    template: template,

    components: {
        'Window': _Window.WindowComponent
    }

};

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WindowComponent = undefined;

var _main = __webpack_require__(10);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var window_template = '<div class="window" ref="frame" :style="{ left: x + \'px\', top: y + \'px\', zIndex: zIndex }"\n    v-on:mousedown="onMouseDown($event)">\n    <div class="titleBar unselectable" ref="titlebar" \n        v-on:mouseup="onTitleBarMouseUp($event)"\n        v-on:mousedown="onTitleBarMouseDown($event)">\n\n        <div class="right">\n            <i class="fa fa-window-close" aria-hidden="true"></i>\n        </div>\n        <p class="name" >{{ titleContent }}</p>\n    </div>\n    <div>\n        <slot />\n    </div>\n</div>'; /************************ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Author: DZ Chan 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Date:   2017-08-12 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ************************/

var WindowComponent = exports.WindowComponent = {
    props: ['wm', 'titleContent'],
    template: window_template,

    mounted: function mounted() {
        var _this = this;

        this.zIndex = this.wm.zIndexCounter();
        this.windowsID = this.wm.GetNewId();

        this.wm.addEventListener("focusedWindowChanged", function (id) {
            if (id === _this.windowsID) {
                _this.$refs.frame.focus();
            } else {
                _this.unfocus();
            }
        });
        window.addEventListener("mousemove", function (event) {
            return _this.onMouseMove(event);
        });
    },

    data: function data() {
        return {
            x: 16,
            y: 16,
            width: 400,
            height: 300,
            title: "Window",
            titleBarPressed: false,
            focused: false,
            zIndex: 0,
            windowsID: -1
        };
    },

    methods: {

        focus: function focus() {
            if (!this._focused) {
                this._focused = true;
                this.zIndex = this.wm.zIndexCounter();
                this._dom.classList.add('glowing-border');
            }
        },

        unfocus: function unfocus() {
            this._focused = false;
            this._dom.classList.remove('glowing-border');
        },

        onMouseDown: function onMouseDown(event) {
            this.wm.FocusWindow(this.windowsID);
        },

        onMouseMove: function onMouseMove(event) {
            if (this.titleBarPressed) {
                this.x = event.clientX - this.lastOffset.x, this.y = event.clientY - this.lastOffset.y, this.lastOffset = {
                    x: event.clientX - this.x,
                    y: event.clientY - this.y
                };
            }
        },

        onTitleBarMouseDown: function onTitleBarMouseDown(event) {
            this.titleBarPressed = true;
            this.lastOffset = {
                x: event.clientX - this.x,
                y: event.clientY - this.y
            };

            this.zIndex = this.wm.zIndexCounter();
        },

        onTitleBarMouseUp: function onTitleBarMouseUp(event) {
            this.titleBarPressed = false;
        }

    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WindowsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Emitter2 = __webpack_require__(3);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.glowing-border {\n  outline: none;\n  border-color: #9ecaed;\n  box-shadow: 0 0 20px #49afff; }\n\n.window {\n  position: fixed;\n  background-color: white;\n  border-style: solid;\n  border-width: 2px;\n  border-color: white; }\n  .window .titleBar {\n    width: 100%;\n    background-color: lightblue;\n    height: 16px; }\n    .window .titleBar .name {\n      font-size: 14px;\n      color: black;\n      margin: 0px;\n      cursor: default; }\n    .window .titleBar p {\n      line-height: 16px; }\n  .window .right {\n    position: absolute;\n    right: 0px;\n    font-size: 14px;\n    line-height: 16px; }\n  .window .right:hover {\n    background-color: white;\n    color: lightblue; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".text-editor .toolbar {\n  height: 20px; }\n  .text-editor .toolbar .btn {\n    margin: 2px; }\n  .text-editor .toolbar .btn:hover {\n    background: lightblue; }\n\n.text-editor .real-editor {\n  height: 260px;\n  width: 396px; }\n", ""]);

// exports


/***/ }),
/* 10 */
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
var update = __webpack_require__(1)(content, options);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map