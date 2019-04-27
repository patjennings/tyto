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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/addPost.js":
/*!***************************!*\
  !*** ./src/js/addPost.js ***!
  \***************************/
/*! exports provided: simplemde, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"simplemde\", function() { return simplemde; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addPost; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _components_UIinput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UIinput */ \"./src/js/components/UIinput.js\");\n/* harmony import */ var _listenersSave__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listenersSave */ \"./src/js/listenersSave.js\");\n/* harmony import */ var _components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UISpotCreation */ \"./src/js/components/UISpotCreation.js\");\n\n\n\n\n\n\n\nlet isCreating = null;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar simplemde;\nfunction addPost(currentPosition) {\n  var long = currentPosition[1];\n  var lat = currentPosition[0];\n  st.isCreating = true;\n  Object(_components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"#4980ef\", lat, long); // marquer l'endroit où la zone est créée\n  // create layer w/ input + save button\n\n  var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([lat, long]);\n  var elements = Object(_components_UIinput__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"content\", proj, long, lat);\n  $(\".map\").append(elements);\n  startMarkdownEditor();\n  Object(_listenersSave__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"content\");\n}\n\nfunction startMarkdownEditor() {\n  simplemde = new SimpleMDE({\n    element: document.getElementById(\"content-content\")\n  });\n}\n\n//# sourceURL=webpack:///./src/js/addPost.js?");

/***/ }),

/***/ "./src/js/addZone.js":
/*!***************************!*\
  !*** ./src/js/addZone.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addZone; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _components_UIinput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UIinput */ \"./src/js/components/UIinput.js\");\n/* harmony import */ var _listenersSave__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listenersSave */ \"./src/js/listenersSave.js\");\n/* harmony import */ var _components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UISpotCreation */ \"./src/js/components/UISpotCreation.js\");\n\n\n\n\n\n\n\nlet isCreating = null;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"](); // var simplemde;\n\nfunction addZone(currentPosition) {\n  var long = currentPosition[1];\n  var lat = currentPosition[0];\n  st.isCreating = true;\n  Object(_components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"#ba1021\", lat, long); // marquer l'endroit où la zone est créée\n  // create layer w/ input + save button\n\n  var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([lat, long]);\n  var elements = Object(_components_UIinput__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"zone\", proj, long, lat);\n  $(\".map\").append(elements);\n  Object(_listenersSave__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"zone\");\n}\n\n//# sourceURL=webpack:///./src/js/addZone.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! exports provided: default, requestPosts, requestZones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return app; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestPosts\", function() { return requestPosts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestZones\", function() { return requestZones; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _addPost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addPost */ \"./src/js/addPost.js\");\n/* harmony import */ var _utils_copyTextToClipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/copyTextToClipboard */ \"./src/js/utils/copyTextToClipboard.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/scale */ \"./src/js/utils/scale.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_scale__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _displayPosts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./displayPosts */ \"./src/js/displayPosts.js\");\n/* harmony import */ var _displayZones__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./displayZones */ \"./src/js/displayZones.js\");\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./listeners */ \"./src/js/listeners.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n\n\n\n\n\n\n\n\n\nlet content = null;\nlet st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n(function (window) {\n  app();\n})(window);\n\nfunction app() {\n  configure();\n  displayMapBackground(_globals__WEBPACK_IMPORTED_MODULE_0__[\"mapDataPath\"], _globals__WEBPACK_IMPORTED_MODULE_0__[\"pathProjection\"]); // Afficher la carte\n\n  console.log(_globals__WEBPACK_IMPORTED_MODULE_0__[\"pathProjection\"]);\n}\n\nfunction configure() {\n  st.isCreating = false;\n  st.isDragging = false;\n  if (st.scaleFac == null) st.scaleFac = 40000.503614997007;\n  if (st.currentPosition == null) st.currentPosition = [0, 0];\n  let svg = d3.select(\"svg\");\n\n  if (svg) {\n    d3.select(\"svg\").remove(); // on réinitialise tout\n\n    d3.select(\"body\").append(\"svg\").attr(\"width\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"width\"]).attr(\"height\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"height\"]);\n  }\n\n  d3.select(\"svg\").append(\"g\").append(\"rect\").attr(\"class\", \"background\").attr(\"width\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"width\"]).attr(\"height\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"height\"]);\n}\n\nfunction displayMapBackground(mapData, mapProjection) {\n  d3.json(mapData, function (error, json) {\n    if (error) throw error;\n    d3.select(\"svg\").append(\"g\").attr(\"id\", \"states\").selectAll(\"path\").data(json.features).enter().append(\"path\").attr(\"d\", mapProjection).attr(\"id\", function (d, i) {\n      return i;\n    }).style(\"stroke\", \"#999999\").style(\"fill\", \"rgba(255,255,255,0.5)\");\n    requestPosts(); // création des articles\n\n    requestZones(); // création des titres de zones\n  });\n}\n\nfunction requestPosts() {\n  // on télécharge les données\n  var postsData = Object(_request__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(\"GET\", \"server/list-content.php\", null, _displayPosts__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n}\nfunction requestZones() {\n  // on télécharge les données\n  var zonesData = Object(_request__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(\"GET\", \"dist/zones.json\", null, _displayZones__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/components/UISpotCreation.js":
