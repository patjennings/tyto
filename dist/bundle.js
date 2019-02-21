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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/js/addContent.js":
/*!*********************************!*\
  !*** ./client/js/addContent.js ***!
  \*********************************/
/*! exports provided: simplemde, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"simplemde\", function() { return simplemde; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addContent; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./client/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./client/js/app.js\");\n/* harmony import */ var _components_UIinput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UIinput */ \"./client/js/components/UIinput.js\");\n/* harmony import */ var _listenersSave__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listenersSave */ \"./client/js/listenersSave.js\");\n/* harmony import */ var _components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UISpotCreation */ \"./client/js/components/UISpotCreation.js\");\n\n\n\n\n\n\n\nlet isCreating = null;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar simplemde;\nfunction addContent(currentPosition) {\n  var long = currentPosition[1];\n  var lat = currentPosition[0];\n  st.isCreating = true;\n  Object(_components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"#4980ef\", lat, long); // marquer l'endroit où la zone est créée\n  // create layer w/ input + save button\n\n  var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([lat, long]);\n  var elements = Object(_components_UIinput__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"content\", proj, long, lat);\n  $(\".map\").append(elements);\n  startMarkdownEditor();\n  Object(_listenersSave__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"content\");\n}\n\nfunction startMarkdownEditor() {\n  simplemde = new SimpleMDE({\n    element: document.getElementById(\"content-content\")\n  });\n}\n\n//# sourceURL=webpack:///./client/js/addContent.js?");

/***/ }),

/***/ "./client/js/addZone.js":
/*!******************************!*\
  !*** ./client/js/addZone.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addZone; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./client/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./client/js/app.js\");\n/* harmony import */ var _components_UIinput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UIinput */ \"./client/js/components/UIinput.js\");\n/* harmony import */ var _listenersSave__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listenersSave */ \"./client/js/listenersSave.js\");\n/* harmony import */ var _components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UISpotCreation */ \"./client/js/components/UISpotCreation.js\");\n\n\n\n\n\n\n\nlet isCreating = null;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"](); // var simplemde;\n\nfunction addZone(currentPosition) {\n  var long = currentPosition[1];\n  var lat = currentPosition[0];\n  st.isCreating = true;\n  Object(_components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"#ba1021\", lat, long); // marquer l'endroit où la zone est créée\n  // create layer w/ input + save button\n\n  var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([lat, long]);\n  var elements = Object(_components_UIinput__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"zone\", proj, long, lat);\n  $(\".map\").append(elements);\n  Object(_listenersSave__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"zone\");\n}\n\n//# sourceURL=webpack:///./client/js/addZone.js?");

/***/ }),

/***/ "./client/js/app.js":
/*!**************************!*\
  !*** ./client/js/app.js ***!
  \**************************/
/*! exports provided: default, writeAppData, writeZonesData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return app; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeAppData\", function() { return writeAppData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeZonesData\", function() { return writeZonesData; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _addContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addContent */ \"./client/js/addContent.js\");\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zoom */ \"./client/js/zoom.js\");\n/* harmony import */ var _utils_copyTextToClipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/copyTextToClipboard */ \"./client/js/utils/copyTextToClipboard.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/scale */ \"./client/js/utils/scale.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./draw */ \"./client/js/draw.js\");\n/* harmony import */ var _createArticles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createArticles */ \"./client/js/createArticles.js\");\n/* harmony import */ var _createZones__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createZones */ \"./client/js/createZones.js\");\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./listeners */ \"./client/js/listeners.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./request */ \"./client/js/request.js\");\n\n\n\n\n\n\n\n\n\n\n\nlet content = null;\n\n(function (window) {\n  // qd c'est prêt, on commence\n  app();\n})(window);\n\nfunction app() {\n  requestAppData();\n}\n\nfunction requestAppData() {\n  // on télécharge les données\n  var appData = Object(_request__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(\"GET\", \"list-content.php\", null, writeAppData);\n}\n\nfunction writeAppData(data) {\n  // on relance app(), et on recharge tout\n  var st = new _globals__WEBPACK_IMPORTED_MODULE_10__[\"default\"]();\n  st.appData = JSON.parse(data);\n  var zonesData = Object(_request__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(\"GET\", \"dist/zones.json\", null, writeZonesData);\n}\nfunction writeZonesData(data) {\n  // on relance app(), et on recharge tout\n  var st = new _globals__WEBPACK_IMPORTED_MODULE_10__[\"default\"]();\n  st.zonesData = JSON.parse(data);\n  launcher();\n}\n\nfunction launcher() {\n  var st = new _globals__WEBPACK_IMPORTED_MODULE_10__[\"default\"]();\n  st.isCreating = false;\n  st.isDragging = false;\n  if (st.scaleFac == null) st.scaleFac = 40000.503614997007;\n  if (st.currentPosition == null) st.currentPosition = [0, 0];\n  let svg = d3.select(\"svg\");\n\n  if (svg) {\n    d3.select(\"svg\").remove(); // on réinitialise tout\n\n    d3.select(\"body\").append(\"svg\").attr(\"width\", _globals__WEBPACK_IMPORTED_MODULE_10__[\"width\"]).attr(\"height\", _globals__WEBPACK_IMPORTED_MODULE_10__[\"height\"]);\n  }\n\n  d3.select(\"svg\").append(\"g\").append(\"rect\").attr(\"class\", \"background\").attr(\"width\", _globals__WEBPACK_IMPORTED_MODULE_10__[\"width\"]).attr(\"height\", _globals__WEBPACK_IMPORTED_MODULE_10__[\"height\"]); // console.log(st.zonesData);\n  // function displayInformations(zoom){\n  // \tinfos = document.getElementById(\"position\");\n  // \tinfos.value = globals.currentPosition[1].toFixed(4)+\", \"+globals.currentPosition[0].toFixed(4);\n  // }\n  //////////////////////\n  // Afficher la carte\n  ////////////////////////\n\n  d3.json(_globals__WEBPACK_IMPORTED_MODULE_10__[\"mapPath\"], function (error, json) {\n    // if (error) throw error;\n    d3.select(\"svg\").append(\"g\").attr(\"id\", \"states\").selectAll(\"path\").data(json.features).enter().append(\"path\").attr(\"d\", _globals__WEBPACK_IMPORTED_MODULE_10__[\"path\"]).attr(\"id\", function (d, i) {\n      return i;\n    }).style(\"stroke\", \"#999999\").style(\"fill\", \"rgba(255,255,255,0.5)\"); // .on(\"click\", clicked);\n    // On lance les fonctions une fois que la carte est chargée et affichée\n    // if(st.firstStart == true){ // si c'est le premier démarrage\n\n    Object(_createArticles__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(); // création des articles\n\n    Object(_createZones__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(); // création des titres de zones\n\n    Object(_listeners__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(); // }\n    // st.firstStart = false;\n    // createPoints(); // affiche les points et permet de vérifier le centrage des cartes.\n  });\n}\n\n//# sourceURL=webpack:///./client/js/app.js?");

/***/ }),

/***/ "./client/js/components/UISpotCreation.js":
/*!************************************************!*\
  !*** ./client/js/components/UISpotCreation.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UISpotCreation; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./client/js/globals.js\");\n\nfunction UISpotCreation(color, latitude, longitude) {\n  // point où la zone sera créée\n  d3.select(\"svg\").append(\"g\").attr(\"longitude\", longitude).attr(\"latitude\", latitude).attr(\"class\", \"creation-spot\").attr(\"transform\", function () {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([latitude, longitude]);\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  });\n  d3.select(\".creation-spot\").append(\"circle\").attr(\"cx\", 0).attr(\"cy\", 0).attr(\"r\", 4).attr(\"fill\", color);\n  d3.select(\".creation-spot\").append(\"circle\").attr(\"r\", 24).attr(\"fill\", color).attr(\"opacity\", 0.2);\n}\n\n//# sourceURL=webpack:///./client/js/components/UISpotCreation.js?");

/***/ }),