/*!*********************************************!*\
  !*** ./src/js/components/UISpotCreation.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UISpotCreation; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n\nfunction UISpotCreation(color, latitude, longitude) {\n  // point où la zone sera créée\n  d3.select(\"svg\").append(\"g\").attr(\"longitude\", longitude).attr(\"latitude\", latitude).attr(\"class\", \"creation-spot\").attr(\"transform\", function () {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([latitude, longitude]);\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  });\n  d3.select(\".creation-spot\").append(\"circle\").attr(\"cx\", 0).attr(\"cy\", 0).attr(\"r\", 4).attr(\"fill\", color);\n  d3.select(\".creation-spot\").append(\"circle\").attr(\"r\", 24).attr(\"fill\", color).attr(\"opacity\", 0.2);\n}\n\n//# sourceURL=webpack:///./src/js/components/UISpotCreation.js?");

/***/ }),

/***/ "./src/js/components/UIinput.js":
/*!**************************************!*\
  !*** ./src/js/components/UIinput.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UIinput; });\n// import * as globals from \"./globals\";\n// import appState from \"./globals\";\n// import request from './request';\n// import app from './app';\nfunction UIinput(type, proj, articleLat, articleLong) {\n  var e;\n\n  if (type == \"content\") {\n    // e = \"<div id='input-container' style='transform: translate(\"+proj[0]+\"px, \"+proj[1]+\"px);'>\";\n    e = \"<div id='input-container'>\";\n    e += \"<input id='content-title' placeholder='Titre'></input>\";\n    e += \"<textarea id='content-content' rows='18' placeholder='Contenu de cet article'></textarea>\";\n    e += \"<input id='content-position-long' type='hidden' value='\" + articleLong + \"'/>\";\n    e += \"<input id='content-position-lat' type='hidden' value='\" + articleLat + \"'/>\";\n    e += \"<div class='btn-container'>\";\n    e += \"<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>\";\n    e += \"<button value='cancel' class='btn' id='document-cancel'>Annuler</button>\";\n    e += \"</div>\";\n    e += \"</div>\";\n  } else if (type == \"zone\") {\n    // e = \"<div id='input-container' style='transform: translate(\"+proj[0]+\"px, \"+proj[1]+\"px);'>\";\n    e = \"<div id='input-container'>\";\n    e += \"<input id='content-title' placeholder='Titre'></input>\";\n    e += \"<input id='content-position-long' type='hidden' value='\" + articleLong + \"'/>\";\n    e += \"<input id='content-position-lat' type='hidden' value='\" + articleLat + \"'/>\";\n    e += \"<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>\";\n    e += \"<button value='cancel' class='btn' id='document-cancel'>Annuler</button>\";\n    e += \"</div>\";\n    e += \"</div>\";\n  }\n\n  return e;\n}\n\n//# sourceURL=webpack:///./src/js/components/UIinput.js?");

/***/ }),

/***/ "./src/js/displayPosts.js":
/*!********************************!*\
  !*** ./src/js/displayPosts.js ***!
  \********************************/