/***/ "./client/js/components/UIinput.js":
/*!*****************************************!*\
  !*** ./client/js/components/UIinput.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UIinput; });\n// import * as globals from \"./globals\";\n// import appState from \"./globals\";\n// import request from './request';\n// import app from './app';\nfunction UIinput(type, proj, articleLat, articleLong) {\n  var e;\n\n  if (type == \"content\") {\n    // e = \"<div id='input-container' style='transform: translate(\"+proj[0]+\"px, \"+proj[1]+\"px);'>\";\n    e = \"<div id='input-container'>\";\n    e += \"<input id='content-title' placeholder='Titre'></input>\";\n    e += \"<textarea id='content-content' rows='18' placeholder='Contenu de cet article'></textarea>\";\n    e += \"<input id='content-position-long' type='hidden' value='\" + articleLong + \"'/>\";\n    e += \"<input id='content-position-lat' type='hidden' value='\" + articleLat + \"'/>\";\n    e += \"<div class='btn-container'>\";\n    e += \"<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>\";\n    e += \"<button value='cancel' class='btn' id='document-cancel'>Annuler</button>\";\n    e += \"</div>\";\n    e += \"</div>\";\n  } else if (type == \"zone\") {\n    // e = \"<div id='input-container' style='transform: translate(\"+proj[0]+\"px, \"+proj[1]+\"px);'>\";\n    e = \"<div id='input-container'>\";\n    e += \"<input id='content-title' placeholder='Titre'></input>\";\n    e += \"<input id='content-position-long' type='hidden' value='\" + articleLong + \"'/>\";\n    e += \"<input id='content-position-lat' type='hidden' value='\" + articleLat + \"'/>\";\n    e += \"<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>\";\n    e += \"<button value='cancel' class='btn' id='document-cancel'>Annuler</button>\";\n    e += \"</div>\";\n    e += \"</div>\";\n  }\n\n  return e;\n}\n\n//# sourceURL=webpack:///./client/js/components/UIinput.js?");

/***/ }),

/***/ "./client/js/createArticles.js":
/*!*************************************!*\
  !*** ./client/js/createArticles.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createArticles; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw */ \"./client/js/draw.js\");\n\n\n /////////////////////////\n// Ajouter les articles\n//////////////////////////\n\nfunction createArticles() {\n  var st = new _globals__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  d3.select(\"svg\").append(\"g\").attr(\"id\", \"articles\").selectAll(\"g\").data(st.appData).enter().append(\"g\").attr(\"class\", \"card\");\n  d3.selectAll(\".card\").append(\"circle\").attr(\"cx\", 0).attr(\"cy\", 0).attr(\"r\", 4).attr(\"fill\", \"#000000\"); // w/o foreignobject\n\n  d3.select(\"svg\").selectAll(\".card\").attr(\"id\", function (d) {\n    return d.raw;\n  }).attr(\"transform\", function (d) {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_2__[\"projection\"]([d.location.longitude, d.location.latitude]); // La hauteur dynamique du contenant (.inner-card)\n    // var itemHeight = d3.select(\"svg\").selectAll(\".card\").node().getBoundingClientRect().height\n\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  }).append(\"text\") // .attr(\"font-weight\", \"700\")\n  .text(function (d) {\n    return d.title;\n  }); // console.log(\">>>>>>> \"+st.scaleFac);\n\n  Object(_draw__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n}\n\n//# sourceURL=webpack:///./client/js/createArticles.js?");

/***/ }),

/***/ "./client/js/createZones.js":
/*!**********************************!*\
  !*** ./client/js/createZones.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createZones; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n\n /////////////////////////\n// Ajouter les zones\n/////////////////////////\n\nfunction createZones() {\n  var st = new _globals__WEBPACK_IMPORTED_MODULE_1__[\"default\"](); // console.log(\"++++++++ \"+st.zonesData);\n\n  d3.select(\"svg\").append(\"g\").attr(\"id\", \"zones\").selectAll(\"text\").data(st.zonesData).enter().append(\"g\").attr(\"class\", \"zone\").append(\"text\").attr(\"font-family\", \"lato\").attr(\"font-size\", \"16px\").attr(\"text-anchor\", \"middle\").text(function (d) {\n    return d.title;\n  });\n  d3.select(\"svg\").selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  });\n} ///////\n\n//# sourceURL=webpack:///./client/js/createZones.js?");

/***/ }),

/***/ "./client/js/draw.js":
/*!***************************!*\
  !*** ./client/js/draw.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return draw; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/scale */ \"./client/js/utils/scale.js\");\n/* harmony import */ var _utils_textWrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/textWrap */ \"./client/js/utils/textWrap.js\");\n\n\n\n ///////////////////////////////////////////\n// affiche le contenu relatif au niveau de zooms\n//////////////////////////////////////////////////\n\nlet pFile = \"article.php\"; // le fichier php qui affiche les articles\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nfunction draw() {\n  // s is for scale\n  console.log(st.scaleFac); // adapter l'opacité au niveau de zoom\n  // d3.select(\"svg\").selectAll(\".card\")\n  // .attr(\"style\", \"opacity:\"+scale(s, 1070, 10000, 0.15, 1)+\";\")\n\n  if (st.scaleFac < 1300000) {\n    drawContentBox(\"sky\");\n  } else if (st.scaleFac >= 1300000 && st.scaleFac < 5000000) {\n    drawContentBox(\"top\");\n  } else if (st.scaleFac >= 5000000 && st.scaleFac < 26000000) {\n    drawContentBox(\"middle\");\n  }\n  /* else if(st.scaleFac >= 26000000){\n  drawContentBox(\"low\");\n   }*/\n\n}\n\nfunction drawContentBox(level, displayContentText) {\n  console.log(level);\n  d3.select(\"svg\").selectAll(\".card\").attr(\"class\", \"card \" + level).selectAll(\"text\").remove(); // titre\n\n  d3.select(\"svg\").selectAll(\".card\").append(\"text\").attr(\"font-family\", \"lato\").attr(\"font-size\", \"13px\").attr(\"fill\", \"#000\").attr(\"dx\", \"8\").attr(\"y\", \"16\").attr(\"font-weight\", \"700\").text(function (d) {\n    return d.title;\n  }); // lien\n\n  d3.select(\"svg\").selectAll(\".card\").append(\"svg:foreignObject\").attr(\"width\", 48).attr(\"height\", 20).attr(\"x\", 8).attr(\"y\", 20).attr(\"style\", \"font-size: 12px; font-family: lato; font-weight: 400;\") // .append(\"xhtml:body\")\n  // .attr(\"class\", \"link\")\n  .html(function (d) {\n    return \"<div class='link'><a href='article.php?path=\" + d.path + \"'>go></p>\";\n  }).append(\"div\"); // .attr(\"class\", \"content\")\n  // d3.select(\"svg\").selectAll(\".card\")\n  // \t.append(\"text\")\n  // \t.attr(\"class\", \"link\")\n  // \t.text(\"go >\")\n  // \t.attr(\"href\", function(d) { return d.path; })\n  // \t.attr(\"font-family\", \"lato\")\n  // \t.attr(\"font-size\", \"13px\")\n  // \t.attr(\"fill\", \"#00F\")\n  // \t.attr(\"x\", \"8\")\n  // \t.attr(\"dy\", \"34px\")\n  // contenu\n\n  if (level !== \"sky\") {\n    d3.select(\"svg\").selectAll(\".card\").append(\"text\").text(function (d) {\n      if (level == \"top\") {\n        return d.content.top;\n      } else if (level == \"middle\") {\n        return d.content.middle;\n      } else if (level == \"low\") {\n        return d.content.low;\n      }\n    }).attr(\"font-family\", \"lato\").attr(\"font-size\", \"13px\").attr(\"fill\", \"#000\").attr(\"x\", \"8\").attr(\"dy\", \"32px\").call(_utils_textWrap__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _globals__WEBPACK_IMPORTED_MODULE_3__[\"cardsWidth\"]);\n  }\n}\n\n//# sourceURL=webpack:///./client/js/draw.js?");

/***/ }),

/***/ "./client/js/globals.js":
/*!******************************!*\
  !*** ./client/js/globals.js ***!
  \******************************/