/*! exports provided: default, updatePosts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return displayPosts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updatePosts\", function() { return updatePosts; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listeners */ \"./src/js/listeners.js\");\n\n\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet linkDisplay = false; /////////////////////////\n// Ajouter les articles\n//////////////////////////\n\nfunction displayPosts(data) {\n  st.postsData = JSON.parse(data); // on récupère les données des contenus\n\n  console.log(st.postsData);\n  d3.select(\"#articles\").remove(); // On supprime si #articles existe, comme lors d'un déplacement de contenu > on reset\n\n  d3.select(\"svg\").append(\"g\").attr(\"id\", \"articles\").selectAll(\"g\").data(st.postsData).enter().append(\"g\").attr(\"class\", \"card\");\n  d3.selectAll(\".card\").attr(\"id\", function (d) {\n    return d.raw;\n  }).attr(\"transform\", function (d) {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]);\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  });\n  d3.selectAll(\".card\").append(\"circle\").attr(\"cx\", 0).attr(\"cy\", 0).attr(\"r\", 4).attr(\"fill\", \"#000000\");\n  d3.selectAll(\".card\").append(\"svg:foreignObject\").attr(\"width\", 256).attr(\"height\", 200).attr(\"x\", 4).attr(\"y\", 4) // .attr(\"style\", \"font-size: 12px; font-family: lato; font-weight: 400;\")\n  .append(\"xhtml:body\").append(\"div\").attr(\"class\", \"card-title\").text(function (d) {\n    return d.title;\n  });\n  d3.selectAll(\".card\").select(\"body\").attr(\"id\", function (d) {\n    return \"wrapper-\" + d.raw;\n  }).append(\"div\").attr(\"class\", \"card-content\").html(function (d) {\n    return getContent(d);\n  });\n  d3.selectAll(\".card\").select(\"body\").append(\"div\").attr(\"class\", \"card-link\").html(function (d) {\n    return linkDisplay ? getLink(d) : null;\n  });\n  adjustFoHeight();\n  Object(_listeners__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); // on active les écouteurs\n} // Permet d'ajuster automatiquement la hauteur du foreignObject en se basant sur le body\n\nfunction adjustFoHeight() {\n  d3.selectAll(\".card\").select(\"foreignObject\").attr(\"height\", function (d) {\n    let bodyHeight = document.getElementById(\"wrapper-\" + d.raw).clientHeight;\n    return bodyHeight;\n  });\n}\n\nfunction updatePosts(newProjection = null) {\n  // transforme les points au zoom et translate\n  d3.selectAll(\".card\").attr(\"transform\", function (d) {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]);\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  });\n  d3.selectAll(\".card\").select(\".card-content\").html(function (d) {\n    return getContent(d);\n  });\n  d3.selectAll(\".card\").select(\".card-link\").html(function (d) {\n    return linkDisplay ? getLink(d) : null;\n  });\n  adjustFoHeight();\n} // return the  content, related to zoom level\n\nfunction getContent(data) {\n  if (st.scaleFac < toD3Scale(st.steps[1].level)) {\n    logger(st.steps[0].name, toD3Scale(st.steps[0].level), st.scaleFac);\n    linkDisplay = false;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[0].name);\n    return null;\n  } else if (st.scaleFac > toD3Scale(st.steps[1].level) && st.scaleFac < toD3Scale(st.steps[2].level)) {\n    logger(st.steps[1].name, toD3Scale(st.steps[1].level), st.scaleFac);\n    linkDisplay = false;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[1].name);\n    return data.content.top;\n  } else if (st.scaleFac > toD3Scale(st.steps[2].level) && st.scaleFac < toD3Scale(st.steps[3].level)) {\n    logger(st.steps[2].name, toD3Scale(st.steps[2].level), st.scaleFac);\n    linkDisplay = true;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[2].name);\n    return data.content.middle;\n  } else if (st.scaleFac > toD3Scale(st.steps[3].level)) {\n    logger(st.steps[3].name, toD3Scale(st.steps[3].level), st.scaleFac);\n    linkDisplay = true;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[3].name);\n    return data.content.low;\n  }\n}\n\nfunction getLink(data) {\n  const link = \"<a href='\" + st.rootDir + \"article.php?path=\" + st.rootDir + data.path + \"'>Link</a>\";\n  return link;\n}\n\nfunction toD3Scale(initialScale) {\n  // get readable scale from my vars to unreadable scale for D3\n  return initialScale * 100000;\n}\n\nfunction logger(stName, stLevel, stCur) {\n  console.log(\"Zoom level :\" + stName + \"(\" + stLevel / 10000 + \") while at : \" + stCur / 10000);\n}\n\n//# sourceURL=webpack:///./src/js/displayPosts.js?");