/*! exports provided: default, mapPath, width, height, projection, path, cardsWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return appState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapPath\", function() { return mapPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"width\", function() { return width; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"height\", function() { return height; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projection\", function() { return projection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"path\", function() { return path; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cardsWidth\", function() { return cardsWidth; });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./client/js/zoom.js\");\n // toutes ces variables sont modifiées dans init.js, via l'objet appState()\n\nlet isCreating = null; // on est en train de créer un article // false\n\nlet isDragging = null; // false\n\nlet scaleFac = null; // doit être modifié //40000.503614997007\n\nlet currentPosition = null; // doit être modifié //[0, 0]\n\nlet appData = null; // doit être modifié avec le nouveau contenu chargé du json\n\nlet zonesData = null;\nlet firstStart = true; // cette fonction contient modifie les états de l'application, avec des getters et des setters\n// pour pouvoir vivre tout au long du déroulement\n// s'applique sur les trois variables déclarées au dessus\n\nfunction appState() {\n  // var archive = [];\n  Object.defineProperty(this, 'isCreating', {\n    get: function () {\n      return isCreating;\n    },\n    set: function (value) {\n      isCreating = value;\n    }\n  });\n  Object.defineProperty(this, 'isDragging', {\n    get: function () {\n      return isDragging;\n    },\n    set: function (value) {\n      isDragging = value;\n    }\n  });\n  Object.defineProperty(this, 'scaleFac', {\n    get: function () {\n      return scaleFac;\n    },\n    set: function (value) {\n      scaleFac = value;\n    }\n  });\n  Object.defineProperty(this, 'currentPosition', {\n    get: function () {\n      return currentPosition;\n    },\n    set: function (value) {\n      currentPosition = value;\n    }\n  });\n  Object.defineProperty(this, 'appData', {\n    get: function () {\n      return appData;\n    },\n    set: function (value) {\n      appData = value;\n    }\n  });\n  Object.defineProperty(this, 'zonesData', {\n    get: function () {\n      return zonesData;\n    },\n    set: function (value) {\n      zonesData = value;\n    }\n  });\n  Object.defineProperty(this, 'firstStart', {\n    get: function () {\n      return firstStart;\n    },\n    set: function (value) {\n      firstStart = value;\n    }\n  }); // this.getArchive = function() { return archive; };\n}\nvar st = new appState();\nvar mapPath = \"dist/assets/schinoussa.geojson\";\nvar width = screen.availWidth;\nvar height = screen.availHeight;\nvar projection = d3.geo.mercator().scale(485035.40798408084).translate([-214842.9723933363, 336774.3379795616]);\nvar path = d3.geo.path().projection(projection);\nvar cardsWidth = 340;\n\n//# sourceURL=webpack:///./client/js/globals.js?");

/***/ }),

/***/ "./client/js/listeners.js":
/*!********************************!*\
  !*** ./client/js/listeners.js ***!
  \********************************/