/***/ }),

/***/ "./src/js/displayZones.js":
/*!********************************!*\
  !*** ./src/js/displayZones.js ***!
  \********************************/
/*! exports provided: default, updateZones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return displayZones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateZones\", function() { return updateZones; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n\n /////////////////////////\n// Ajouter les zones\n/////////////////////////\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction displayZones(data) {\n  st.zonesData = JSON.parse(data); // on récupère les données des zones\n\n  d3.select(\"svg\").append(\"g\").attr(\"id\", \"zones\").selectAll(\"text\").data(st.zonesData).enter().append(\"g\").attr(\"class\", \"zone\").append(\"text\").attr(\"font-family\", \"lato\").attr(\"font-size\", \"16px\").attr(\"text-anchor\", \"middle\").text(function (d) {\n    return d.title;\n  });\n  d3.select(\"svg\").selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  });\n}\nfunction updateZones(newProjection = null) {\n  d3.select(\"svg\").selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  });\n} ///////\n\n//# sourceURL=webpack:///./src/js/displayZones.js?");

/***/ }),

/***/ "./src/js/globals.js":
/*!***************************!*\
  !*** ./src/js/globals.js ***!
  \***************************/
/*! exports provided: default, mapDataPath, width, height, projection, pathProjection, cardsWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return appState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapDataPath\", function() { return mapDataPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"width\", function() { return width; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"height\", function() { return height; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projection\", function() { return projection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pathProjection\", function() { return pathProjection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cardsWidth\", function() { return cardsWidth; });\n/* harmony import */ var _scaleMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scaleMap */ \"./src/js/scaleMap.js\");\n // toutes ces variables sont modifiées dans init.js, via l'objet appState()\n\nlet isCreating = null; // on est en train de créer un article // false\n\nlet isDragging = null; // false\n\nlet scaleFac = null; // doit être modifié //40000.503614997007\n\nlet currentPosition = null; // doit être modifié //[0, 0]\n\nlet postsData = null; // doit être modifié avec le nouveau contenu chargé du json\n\nlet zonesData = null;\nlet firstStart = true;\nconst rootDir = \"http://localhost/tyto/\";\nconst postsDir = rootDir + \"dist/content/\";\nconst steps = [{\n  name: \"space\",\n  level: 0\n}, {\n  name: \"sky\",\n  level: 13\n}, {\n  name: \"bird\",\n  level: 50\n}, {\n  name: \"ground\",\n  level: 260\n}]; // cette fonction contient modifie les états de l'application, avec des getters et des setters\n// pour pouvoir vivre tout au long du déroulement\n// s'applique sur les trois variables déclarées au dessus\n\nfunction appState() {\n  Object.defineProperty(this, 'isCreating', {\n    get: function () {\n      return isCreating;\n    },\n    set: function (value) {\n      isCreating = value;\n    }\n  });\n  Object.defineProperty(this, 'isDragging', {\n    get: function () {\n      return isDragging;\n    },\n    set: function (value) {\n      isDragging = value;\n    }\n  });\n  Object.defineProperty(this, 'scaleFac', {\n    get: function () {\n      return scaleFac;\n    },\n    set: function (value) {\n      scaleFac = value;\n    }\n  });\n  Object.defineProperty(this, 'currentPosition', {\n    get: function () {\n      return currentPosition;\n    },\n    set: function (value) {\n      currentPosition = value;\n    }\n  });\n  Object.defineProperty(this, 'postsData', {\n    get: function () {\n      return postsData;\n    },\n    set: function (value) {\n      postsData = value;\n    }\n  });\n  Object.defineProperty(this, 'zonesData', {\n    get: function () {\n      return zonesData;\n    },\n    set: function (value) {\n      zonesData = value;\n    }\n  });\n  Object.defineProperty(this, 'firstStart', {\n    get: function () {\n      return firstStart;\n    },\n    set: function (value) {\n      firstStart = value;\n    }\n  });\n  Object.defineProperty(this, 'rootDir', {\n    get: function () {\n      return rootDir;\n    },\n    set: function (value) {\n      rootDir = value;\n    }\n  });\n  Object.defineProperty(this, 'postsDir', {\n    get: function () {\n      return postsDir;\n    },\n    set: function (value) {\n      postsDir = value;\n    }\n  });\n  Object.defineProperty(this, 'steps', {\n    get: function () {\n      return steps;\n    },\n    set: function (value) {\n      steps = value;\n    }\n  });\n}\nvar st = new appState();\nvar mapDataPath = \"dist/assets/schinoussa.geojson\";\nvar width = screen.availWidth;\nvar height = screen.availHeight;\nvar projection = d3.geo.mercator().scale(485035).translate([-215431, 336666]);\nvar pathProjection = d3.geo.path().projection(projection);\nvar cardsWidth = 340;\n\n//# sourceURL=webpack:///./src/js/globals.js?");

/***/ }),

/***/ "./src/js/listeners.js":
/*!*****************************!*\
  !*** ./src/js/listeners.js ***!
  \*****************************/
/*! exports provided: default, removeUIinput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return listeners; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeUIinput\", function() { return removeUIinput; });\n/* harmony import */ var _scaleMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scaleMap */ \"./src/js/scaleMap.js\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _addPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addPost */ \"./src/js/addPost.js\");\n/* harmony import */ var _addZone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addZone */ \"./src/js/addZone.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n/* harmony import */ var _displayPosts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./displayPosts */ \"./src/js/displayPosts.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\n\n\n\n\n\n\n\nlet ctrlPushed = false;\nlet altPushed = false;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar selectedNode = null;\nfunction listeners() {\n  // Ctrl key listener, pour utiliser avec le click lors de la création de documents\n  window.addEventListener('keydown', event => {\n    if (event.ctrlKey) {\n      ctrlPushed = true; // console.log(ctrlPushed);\n    }\n\n    if (event.altKey) {\n      altPushed = true; // console.log(altPushed);\n    }\n\n    if (event.keyCode == 27) {\n      // console.log(\"esc called\");\n      removeUIinput();\n    }\n  }, false);\n  window.addEventListener('keyup', event => {\n    ctrlPushed = false;\n    altPushed = false; // console.log(ctrlPushed);\n  }, false);\n  d3.select(\"body\").select(\"svg\").on('mousemove', function () {\n    st.currentPosition = _globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].invert(d3.mouse(this));\n  }).on('click', function () {\n    st.currentPosition = _globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].invert(d3.mouse(this));\n\n    if (ctrlPushed == true && altPushed == false && st.isCreating == false) {\n      // si on peut créer un doc ET que la touche ctrl est enfoncée\n      // si trop bas ou trop à droite, transformation\n      Object(_addPost__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(st.currentPosition);\n    }\n\n    if (ctrlPushed == true && altPushed == true && st.isCreating == false) {\n      Object(_addZone__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(st.currentPosition);\n    }\n\n    return;\n  }); // on déclare le zoom\n\n  var zoom = d3.behavior.zoom().translate(_globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].translate()).scale(_globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].scale()) // .wheelDelta(wheelDelta)\n  .on(\"zoom\", _scaleMap__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); // puis on l'appelle\n\n  d3.select(\"svg\").call(zoom);\n  d3.select(\"#articles\").selectAll(\".card\").call(dragListener);\n}\nvar dragListener = d3.behavior.drag().on(\"dragstart\", function (d) {\n  st.draggingNode = true;\n  d3.event.sourceEvent.stopPropagation(); // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');\n}).on(\"drag\", function (d) {\n  var card = d3.select(this);\n  card.attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"](st.currentPosition) + \")\";\n  });\n  console.log(\"Start dragging element\");\n}).on(\"dragend\", function (d) {\n  var card = d3.select(this);\n  var titleRaw = card.attr(\"id\");\n  console.log(\"Stop dragging element\"); // et là, on modifie la position dans le fichier lié à l'item draggé/droppé\n\n  Object(_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"POST\", \"server/utils/UpdateMarkdownDocument.php\", \"titleraw=\" + titleRaw + \"&newlongitude=\" + st.currentPosition[0] + \"&newlatitude=\" + st.currentPosition[1], _app__WEBPACK_IMPORTED_MODULE_6__[\"requestPosts\"]);\n});\n\nfunction endDrag() {\n  selectedNode = null;\n\n  if (st.draggingNode !== null) {\n    st.draggingNode = null;\n  }\n}\n\nfunction wheelDelta() {\n  return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 1500;\n}\n\nfunction removeUIinput() {\n  // console.log(\"stop la création\");\n  var box = document.getElementById(\"input-container\");\n  box.parentNode.removeChild(box);\n  d3.select(\"svg\").selectAll(\".creation-spot\").remove();\n  st.isCreating = false;\n  return;\n}\n\n//# sourceURL=webpack:///./src/js/listeners.js?");