/*! exports provided: default, removeUIinput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return listeners; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeUIinput\", function() { return removeUIinput; });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./client/js/zoom.js\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _addContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addContent */ \"./client/js/addContent.js\");\n/* harmony import */ var _addZone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addZone */ \"./client/js/addZone.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request */ \"./client/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app */ \"./client/js/app.js\");\n\n\n\n\n\n\n\nlet ctrlPushed = false;\nlet altPushed = false;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar selectedNode = null;\nfunction listeners() {\n  // Ctrl key listener, pour utiliser avec le click lors de la création de documents\n  window.addEventListener('keydown', event => {\n    if (event.ctrlKey) {\n      ctrlPushed = true;\n      console.log(ctrlPushed);\n    }\n\n    if (event.altKey) {\n      altPushed = true;\n      console.log(altPushed);\n    }\n\n    if (event.keyCode == 27) {\n      console.log(\"esc called\");\n      removeUIinput();\n    }\n  }, false);\n  window.addEventListener('keyup', event => {\n    ctrlPushed = false;\n    altPushed = false;\n    console.log(ctrlPushed);\n  }, false);\n  d3.select(\"body\").select(\"svg\").on('mousemove', function () {\n    st.currentPosition = _globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].invert(d3.mouse(this));\n  }).on('click', function () {\n    st.currentPosition = _globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].invert(d3.mouse(this));\n\n    if (ctrlPushed == true && altPushed == false && st.isCreating == false) {\n      // si on peut créer un doc ET que la touche ctrl est enfoncée\n      console.log(\"here\"); // si trop bas ou trop à droite, transformation\n\n      Object(_addContent__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(st.currentPosition);\n    }\n\n    if (ctrlPushed == true && altPushed == true && st.isCreating == false) {\n      console.log(\"here\");\n      Object(_addZone__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(st.currentPosition);\n    }\n\n    return;\n  }); // on déclare le zoom\n\n  var zoom = d3.behavior.zoom().translate(_globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].translate()).scale(_globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].scale()) // .wheelDelta(wheelDelta)\n  .on(\"zoom\", _zoom__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); // puis on l'appelle\n\n  d3.select(\"svg\").call(zoom);\n  d3.select(\"svg\").selectAll(\".card\").call(dragListener);\n}\n\nfunction control() {\n  console.log(\"click listener ok\");\n}\n\nvar dragListener = d3.behavior.drag().on(\"dragstart\", function (d) {\n  st.draggingNode = true;\n  d3.event.sourceEvent.stopPropagation(); // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');\n}).on(\"drag\", function (d) {\n  // console.log(d);\n  var card = d3.select(this);\n  card.attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_1__[\"projection\"](st.currentPosition) + \")\";\n  });\n}).on(\"dragend\", function (d) {\n  var card = d3.select(this);\n  var titleRaw = card.attr(\"id\"); // console.log();\n  // et là, on modifie la position dans le fichier lié à l'item draggé/droppé\n\n  Object(_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"POST\", \"includes/UpdateMarkdownDocument.php\", \"titleraw=\" + titleRaw + \"&newlongitude=\" + st.currentPosition[0] + \"&newlatitude=\" + st.currentPosition[1], _app__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n});\n\nfunction endDrag() {\n  selectedNode = null;\n\n  if (st.draggingNode !== null) {\n    st.draggingNode = null;\n  }\n}\n\nfunction wheelDelta() {\n  return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 1500;\n}\n\nfunction removeUIinput() {\n  console.log(\"stop la création\");\n  var box = document.getElementById(\"input-container\");\n  box.parentNode.removeChild(box);\n  d3.select(\"svg\").selectAll(\".creation-spot\").remove();\n  st.isCreating = false;\n  return;\n}\n\n//# sourceURL=webpack:///./client/js/listeners.js?");

/***/ }),

/***/ "./client/js/listenersSave.js":
/*!************************************!*\
  !*** ./client/js/listenersSave.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return listenersSave; });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./client/js/zoom.js\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _addContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addContent */ \"./client/js/addContent.js\");\n/* harmony import */ var _addZone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addZone */ \"./client/js/addZone.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request */ \"./client/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app */ \"./client/js/app.js\");\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./listeners */ \"./client/js/listeners.js\");\n\n\n\n\n\n\n\n\n\nlet ctrlPushed = false;\nlet altPushed = false;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar selectedNode = null;\nfunction listenersSave(target) {\n  var btnValidate = document.getElementById(\"document-validate\");\n  var btnCancel = document.getElementById(\"document-cancel\");\n  btnValidate.addEventListener('click', function () {\n    console.log(\"save file\");\n    var titleValue = document.getElementById(\"content-title\").value;\n    var longValue = document.getElementById(\"content-position-long\").value;\n    var latValue = document.getElementById(\"content-position-lat\").value;\n\n    if (target == \"content\") {\n      // si c'est un article\n      var contentValue = _addContent__WEBPACK_IMPORTED_MODULE_2__[\"simplemde\"].value();\n      var contentFormatted = \"title: \" + titleValue + \"\\nposition: \" + latValue + \", \" + longValue + \"\\n\\n---\\n\" + contentValue; // le title intégré dans la desc du markdown\n\n      Object(_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"POST\", \"includes/SaveMarkdownDocument.php\", \"title=\" + titleValue + \"&content=\" + contentFormatted, _app__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    }\n\n    if (target == \"zone\") {\n      var longValue = document.getElementById(\"content-position-long\").value;\n      var latValue = document.getElementById(\"content-position-lat\").value;\n      Object(_request__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"POST\", \"includes/SaveZone.php\", \"title=\" + titleValue + \"&latitude=\" + latValue + \"&longitude=\" + longValue, _app__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    }\n\n    Object(_listeners__WEBPACK_IMPORTED_MODULE_6__[\"removeUIinput\"])();\n  }, false);\n  btnCancel.addEventListener('click', function () {\n    Object(_listeners__WEBPACK_IMPORTED_MODULE_6__[\"removeUIinput\"])();\n  }, false);\n}\n\n//# sourceURL=webpack:///./client/js/listenersSave.js?");