/***/ }),

/***/ "./src/js/listenersSave.js":
/*!*********************************!*\
  !*** ./src/js/listenersSave.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return listenersSave; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _addPost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addPost */ \"./src/js/addPost.js\");\n/* harmony import */ var _addZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addZone */ \"./src/js/addZone.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./listeners */ \"./src/js/listeners.js\");\n// import scaleMap from \"./scaleMap\";\n\n\n\n\n\n\n\n\nlet ctrlPushed = false;\nlet altPushed = false;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar selectedNode = null;\nfunction listenersSave(target) {\n  var btnValidate = document.getElementById(\"document-validate\");\n  var btnCancel = document.getElementById(\"document-cancel\");\n  btnValidate.addEventListener('click', function () {\n    // console.log(\"save file\");\n    var titleValue = document.getElementById(\"content-title\").value;\n    var longValue = document.getElementById(\"content-position-long\").value;\n    var latValue = document.getElementById(\"content-position-lat\").value;\n\n    if (target == \"content\") {\n      // si c'est un article\n      var contentValue = _addPost__WEBPACK_IMPORTED_MODULE_1__[\"simplemde\"].value();\n      var contentFormatted = \"title: \" + titleValue + \"\\nposition: \" + latValue + \", \" + longValue + \"\\n\\n---\\n\" + contentValue; // le title intégré dans la desc du markdown\n\n      Object(_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"POST\", \"server/utils/SaveMarkdownDocument.php\", \"title=\" + titleValue + \"&content=\" + contentFormatted, _app__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    }\n\n    if (target == \"zone\") {\n      var longValue = document.getElementById(\"content-position-long\").value;\n      var latValue = document.getElementById(\"content-position-lat\").value;\n      Object(_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"POST\", \"server/utils/SaveZone.php\", \"title=\" + titleValue + \"&latitude=\" + latValue + \"&longitude=\" + longValue, _app__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    }\n\n    Object(_listeners__WEBPACK_IMPORTED_MODULE_5__[\"removeUIinput\"])();\n  }, false);\n  btnCancel.addEventListener('click', function () {\n    Object(_listeners__WEBPACK_IMPORTED_MODULE_5__[\"removeUIinput\"])();\n  }, false);\n}\n\n//# sourceURL=webpack:///./src/js/listenersSave.js?");

/***/ }),

/***/ "./src/js/request.js":
/*!***************************!*\
  !*** ./src/js/request.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return request; });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\n // AJAX requests\n\nfunction getRequestObject() {\n  var o = null;\n\n  if (window.XMLHttpRequest) {\n    o = new XMLHttpRequest();\n  } else if (window.ActiveXObject) {\n    try {\n      o = new ActiveXObject('Msxml2.XMLHTTP');\n    } catch (e1) {\n      try {\n        o = new ActiveXObject('Microsoft.XMLHTTP');\n      } catch (e2) {}\n    }\n  }\n\n  return o;\n}\n\nfunction request(method, uri, sendData = null, callback = requestCallback) {\n  var o = getRequestObject();\n  var async = callback !== null;\n  var timestamp = new Date();\n  var uniqueURI = uri + (uri.indexOf(\"?\") > 0 ? \"&\" : \"?\") + \"timestamp=\" + timestamp.getTime();\n\n  if (method === 'GET') {\n    if (sendData != null) {\n      uniqueURI += \"?\" + sendData;\n    }\n\n    o.open(method, uniqueURI, async);\n    o.send(null);\n  } else if (method === 'POST') {\n    o.open(method, uniqueURI, async);\n    o.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\n    o.send(sendData);\n  }\n\n  if (async) {\n    o.onreadystatechange = function () {\n      if (o.readyState == 4 && o.status == 200) {\n        callback(o.responseText); // console.log(\"Request is successful\");\n\n        console.log(\"Réponse : \" + o.responseText);\n      } else if (o.readyState == 4 && o.status != 200) {\n        console.log(\"There was an error during this request for \" + uri);\n      }\n    };\n  }\n\n  if (async) {\n    return;\n  } else {\n    return o.responseText;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/request.js?");

/***/ }),

/***/ "./src/js/scaleMap.js":
/*!****************************!*\
  !*** ./src/js/scaleMap.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scaleMap; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/scale */ \"./src/js/utils/scale.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_scale__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _displayPosts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayPosts */ \"./src/js/displayPosts.js\");\n/* harmony import */ var _displayZones__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./displayZones */ \"./src/js/displayZones.js\");\n\n\n\n\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"](); /////////////////////////////////////////////////////\n// Fonction qui gère l'affichage lors des zooms\n/////////////////////////////////////////////////////\n\nfunction scaleMap() {\n  var t = d3.event.translate;\n  var s = d3.event.scale;\n  _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].translate(t).scale(s);\n  st.scaleFac = s; // on actualise le facteur d'échelle\n  // transforme les pays\n\n  d3.select(\"svg\").selectAll(\"path\").attr(\"d\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"pathProjection\"]);\n  Object(_displayPosts__WEBPACK_IMPORTED_MODULE_2__[\"updatePosts\"])();\n  Object(_displayZones__WEBPACK_IMPORTED_MODULE_3__[\"updateZones\"])();\n  d3.select(\"svg\").selectAll(\".creation-spot\").attr(\"transform\", function () {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d3.select(this).attr(\"latitude\"), d3.select(this).attr(\"longitude\")]) + \")\";\n  });\n}\n\n//# sourceURL=webpack:///./src/js/scaleMap.js?");

/***/ }),

/***/ "./src/js/utils/copyTextToClipboard.js":
/*!*********************************************!*\
  !*** ./src/js/utils/copyTextToClipboard.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return copyTextToClipboard; });\nfunction fallbackCopyTextToClipboard(text) {\n  var textArea = document.createElement(\"textarea\");\n  textArea.value = text;\n  document.body.appendChild(textArea);\n  textArea.focus();\n  textArea.select();\n\n  try {\n    var successful = document.execCommand('copy');\n    var msg = successful ? 'successful' : 'unsuccessful';\n    console.log('Fallback: Copying text command was ' + msg);\n  } catch (err) {\n    console.error('Fallback: Oops, unable to copy', err);\n  }\n\n  document.body.removeChild(textArea);\n}\n\nfunction copyTextToClipboard(text) {\n  if (!navigator.clipboard) {\n    fallbackCopyTextToClipboard(text);\n    return;\n  }\n\n  navigator.clipboard.writeText(text).then(function () {\n    console.log('Async: Copying to clipboard was successful!');\n  }, function (err) {\n    console.error('Async: Could not copy text: ', err);\n  });\n}\n\n//# sourceURL=webpack:///./src/js/utils/copyTextToClipboard.js?");

/***/ }),

/***/ "./src/js/utils/scale.js":
/*!*******************************!*\
  !*** ./src/js/utils/scale.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import * as globals from \"./globals\";\n// this is the map() function from processing\n// export default function scale(num, in_min, in_max, out_min, out_max){\n//     return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n// }\nfunction scale(num, in_min, in_max, out_min, out_max) {\n  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\nmodule.exports = scale;\n\n//# sourceURL=webpack:///./src/js/utils/scale.js?");

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/sass/main.scss?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./src/js/app.js ./src/sass/main.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/app.js */\"./src/js/app.js\");\nmodule.exports = __webpack_require__(/*! ./src/sass/main.scss */\"./src/sass/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js_./src/sass/main.scss?");

/***/ })

/******/ });