/***/ }),

/***/ "./client/js/request.js":
/*!******************************!*\
  !*** ./client/js/request.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return request; });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./client/js/app.js\");\n\n // AJAX requests\n\nfunction getRequestObject() {\n  var o = null;\n\n  if (window.XMLHttpRequest) {\n    o = new XMLHttpRequest();\n  } else if (window.ActiveXObject) {\n    try {\n      o = new ActiveXObject('Msxml2.XMLHTTP');\n    } catch (e1) {\n      try {\n        o = new ActiveXObject('Microsoft.XMLHTTP');\n      } catch (e2) {}\n    }\n  }\n\n  return o;\n}\n\nfunction request(method, uri, sendData = null, callback = requestCallback) {\n  var o = getRequestObject();\n  var async = callback !== null;\n  var timestamp = new Date();\n  var uniqueURI = uri + (uri.indexOf(\"?\") > 0 ? \"&\" : \"?\") + \"timestamp=\" + timestamp.getTime(); // console.log(uri);\n\n  if (method === 'GET') {\n    if (sendData != null) {\n      uniqueURI += \"?\" + sendData;\n    }\n\n    o.open(method, uniqueURI, async);\n    o.send(null);\n  } else if (method === 'POST') {\n    o.open(method, uniqueURI, async);\n    o.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\n    o.send(sendData);\n  }\n\n  if (async) {\n    o.onreadystatechange = function () {\n      if (o.readyState == 4 && o.status == 200) {\n        callback(o.responseText);\n        console.log(\"request is successful\");\n        console.log(o.responseText); // console.log(callback);\n        // return o.responseText;\n      } else if (o.readyState == 4 && o.status != 200) {\n        console.log(\"There was an error during this request\");\n      }\n    };\n  }\n\n  if (async) {\n    return;\n  } else {\n    return o.responseText;\n  }\n}\n\n//# sourceURL=webpack:///./client/js/request.js?");

/***/ }),

/***/ "./client/js/utils/copyTextToClipboard.js":
/*!************************************************!*\
  !*** ./client/js/utils/copyTextToClipboard.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return copyTextToClipboard; });\nfunction fallbackCopyTextToClipboard(text) {\n  var textArea = document.createElement(\"textarea\");\n  textArea.value = text;\n  document.body.appendChild(textArea);\n  textArea.focus();\n  textArea.select();\n\n  try {\n    var successful = document.execCommand('copy');\n    var msg = successful ? 'successful' : 'unsuccessful';\n    console.log('Fallback: Copying text command was ' + msg);\n  } catch (err) {\n    console.error('Fallback: Oops, unable to copy', err);\n  }\n\n  document.body.removeChild(textArea);\n}\n\nfunction copyTextToClipboard(text) {\n  if (!navigator.clipboard) {\n    fallbackCopyTextToClipboard(text);\n    return;\n  }\n\n  navigator.clipboard.writeText(text).then(function () {\n    console.log('Async: Copying to clipboard was successful!');\n  }, function (err) {\n    console.error('Async: Could not copy text: ', err);\n  });\n}\n\n//# sourceURL=webpack:///./client/js/utils/copyTextToClipboard.js?");

/***/ }),

/***/ "./client/js/utils/scale.js":
/*!**********************************!*\
  !*** ./client/js/utils/scale.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scale; });\n// import * as globals from \"./globals\";\n// this is the map() function from processing\nfunction scale(num, in_min, in_max, out_min, out_max) {\n  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\n//# sourceURL=webpack:///./client/js/utils/scale.js?");

/***/ }),

/***/ "./client/js/utils/textWrap.js":
/*!*************************************!*\
  !*** ./client/js/utils/textWrap.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return textWrap; });\n// permet de couper les lignes à une longueur définie\nfunction textWrap(text, width) {\n  text.each(function () {\n    var text = d3.select(this),\n        words = text.text().split(/\\s+/).reverse(),\n        word,\n        line = [],\n        lineNumber = 0,\n        lineHeight = 20,\n        // px\n    y = text.attr(\"y\"),\n        x = text.attr(\"x\"),\n        // x = 8,\n    dy = parseFloat(text.attr(\"dy\")),\n        tspan = text.text(null).append(\"tspan\").attr(\"x\", x).attr(\"y\", y).attr(\"dy\", dy + lineHeight + \"px\");\n\n    while (word = words.pop()) {\n      line.push(word);\n      tspan.text(line.join(\" \"));\n\n      if (tspan.node().getComputedTextLength() > width) {\n        line.pop();\n        tspan.text(line.join(\" \"));\n        line = [word];\n        tspan = text.append(\"tspan\").attr(\"x\", x).attr(\"y\", y).attr(\"dy\", lineHeight + \"px\").text(word);\n      }\n    }\n  });\n}\n\n//# sourceURL=webpack:///./client/js/utils/textWrap.js?");

/***/ }),

/***/ "./client/js/zoom.js":
/*!***************************!*\
  !*** ./client/js/zoom.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return zoomed; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./globals */ \"./client/js/globals.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/scale */ \"./client/js/utils/scale.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draw */ \"./client/js/draw.js\");\n\n\n\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_3__[\"default\"](); /////////////////////////////////////////////////////\n// Fonction qui gère l'affichage lors des zooms\n/////////////////////////////////////////////////////\n\nfunction zoomed() {\n  // console.log(\"zoom\");\n  var t = d3.event.translate;\n  var s = d3.event.scale;\n  _globals__WEBPACK_IMPORTED_MODULE_3__[\"projection\"].translate(t).scale(s); // transforme les pays\n\n  d3.select(\"svg\").selectAll(\"path\").attr(\"d\", _globals__WEBPACK_IMPORTED_MODULE_3__[\"path\"]); // transforme les points au zoom et translate\n\n  d3.select(\"svg\").selectAll(\".card\").attr(\"transform\", function (d) {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_3__[\"projection\"]([d.location.longitude, d.location.latitude]); // La hauteur dynamique du contenant (.inner-card)\n    // var rectHeight = d3.select(\"svg\").selectAll(\".card\").node().getBoundingClientRect().height\n    // console.log(\"translate(\" + (proj[0]-(globals.cardsWidth/2)) +\", \"+(proj[1]-(rectHeight/2))+ \")\");\n\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  });\n  d3.select(\"svg\").selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_3__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  }).selectAll(\"text\"); // .attr(\"font-size\", scale(s, 50000, 1536308, 12, 24)+\"px\"); // la taille des zones s'adapte au zoom\n  // d3.select(\"svg\").selectAll(\".point\").attr(\"transform\", function(d) {\n  // \treturn \"translate(\" + globals.projection([\n  // \t    d.location.longitude,\n  // \t    d.location.latitude\n  // \t]) + \")\";\n  // })\n\n  d3.select(\"svg\").selectAll(\".creation-spot\").attr(\"transform\", function () {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_3__[\"projection\"]([d3.select(this).attr(\"latitude\"), d3.select(this).attr(\"longitude\")]) + \")\";\n  });\n  st.scaleFac = s; // console.log(st.scaleFac);\n\n  Object(_draw__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(st.scaleFac);\n}\n\n//# sourceURL=webpack:///./client/js/zoom.js?");

/***/ })

/******/ });