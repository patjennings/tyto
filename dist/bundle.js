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

/***/ "./src/js/addArticle.js":
/*!******************************!*\
  !*** ./src/js/addArticle.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addPost; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _components_UIArticleNew__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UIArticleNew */ \"./src/js/components/UIArticleNew.js\");\n/* harmony import */ var _listeners_articlePost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners/articlePost */ \"./src/js/listeners/articlePost.js\");\n/* harmony import */ var _components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UISpotCreation */ \"./src/js/components/UISpotCreation.js\");\n\n\n\n // import UIinput from './components/UIinput';\n\n\n\n\nlet isCreating = null;\nlet st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet styleSwitcher = false; // export var simplemde;\n\nfunction addPost(currentPosition) {\n  let long = currentPosition[1];\n  let lat = currentPosition[0];\n  st.isCreating = true;\n  Object(_components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"#4980ef\", lat, long); // marquer l'endroit où la zone est créée\n  // create layer w/ input + save button\n\n  let proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([lat, long]);\n  let elements = Object(_components_UIArticleNew__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"content\", proj, long, lat);\n  Object(_listeners_articlePost__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n  richEditor();\n} // launch l'éditeur riche\n\nfunction richEditor() {\n  let textArea = document.getElementById(\"content-content\");\n  let wrapper = textArea.parentNode;\n  rteeditor.focus();\n  rteeditor.addEventListener('mouseup', function () {\n    let e = window.event;\n    let posX = e.clientX;\n    let posY = e.clientY;\n    st.isStyling = true;\n    console.log(styleSwitcher);\n\n    if (styleSwitcher == false) {\n      displayStyleInput(wrapper, rteeditor, posX, posY);\n      styleSwitcher = true;\n    } else {\n      hideStyleInput();\n      styleSwitcher = false;\n    }\n  });\n} // \n\n\nfunction displayStyleInput(wrapper, editor, x, y) {\n  const styleEditor = document.getElementById(\"style-editor\");\n\n  if (styleEditor !== null) {\n    styleEditor.remove();\n  }\n\n  const newStyleEditor = \"<div id='style-editor' style='position: absolute; left:\" + x + \"px; top:\" + y + \"px'><input id='style-editor--input'></input></div>\";\n  wrapper.insertAdjacentHTML(\"afterbegin\", newStyleEditor); // select element\n\n  const nse = document.getElementById(\"style-editor--input\");\n  nse.focus();\n  window.addEventListener('keydown', event => {\n    if (event.keyCode == 13) {\n      if (nse.value == \"/big\") {\n        editor.document.execCommand(\"heading\", false, \"<h1>\");\n      }\n\n      if (nse.value == \"/medium\") {\n        editor.document.execCommand(\"heading\", false, \"<h2>\");\n      }\n\n      if (nse.value == \"/small\") {\n        editor.document.execCommand(\"heading\", false, \"<h3>\");\n      }\n\n      hideStyleInput(); // editor.focus();\n      // console.log(editor.document.body.innerHTML);\n    }\n  }, false); // hit enter, apply style with execcommand\n}\n\nfunction hideStyleInput() {\n  const nse = document.getElementById(\"style-editor--input\");\n  nse ? nse.remove() : null;\n} // function getSel() // javascript\n// {\n//     // obtain the object reference for the <textarea>\n//     let txtarea = document.getElementById(\"mytextarea\");\n//     // obtain the index of the first selected character\n//     let start = txtarea.selectionStart;\n//     // obtain the index of the last selected character\n//     let finish = txtarea.selectionEnd;\n//     // obtain the selected text\n//     let sel = txtarea.value.substring(start, finish);\n//     // do something with the selected content\n// }\n// function startMarkdownEditor(){\n//     simplemde = new SimpleMDE({ \n//         element: document.getElementById(\"content-content\") \n//     });\n// }\n\n//# sourceURL=webpack:///./src/js/addArticle.js?");

/***/ }),

/***/ "./src/js/addZone.js":
/*!***************************!*\
  !*** ./src/js/addZone.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addZone; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _components_UIZoneNew__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UIZoneNew */ \"./src/js/components/UIZoneNew.js\");\n/* harmony import */ var _listeners_zonePost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners/zonePost */ \"./src/js/listeners/zonePost.js\");\n/* harmony import */ var _components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UISpotCreation */ \"./src/js/components/UISpotCreation.js\");\n\n\n\n // import UIinput from './components/UIinput';\n\n\n\n\nlet isCreating = null;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction addZone(currentPosition) {\n  var long = currentPosition[1];\n  var lat = currentPosition[0];\n  st.isCreating = true;\n  Object(_components_UISpotCreation__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"#ba1021\", lat, long); // marquer l'endroit où la zone est créée\n  // create layer w/ input + save button\n\n  var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([lat, long]);\n  var elements = Object(_components_UIZoneNew__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"zone\", proj, long, lat);\n  Object(_listeners_zonePost__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"zone\");\n}\n\n//# sourceURL=webpack:///./src/js/addZone.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! exports provided: default, setActiveSpace, reset, requestPosts, requestZones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return app; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setActiveSpace\", function() { return setActiveSpace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reset\", function() { return reset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestPosts\", function() { return requestPosts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestZones\", function() { return requestZones; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _addArticle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addArticle */ \"./src/js/addArticle.js\");\n/* harmony import */ var _utils_copyTextToClipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/copyTextToClipboard */ \"./src/js/utils/copyTextToClipboard.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/scale */ \"./src/js/utils/scale.js\");\n/* harmony import */ var _utils_scale__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_scale__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _displayArticles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./displayArticles */ \"./src/js/displayArticles.js\");\n/* harmony import */ var _displayZones__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./displayZones */ \"./src/js/displayZones.js\");\n/* harmony import */ var _listeners_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./listeners/actions */ \"./src/js/listeners/actions.js\");\n/* harmony import */ var _listeners_mapActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listeners/mapActions */ \"./src/js/listeners/mapActions.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./request */ \"./src/js/request.js\");\n/* harmony import */ var _utils_loginManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/loginManager */ \"./src/js/utils/loginManager.js\");\n/* harmony import */ var _conf_conf__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./conf/conf */ \"./src/js/conf/conf.js\");\n\n\n\n\n\n\n // import listeners, {d3Listen} from './listeners';\n\n\n\n\n\n\nlet content = null;\nlet st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n(function (window) {\n  app();\n})(window);\n\nasync function app() {\n  // console.log(\"start app\");\n  // remove tout si ça existe\n  configure();\n  st.user = \"thomas\";\n  getSpaces();\n}\n\nasync function getSpaces() {\n  let getSpaces = await Object(_request__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(\"GET\", _conf_conf__WEBPACK_IMPORTED_MODULE_10__[\"paths\"].apiUrl + \"/spaces\", null, function (data) {\n    const dataParse = JSON.parse(data);\n    st.spacesData = dataParse.message;\n    setActiveSpace(0);\n    displayNav(); // afficher la nav\n  });\n}\n\nfunction setActiveSpace(index) {\n  st.spaceIndex = index; // set l'index du space dans l'objet des spaces\n  // set default space + map\n\n  st.space = st.spacesData[index]._id;\n  st.mapData = _conf_conf__WEBPACK_IMPORTED_MODULE_10__[\"paths\"].mapsDir + \"/\" + st.spacesData[index].map; // une fois le space renseigné, on charge :\n  // - la map\n  // - la nav\n  // - on lance les listeners\n\n  displayMap(st.mapData, _globals__WEBPACK_IMPORTED_MODULE_0__[\"pathProjection\"]); // Afficher la carte\n  // listeners(); // on active les écouteurs\n}\nfunction reset() {\n  configure();\n  displayMap(st.mapData, _globals__WEBPACK_IMPORTED_MODULE_0__[\"pathProjection\"]); // Afficher la carte\n\n  displayNav();\n} // function clean(){\n//     // on cleane tout pour redessiner l'ensemble\n//     const svg = document.getElementsByTagName(\"svg\")[0];\n//     if(svg){\n// \tif(svg.parentNode){\n// \t    svg.parentNode.removeChild(svg);\n// \t}\n//     }\n// }\n\nfunction configure() {\n  st.isCreating = false;\n  st.isDragging = false;\n  if (st.scaleFac == null) st.scaleFac = 40000.503614997007;\n  if (st.currentPosition == null) st.currentPosition = [0, 0];\n  let svg = d3.select(\"svg\");\n\n  if (svg) {\n    d3.select(\"svg\").remove(); // on réinitialise tout\n\n    d3.select(\"body\").append(\"svg\").attr(\"width\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"width\"]).attr(\"height\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"height\"]);\n  }\n\n  d3.select(\"svg\").append(\"g\").append(\"rect\").attr(\"class\", \"background\").attr(\"width\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"width\"]).attr(\"height\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"height\"]);\n}\n\nfunction displayMap(mapdata, mapProjection) {\n  // console.log(mapdata);\n  d3.json(mapdata, function (error, json) {\n    if (error) throw error;\n    d3.select(\"svg\").append(\"g\").attr(\"id\", \"states\").selectAll(\"path\").data(json.features).enter().append(\"path\").attr(\"d\", mapProjection).attr(\"id\", function (d, i) {\n      return i;\n    }).style(\"fill\", \"#555555\");\n    requestPosts(); // création des articles\n\n    requestZones(); // création des titres de zones\n  });\n}\n\nasync function displayNav() {\n  const wrapper = document.getElementById(\"root\");\n  let nav = wrapper.querySelector(\".nav\");\n\n  if (!nav) {\n    let requestNav = await Object(_request__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(\"GET\", _conf_conf__WEBPACK_IMPORTED_MODULE_10__[\"paths\"].apiUrl + \"/spaces\", null, function (data) {\n      // console.log(data);\n      wrapper.insertAdjacentHTML(\"afterbegin\", \"<div class='nav'></div>\");\n      nav = wrapper.querySelector(\".nav\");\n      let navList = JSON.parse(data); // on parse le json pour avoir un tableau\n\n      let output = \"<ul>\";\n      output += \"<h2>Spaces</h2>\";\n      navList.message.forEach(n => {\n        output += \"<li id='space-\" + n._id + \"' class='nav-item'>\" + n.title + \"</li>\";\n      });\n      output += \"</ul>\";\n      nav.innerHTML = output;\n      Object(_listeners_actions__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(); // on relance les écouteurs\n    });\n  }\n}\n\nfunction requestPosts() {\n  // on télécharge les données\n  var postsData = Object(_request__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(\"GET\", _conf_conf__WEBPACK_IMPORTED_MODULE_10__[\"paths\"].apiUrl + \"/\" + st.space + \"/content\", null, _displayArticles__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n}\nfunction requestZones() {\n  // console.log(\"request les zones\");\n  // on télécharge les données\n  var zonesData = Object(_request__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(\"GET\", _conf_conf__WEBPACK_IMPORTED_MODULE_10__[\"paths\"].apiUrl + \"/\" + st.space + \"/zones\", null, _displayZones__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/components/UIArticle.js":
/*!****************************************!*\
  !*** ./src/js/components/UIArticle.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UIArticle; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n/* harmony import */ var _listeners_articleActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../listeners/articleActions */ \"./src/js/listeners/articleActions.js\");\n/* harmony import */ var _listeners_articleUpdate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../listeners/articleUpdate */ \"./src/js/listeners/articleUpdate.js\");\n\n // import {ArticleListeners} from '../listeners';\n// import listenersUpdate from '../listenersUpdate';\n\n\n\nlet st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction UIArticle(data, edit = false) {\n  // console.log(data);\n  // st.selectedArticle = data._id;\n  const container = document.getElementById(\"root\");\n  const article = document.querySelector(\".article\");\n  const overlay = document.querySelector(\".overlay\");\n\n  if (article) {\n    container.removeChild(article);\n    container.removeChild(overlay);\n  }\n\n  let l = \"<div class='overlay'></div>\";\n  let e = \"<div class='article' id='\" + data.raw + \"'>\";\n  edit ? e += \"<input value='\" + data.title + \"' id='content-title'/>\" : e += \"<h1>\" + data.title + \"</h1>\";\n\n  if (st.user !== null && !edit) {\n    e += \"<button id='delete'>Delete article</button>\";\n    e += \"<button id='edit'>Edit article</button>\";\n  }\n\n  if (edit) {\n    e += \"<input value='\" + data.tags.join(\", \") + \"' id='content-tags'/>\";\n    e += \"<textarea id='content-edit' >\" + data.content + \"</textarea>\";\n    e += \"<button type='submit' value='ok' class='btn highlight' id='document-validate'>Mettre à jour</button>\";\n    e += \"<button value='cancel' class='btn' id='document-cancel'>Annuler</button>\";\n  } else {\n    // metadata\n    e += \"<div class='meta'>\";\n    e += \"<div class='infos'>Created on \" + data.created.date + \" by \" + data.created.user;\n\n    if (data.lastUpdated.date !== null) {\n      e += \" | <span class='edited'>Edited on \" + data.lastUpdated.date + \" by \" + data.lastUpdated.user + \"</span>\";\n    }\n\n    e += \"</div>\";\n    e += \"<div class='tags'>\" + data.tags.join(\", \") + \"</div>\";\n    e += \"<div class='position'>\" + data.location.latitude + \", \" + data.location.longitude + \"</div>\";\n    e += \"</div>\"; // content\n\n    e += \"<div class='content'>\" + data.content.full + \"</div>\";\n    e += \"</div>\";\n  }\n\n  container.insertAdjacentHTML(\"afterbegin\", l);\n  container.insertAdjacentHTML(\"afterbegin\", e);\n\n  if (edit) {\n    Object(_listeners_articleUpdate__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(data);\n  }\n\n  Object(_listeners_articleActions__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data);\n}\n\n//# sourceURL=webpack:///./src/js/components/UIArticle.js?");

/***/ }),

/***/ "./src/js/components/UIArticleNew.js":
/*!*******************************************!*\
  !*** ./src/js/components/UIArticleNew.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UIArticleNew; });\n// import * as globals from \"./globals\";\n// import appState from \"./globals\";\n// import request from './request';\n// import app from './app';\nfunction UIArticleNew(type, proj, articleLat, articleLong) {\n  const container = document.getElementById(\"root\");\n  let e; // e = \"<div id='input-container' style='transform: translate(\"+proj[0]+\"px, \"+proj[1]+\"px);'>\";\n\n  e = \"<div id='input-container'>\";\n  e += \"<input id='content-title' placeholder='Titre'></input>\";\n  e += \"<textarea id='content-content' name='content-content'></textarea>\";\n  e += \"<iframe name='rteeditor' id='rteeditor' onload='this.contentDocument.designMode=\\\"on\\\"'></iframe>\";\n  e += \"<input id='content-position-long' type='hidden' value='\" + articleLong + \"'/>\";\n  e += \"<input id='content-position-lat' type='hidden' value='\" + articleLat + \"'/>\";\n  e += \"<input id='content-tags' placeholder='tags'></input>\";\n  e += \"<div class='btn-container'>\";\n  e += \"<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>\";\n  e += \"<button value='cancel' class='btn' id='document-cancel'>Annuler</button>\";\n  e += \"</div>\";\n  e += \"</div>\";\n  container.insertAdjacentHTML(\"afterbegin\", e);\n}\n\n//# sourceURL=webpack:///./src/js/components/UIArticleNew.js?");

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

/***/ "./src/js/components/UIZoneNew.js":
/*!****************************************!*\
  !*** ./src/js/components/UIZoneNew.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UIZoneNew; });\n// import * as globals from \"./globals\";\n// import appState from \"./globals\";\n// import request from './request';\n// import app from './app';\nfunction UIZoneNew(type, proj, articleLat, articleLong) {\n  const container = document.getElementById(\"root\");\n  let e;\n  e = \"<div id='input-container' style='transform: translate(\" + proj[0] + \"px, \" + proj[1] + \"px);'>\";\n  e += \"<input id='content-title' placeholder='Titre'></input>\";\n  e += \"<input id='content-position-long' type='hidden' value='\" + articleLong + \"'/>\";\n  e += \"<input id='content-position-lat' type='hidden' value='\" + articleLat + \"'/>\";\n  e += \"<button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button>\";\n  e += \"<button value='cancel' class='btn' id='document-cancel'>Annuler</button>\";\n  e += \"</div>\";\n  e += \"</div>\";\n  container.insertAdjacentHTML(\"afterbegin\", e);\n}\n\n//# sourceURL=webpack:///./src/js/components/UIZoneNew.js?");

/***/ }),

/***/ "./src/js/components/removeUIInput.js":
/*!********************************************!*\
  !*** ./src/js/components/removeUIInput.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return removeUIInput; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction removeUIInput() {\n  // console.log(\"stop la création\");\n  var box = document.getElementById(\"input-container\");\n  box.parentNode.removeChild(box);\n  d3.select(\"svg\").selectAll(\".creation-spot\").remove();\n  st.isCreating = false;\n  return null;\n}\n\n//# sourceURL=webpack:///./src/js/components/removeUIInput.js?");

/***/ }),

/***/ "./src/js/conf/conf.js":
/*!*****************************!*\
  !*** ./src/js/conf/conf.js ***!
  \*****************************/
/*! exports provided: paths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"paths\", function() { return paths; });\nconst paths = {\n  \"appUrl\": \"http://localhost/tyto\",\n  \"apiUrl\": \"http://localhost:3000\",\n  \"mapsDir\": \"dist/assets/maps\"\n};\n\n//# sourceURL=webpack:///./src/js/conf/conf.js?");

/***/ }),

/***/ "./src/js/displayArticles.js":
/*!***********************************!*\
  !*** ./src/js/displayArticles.js ***!
  \***********************************/
/*! exports provided: default, updateArticles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return displayArticles; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateArticles\", function() { return updateArticles; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n/* harmony import */ var _components_UIArticle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/UIArticle */ \"./src/js/components/UIArticle.js\");\n/* harmony import */ var _listeners_mapActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners/mapActions */ \"./src/js/listeners/mapActions.js\");\n\n\n\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet linkDisplay = false; /////////////////////////\n// Ajouter les articles\n//////////////////////////\n\nfunction displayArticles(data) {\n  const dataParse = JSON.parse(data); // on récupère les données des contenus\n\n  st.postsData = dataParse.message;\n  d3.select(\"#articles\").remove(); // On supprime si #articles existe, comme lors d'un déplacement de contenu > on reset\n\n  d3.select(\"svg\").append(\"g\").attr(\"id\", \"articles\").selectAll(\"g\").data(st.postsData).enter().append(\"g\").attr(\"class\", \"card\");\n  d3.selectAll(\".card\").attr(\"id\", function (d) {\n    return d.raw;\n  }).attr(\"transform\", function (d) {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]);\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  });\n  d3.selectAll(\".card\").append(\"circle\").attr(\"cx\", 0).attr(\"cy\", 0).attr(\"r\", 2).attr(\"fill\", \"#ffffff\");\n  d3.selectAll(\".card\").append(\"circle\").attr(\"class\", \"grip\").attr(\"cx\", 0).attr(\"cy\", 0).attr(\"r\", 12).attr(\"opacity\", 0.05).attr(\"fill\", \"#ffffff\"); // d3.selectAll(\".card\")\n  // \t.append(\"line\")\n  // \t.attr(\"class\", \"link\")\n  // \t.attr(\"stroke\", \"#ffffff\")\n  // \t.attr(\"x1\", 0)   \n  // \t.attr(\"y1\", 0)   \n  // \t.attr(\"x2\", 24)  \n  // \t.attr(\"y2\", -24)\n\n  d3.selectAll(\".card\").append(\"svg:foreignObject\").attr(\"class\", \"content\").attr(\"style\", \"position: relative;\").attr(\"width\", 256).attr(\"height\", 200).attr(\"x\", 8).append(\"xhtml:body\").append(\"div\").attr(\"class\", \"card-title\").text(function (d) {\n    return d.title;\n  });\n  d3.selectAll(\".card\").select(\"body\").attr(\"id\", function (d) {\n    return \"wrapper-\" + d.raw;\n  }).append(\"div\").attr(\"class\", \"card-content\").html(function (d) {\n    return getContent(d);\n  });\n  d3.selectAll(\".card\").select(\"body\").append(\"div\").attr(\"class\", \"card-link\").html(function (d) {\n    return linkDisplay ? getLink(d) : null;\n  });\n  d3.selectAll(\".card\").select(\"body\").append(\"div\").attr(\"class\", \"card-edit\").html(function (d) {\n    return linkDisplay ? editPost(d) : null;\n  }); // ----------------\n  // CLICK ON ITEMS\n  // ----------------\n\n  d3.selectAll(\".card\").select(\".content\").on(\"click\", d => {\n    Object(_components_UIArticle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(d);\n  }).on(\"mouseover\", d => {\n    const item = d3.event.currentTarget.parentNode;\n    d3.select(item).classed(\"hover\", true);\n  }).on(\"mouseout\", d => {\n    const item = d3.event.currentTarget.parentNode;\n    d3.select(item).classed(\"hover\", false);\n  });\n  adjustFoHeight();\n  Object(_listeners_mapActions__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n} // Permet d'ajuster automatiquement la hauteur du foreignObject en se basant sur le body\n\nfunction adjustFoHeight() {\n  d3.selectAll(\".card\").select(\"foreignObject\").attr(\"height\", function (d) {\n    let bodyHeight = document.getElementById(\"wrapper-\" + d.raw).clientHeight;\n    return bodyHeight;\n  }).attr(\"y\", function (d) {\n    let bodyHeight = document.getElementById(\"wrapper-\" + d.raw).clientHeight;\n    return -((bodyHeight + 12) / 2);\n  });\n}\n\nfunction updateArticles(newProjection = null) {\n  // transforme les points au zoom et translate\n  d3.selectAll(\".card\").attr(\"transform\", function (d) {\n    var proj = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]);\n    return \"translate(\" + proj[0] + \", \" + proj[1] + \")\";\n  });\n  d3.selectAll(\".card\").select(\".card-content\").html(function (d) {\n    return getContent(d);\n  });\n  d3.selectAll(\".card\").select(\".card-link\").html(function (d) {\n    return linkDisplay ? getLink(d) : null;\n  });\n  adjustFoHeight();\n} // return the  content, related to zoom level\n\nfunction getContent(data) {\n  // console.log(data);\n  if (st.scaleFac < toD3Scale(st.steps[1].level)) {\n    // logger(st.steps[0].name, toD3Scale(st.steps[0].level), st.scaleFac)\n    linkDisplay = false;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[0].name);\n    return null;\n  } else if (st.scaleFac > toD3Scale(st.steps[1].level) && st.scaleFac < toD3Scale(st.steps[2].level)) {\n    // logger(st.steps[1].name, toD3Scale(st.steps[1].level), st.scaleFac)\n    linkDisplay = false;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[1].name);\n    return data.content.top;\n  } else if (st.scaleFac > toD3Scale(st.steps[2].level) && st.scaleFac < toD3Scale(st.steps[3].level)) {\n    // logger(st.steps[2].name, toD3Scale(st.steps[2].level), st.scaleFac)\n    linkDisplay = false;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[2].name);\n    return data.content.middle;\n  } else if (st.scaleFac > toD3Scale(st.steps[3].level)) {\n    // logger(st.steps[3].name, toD3Scale(st.steps[3].level), st.scaleFac)\n    linkDisplay = false;\n    d3.selectAll(\".card\").attr(\"class\", \"card \" + st.steps[3].name);\n    return data.content.low;\n  }\n}\n\nfunction getLink(data) {\n  const link = \"<a href='\" + st.rootDir + \"server/article.php?path=\" + data.path + \"'>Link</a>\";\n  return link;\n}\n\nfunction toD3Scale(initialScale) {\n  // get readable scale from my vars to unreadable scale for D3\n  return initialScale * 100000;\n}\n\nfunction editPost(data) {\n  console.log(data);\n} // function logger(stName, stLevel, stCur){\n//     console.log(\n// \t\"Zoom level :\"+stName+\"(\"+stLevel/10000+\") while at : \"+stCur/10000\n//     );\n// }\n\n//# sourceURL=webpack:///./src/js/displayArticles.js?");

/***/ }),

/***/ "./src/js/displayZones.js":
/*!********************************!*\
  !*** ./src/js/displayZones.js ***!
  \********************************/
/*! exports provided: default, updateZones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return displayZones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateZones\", function() { return updateZones; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./src/js/globals.js\");\n\n /////////////////////////\n// Ajouter les zones\n/////////////////////////\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction displayZones(data) {\n  const dataParse = JSON.parse(data);\n  st.zonesData = dataParse.message; // on récupère les données des zones\n  // console.log(\"appel zones\");\n\n  d3.select(\"svg\").append(\"g\").attr(\"id\", \"zones\").selectAll(\"text\").data(st.zonesData).enter().append(\"g\").attr(\"class\", \"zone\").append(\"text\").attr(\"letter-spacing\", 4).attr(\"text-anchor\", \"middle\").attr(\"fill\", \"#ffffff\").text(function (d) {\n    return d.title;\n  });\n  d3.select(\"svg\").selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  });\n}\nfunction updateZones(newProjection = null) {\n  d3.select(\"svg\").selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  });\n} ///////\n\n//# sourceURL=webpack:///./src/js/displayZones.js?");

/***/ }),

/***/ "./src/js/globals.js":
/*!***************************!*\
  !*** ./src/js/globals.js ***!
  \***************************/
/*! exports provided: width, height, projection, pathProjection, cardsWidth, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"width\", function() { return width; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"height\", function() { return height; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projection\", function() { return projection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pathProjection\", function() { return pathProjection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cardsWidth\", function() { return cardsWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return appState; });\n/* harmony import */ var _conf_conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conf/conf */ \"./src/js/conf/conf.js\");\n// import mapScale from \"./utils/mapScale\";\n // toutes ces variables sont modifiées dans init.js, via l'objet appState()\n\nlet user = null;\nlet space = null;\nlet spaceIndex = null; // default, le premier space dans la bdd\n\nlet isCreating = null; // on est en train de créer un article // false\n\nlet isStyling = null;\nlet isDragging = null; // false\n\nlet selectedArticle = null; // l'id de l'article sélectionné\n\nlet scaleFac = null; // doit être modifié //40000.503614997007\n\nlet currentPosition = null; // doit être modifié //[0, 0]\n\nlet spacesData = null; // doit être modifié avec le nouveau contenu chargé du json\n\nlet mapData = null;\nlet postsData = null;\nlet zonesData = null;\nlet firstStart = true;\nlet rootDir = _conf_conf__WEBPACK_IMPORTED_MODULE_0__[\"paths\"].appUrl;\nlet isCtrlKeyPushed = false;\nlet isAltKeyPushed = false;\nlet steps = [{\n  name: \"galaxy\",\n  level: 0\n}, {\n  name: \"sky\",\n  level: 13\n}, {\n  name: \"bird\",\n  level: 50\n}, {\n  name: \"ground\",\n  level: 260\n}]; // const postsDir = rootDir+\"dist/content/\";\n// export var mapDataPath = \"dist/assets/maps/map-1.geojson\";\n\nvar st = new appState();\nvar width = screen.availWidth;\nvar height = screen.availHeight;\nvar projection = d3.geo.mercator().scale(485035).translate([-215431, 336666]);\nvar pathProjection = d3.geo.path().projection(projection);\nvar cardsWidth = 340; // cette fonction contient modifie les états de l'application, avec des getters et des setters\n// pour pouvoir vivre tout au long du déroulement\n// s'applique sur les trois variables déclarées au dessus\n\nfunction appState() {\n  Object.defineProperty(this, 'space', {\n    get: function () {\n      return space;\n    },\n    set: function (value) {\n      space = value;\n    }\n  });\n  Object.defineProperty(this, 'spaceIndex', {\n    get: function () {\n      return spaceIndex;\n    },\n    set: function (value) {\n      spaceIndex = value;\n    }\n  });\n  Object.defineProperty(this, 'user', {\n    get: function () {\n      return user;\n    },\n    set: function (value) {\n      if (value == \"\") {\n        value = null;\n      }\n\n      user = value;\n    }\n  });\n  Object.defineProperty(this, 'isCreating', {\n    get: function () {\n      return isCreating;\n    },\n    set: function (value) {\n      isCreating = value;\n    }\n  });\n  Object.defineProperty(this, 'isStyling', {\n    get: function () {\n      return isStyling;\n    },\n    set: function (value) {\n      isStyling = value;\n    }\n  });\n  Object.defineProperty(this, 'isDragging', {\n    get: function () {\n      return isDragging;\n    },\n    set: function (value) {\n      isDragging = value;\n    }\n  });\n  Object.defineProperty(this, 'scaleFac', {\n    get: function () {\n      return scaleFac;\n    },\n    set: function (value) {\n      scaleFac = value;\n    }\n  });\n  Object.defineProperty(this, 'currentPosition', {\n    get: function () {\n      return currentPosition;\n    },\n    set: function (value) {\n      currentPosition = value;\n    }\n  });\n  Object.defineProperty(this, 'spacesData', {\n    get: function () {\n      return spacesData;\n    },\n    set: function (value) {\n      spacesData = value;\n    }\n  });\n  Object.defineProperty(this, 'mapData', {\n    get: function () {\n      return mapData;\n    },\n    set: function (value) {\n      mapData = value;\n    }\n  });\n  Object.defineProperty(this, 'postsData', {\n    get: function () {\n      return postsData;\n    },\n    set: function (value) {\n      postsData = value;\n    }\n  });\n  Object.defineProperty(this, 'zonesData', {\n    get: function () {\n      return zonesData;\n    },\n    set: function (value) {\n      zonesData = value;\n    }\n  });\n  Object.defineProperty(this, 'firstStart', {\n    get: function () {\n      return firstStart;\n    },\n    set: function (value) {\n      firstStart = value;\n    }\n  });\n  Object.defineProperty(this, 'rootDir', {\n    get: function () {\n      return rootDir;\n    },\n    set: function (value) {\n      rootDir = value;\n    }\n  });\n  Object.defineProperty(this, 'postsDir', {\n    get: function () {\n      return postsDir;\n    },\n    set: function (value) {\n      postsDir = value;\n    }\n  });\n  Object.defineProperty(this, 'steps', {\n    get: function () {\n      return steps;\n    },\n    set: function (value) {\n      steps = value;\n    }\n  });\n  Object.defineProperty(this, 'isCtrlKeyPushed', {\n    get: function () {\n      return isCtrlKeyPushed;\n    },\n    set: function (value) {\n      isCtrlKeyPushed = value;\n    }\n  });\n  Object.defineProperty(this, 'isAltKeyPushed', {\n    get: function () {\n      return isAltKeyPushed;\n    },\n    set: function (value) {\n      isAltKeyPushed = value;\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/js/globals.js?");

/***/ }),

/***/ "./src/js/listeners/actions.js":
/*!*************************************!*\
  !*** ./src/js/listeners/actions.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return actions; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app */ \"./src/js/app.js\");\n/* harmony import */ var _components_removeUIInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/removeUIInput */ \"./src/js/components/removeUIInput.js\");\n\n\n\n // export let ctrlPushed = false;\n// export let altPushed = false;\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar selectedNode = null;\nfunction actions() {\n  window.addEventListener('keydown', event => {\n    if (event.ctrlKey) {\n      st.isCtrlKeyPushed = true;\n    }\n\n    if (event.altKey) {\n      st.isAltKeyPushed = true;\n    }\n\n    if (event.keyCode == 27) {\n      // ESC key\n      Object(_components_removeUIInput__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    }\n  }, false);\n  window.addEventListener('keyup', event => {\n    st.isCtrlKeyPushed = false;\n    st.isAltKeyPushed = false;\n  }, false); // ----------\n  // NAVIGATION\n  // ----------\n\n  const navItems = document.querySelectorAll(\".nav-item\");\n\n  for (let i = 0; i < navItems.length; i++) {\n    navItems[i].addEventListener('click', event => {\n      Object(_app__WEBPACK_IMPORTED_MODULE_1__[\"setActiveSpace\"])(i);\n      Object(_app__WEBPACK_IMPORTED_MODULE_1__[\"reset\"])();\n    }, false);\n  }\n}\n\n//# sourceURL=webpack:///./src/js/listeners/actions.js?");

/***/ }),

/***/ "./src/js/listeners/articleActions.js":
/*!********************************************!*\
  !*** ./src/js/listeners/articleActions.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return articleActions; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n/* harmony import */ var _components_UIArticle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/UIArticle */ \"./src/js/components/UIArticle.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../request */ \"./src/js/request.js\");\n/* harmony import */ var _conf_conf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../conf/conf */ \"./src/js/conf/conf.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ \"./src/js/app.js\");\n\n\n\n\n\n\nlet ctrlPushed = false;\nlet altPushed = false;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar selectedNode = null;\nfunction articleActions(data) {\n  // console.log(data);\n  // REMOVE ARTICLE\n  // ----------------\n  const articleOverlay = document.querySelector(\".overlay\");\n  const activeArticle = document.querySelector(\".article\");\n  const deleteArticle = document.getElementById(\"delete\");\n  const editArticle = document.getElementById(\"edit\");\n  articleOverlay.addEventListener(\"click\", e => {\n    articleOverlay.setAttribute(\"class\", \"overlay hiding\");\n    activeArticle.setAttribute(\"class\", \"article hiding\"); // et on supprime après avoir laissé l'anim jouer\n\n    window.setTimeout(d => {\n      activeArticle.parentNode.removeChild(activeArticle);\n      articleOverlay.parentNode.removeChild(articleOverlay);\n    }, 500);\n  });\n  deleteArticle.addEventListener(\"click\", e => {\n    const titleRaw = activeArticle.getAttribute(\"id\"); // hiding\n\n    articleOverlay.setAttribute(\"class\", \"overlay hiding\");\n    activeArticle.setAttribute(\"class\", \"article hiding\");\n    d3.select(\"#articles\").select(\"#\" + titleRaw).classed(\"deleting\", true); // et on supprime après avoir laissé l'anim jouer\n\n    window.setTimeout(d => {\n      activeArticle.parentNode.removeChild(activeArticle);\n      articleOverlay.parentNode.removeChild(articleOverlay);\n      Object(_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"DELETE\", _conf_conf__WEBPACK_IMPORTED_MODULE_3__[\"paths\"].apiUrl + \"/content/\" + data._id, null, _app__WEBPACK_IMPORTED_MODULE_4__[\"requestPosts\"]);\n    }, 650);\n  });\n  editArticle.addEventListener(\"click\", e => {\n    const titleRaw = activeArticle.getAttribute(\"id\");\n    Object(_components_UIArticle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data, true);\n  });\n}\n\n//# sourceURL=webpack:///./src/js/listeners/articleActions.js?");

/***/ }),

/***/ "./src/js/listeners/articlePost.js":
/*!*****************************************!*\
  !*** ./src/js/listeners/articlePost.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return articlePost; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n/* harmony import */ var _components_removeUIInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/removeUIInput */ \"./src/js/components/removeUIInput.js\");\n/* harmony import */ var _conf_conf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../conf/conf */ \"./src/js/conf/conf.js\");\n/* harmony import */ var _utils_getTags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getTags */ \"./src/js/utils/getTags.js\");\n/* harmony import */ var _utils_formattedDate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/formattedDate */ \"./src/js/utils/formattedDate.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app */ \"./src/js/app.js\");\n\n\n\n\n\n\n\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar selectedNode = null;\nfunction articlePost() {\n  var btnValidate = document.getElementById(\"document-validate\");\n  var btnCancel = document.getElementById(\"document-cancel\");\n  btnValidate.addEventListener('click', function () {\n    var title = document.getElementById(\"content-title\").value;\n    var longitude = document.getElementById(\"content-position-long\").value;\n    var latitude = document.getElementById(\"content-position-lat\").value;\n    const rteeditor = document.getElementById(\"rteeditor\");\n    const contentRaw = rteeditor.contentWindow.document.body.innerHTML;\n    const content = processContent(contentRaw);\n    const tagsWrapper = document.getElementById(\"content-tags\");\n    const tags = Object(_utils_getTags__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(tagsWrapper.value);\n    const moment = Object(_utils_formattedDate__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n    const data = {\n      \"title\": title,\n      \"location\": {\n        \"latitude\": latitude,\n        \"longitude\": longitude\n      },\n      \"content\": {\n        \"high\": null,\n        \"medium\": null,\n        \"low\": null,\n        \"full\": content\n      },\n      \"tags\": tags,\n      \"created\": {\n        \"user\": st.user,\n        \"date\": moment\n      },\n      \"lastUpdated\": {\n        \"user\": null,\n        \"date\": null\n      },\n      \"relations\": [\"tag1\", \"tag2\"],\n      \"space\": st.space\n    };\n    Object(_request__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"POST\", _conf_conf__WEBPACK_IMPORTED_MODULE_2__[\"paths\"].apiUrl + \"/content\", JSON.stringify(data), _app__WEBPACK_IMPORTED_MODULE_6__[\"requestPosts\"]);\n    Object(_components_removeUIInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  }, false);\n  btnCancel.addEventListener('click', function () {\n    Object(_components_removeUIInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  }, false);\n}\n\nfunction processContent(data) {\n  return null;\n}\n\n//# sourceURL=webpack:///./src/js/listeners/articlePost.js?");

/***/ }),

/***/ "./src/js/listeners/articleUpdate.js":
/*!*******************************************!*\
  !*** ./src/js/listeners/articleUpdate.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return articleUpdate; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n/* harmony import */ var _components_UIArticle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/UIArticle */ \"./src/js/components/UIArticle.js\");\n\n\n\nlet ctrlPushed = false;\nlet altPushed = false;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar selectedNode = null;\nfunction articleUpdate(data) {\n  var btnValidate = document.getElementById(\"document-validate\");\n  var btnCancel = document.getElementById(\"document-cancel\");\n  btnValidate.addEventListener('click', function () {\n    // console.log(\"update file\");\n    var titleValue = document.getElementById(\"content-title\").value;\n    var longitude = data.location.longitude;\n    var latitude = data.location.latitude;\n    var simplemde = new SimpleMDE({\n      element: document.getElementById(\"content-edit\")\n    });\n    var contentValue = simplemde.value(); // console.log(document.getElementById(\"content-edit\"));\n\n    var tagsValue = document.getElementById(\"content-tags\").value;\n    const moment = formattedDate(); // le title intégré dans la desc du markdown\n\n    var contentFormatted = \"title: \" + titleValue + \"\\n\";\n    contentFormatted += \"position: \" + latValue + \", \" + longValue + \"\\n\";\n    contentFormatted += \"created: \" + st.user + \", \" + moment + \"\\n\";\n    contentFormatted += \"lastupdated: \\n\";\n    contentFormatted += \"tags: \" + tagsValue + \"\\n\";\n    contentFormatted += \"relations: 0\\n\\n\";\n    contentFormatted += \"---\\n\\n\";\n    contentFormatted += contentValue; // console.log(contentFormatted);\n\n    Object(_components_UIArticle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data);\n  }, false);\n  btnCancel.addEventListener('click', function () {\n    Object(_components_UIArticle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data);\n  }, false);\n}\n\nfunction endDrag() {\n  selectedNode = null;\n\n  if (st.draggingNode !== null) {\n    st.draggingNode = null;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/listeners/articleUpdate.js?");

/***/ }),

/***/ "./src/js/listeners/mapActions.js":
/*!****************************************!*\
  !*** ./src/js/listeners/mapActions.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return mapActions; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n/* harmony import */ var _addArticle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addArticle */ \"./src/js/addArticle.js\");\n/* harmony import */ var _addZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addZone */ \"./src/js/addZone.js\");\n/* harmony import */ var _displayArticles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../displayArticles */ \"./src/js/displayArticles.js\");\n/* harmony import */ var _displayZones__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../displayZones */ \"./src/js/displayZones.js\");\n/* harmony import */ var _utils_formattedDate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/formattedDate */ \"./src/js/utils/formattedDate.js\");\n/* harmony import */ var _conf_conf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../conf/conf */ \"./src/js/conf/conf.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../app */ \"./src/js/app.js\");\n\n // import mapScale from '../utils/mapScale';\n\n\n\n\n\n\n\n\n // import {ctrlPushed, altPushed} from './actions'\n// let ctrlPushed = false;\n// let altPushed = false;\n\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar selectedNode = null;\nfunction mapActions() {\n  d3.select(\"body\").select(\"svg\").on('mousemove', function () {\n    st.currentPosition = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].invert(d3.mouse(this));\n  }).on('click', function () {\n    st.currentPosition = _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].invert(d3.mouse(this));\n\n    if (st.isCtrlKeyPushed == true && st.isAltKeyPushed == false && st.isCreating == false) {\n      Object(_addArticle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(st.currentPosition);\n    }\n\n    if (st.isCtrlKeyPushed == true && st.isAltKeyPushed == true && st.isCreating == false) {\n      Object(_addZone__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(st.currentPosition);\n    }\n\n    st.isCtrlKeyPushed = false;\n    st.isAltKeyPushed = false;\n    return;\n  }); // on déclare le zoom\n\n  var zoom = d3.behavior.zoom().translate(_globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].translate()).scale(_globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].scale()).on(\"zoom\", mapScale); // puis on l'appelle\n\n  d3.select(\"svg\").call(zoom);\n  d3.select(\"#articles\").selectAll(\".card\").select(\".grip\").call(dragListener);\n}\nvar dragListener = d3.behavior.drag().on(\"dragstart\", function (d) {\n  // lance un intervalle, puis met launch sur ok\n  var card = d3.select(this.parentNode);\n  console.log(this);\n  st.draggingNode = true;\n  card.select(\".grip\").attr(\"r\", 48).attr(\"opacity\", \"0.25\");\n  card.classed(\"card isDragged\", true);\n  d3.event.sourceEvent.stopPropagation(); // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');\n}).on(\"drag\", function (d) {\n  var card = d3.select(this.parentNode);\n  card.attr(\"transform\", function (d) {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"](st.currentPosition) + \")\";\n  });\n}).on(\"dragend\", function (d) {\n  var card = d3.select(this.parentNode);\n  var titleRaw = card.attr(\"id\");\n  updateArticlePosition(d);\n});\n\nfunction updateArticlePosition(d) {\n  // request(\"POST\", \"server/utils/UpdateMarkdownDocument.php\", \"titleraw=\"+titleRaw+\"&newlongitude=\"+st.currentPosition[0]+\"&newlatitude=\"+st.currentPosition[1]+\"&space=\"+st.space+\"&user=\"+st.user, requestPosts)\n  const moment = Object(_utils_formattedDate__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n  const data = {\n    \"location\": {\n      \"latitude\": st.currentPosition[1],\n      \"longitude\": st.currentPosition[0]\n    },\n    \"lastUpdated\": {\n      \"user\": st.user,\n      \"date\": moment\n    }\n  };\n  Object(_request__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(\"PUT\", _conf_conf__WEBPACK_IMPORTED_MODULE_6__[\"paths\"].apiUrl + \"/content/\" + d._id, JSON.stringify(data), _app__WEBPACK_IMPORTED_MODULE_8__[\"requestPosts\"]);\n}\n\nfunction mapScale() {\n  var t = d3.event.translate;\n  var s = d3.event.scale;\n  _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].translate(t).scale(s);\n  st.scaleFac = s; // on actualise le facteur d'échelle\n  // transforme les pays\n\n  d3.select(\"svg\").selectAll(\"path\").attr(\"d\", _globals__WEBPACK_IMPORTED_MODULE_0__[\"pathProjection\"]);\n  Object(_displayArticles__WEBPACK_IMPORTED_MODULE_3__[\"updateArticles\"])();\n  Object(_displayZones__WEBPACK_IMPORTED_MODULE_4__[\"updateZones\"])();\n  d3.select(\"svg\").selectAll(\".creation-spot\").attr(\"transform\", function () {\n    return \"translate(\" + _globals__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d3.select(this).attr(\"latitude\"), d3.select(this).attr(\"longitude\")]) + \")\";\n  });\n}\n\n//# sourceURL=webpack:///./src/js/listeners/mapActions.js?");

/***/ }),

/***/ "./src/js/listeners/zonePost.js":
/*!**************************************!*\
  !*** ./src/js/listeners/zonePost.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return zonePost; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n/* harmony import */ var _components_removeUIInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/removeUIInput */ \"./src/js/components/removeUIInput.js\");\n/* harmony import */ var _utils_formattedDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/formattedDate */ \"./src/js/utils/formattedDate.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../request */ \"./src/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ \"./src/js/app.js\");\n/* harmony import */ var _conf_conf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../conf/conf */ \"./src/js/conf/conf.js\");\n\n\n\n\n\n\n\nlet ctrlPushed = false;\nlet altPushed = false;\nvar st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar selectedNode = null;\nfunction zonePost() {\n  var btnValidate = document.getElementById(\"document-validate\");\n  var btnCancel = document.getElementById(\"document-cancel\");\n  btnValidate.addEventListener('click', function () {\n    var title = document.getElementById(\"content-title\").value;\n    var longitude = document.getElementById(\"content-position-long\").value;\n    var latitude = document.getElementById(\"content-position-lat\").value;\n    const moment = Object(_utils_formattedDate__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const data = {\n      \"title\": title,\n      \"location\": {\n        \"latitude\": latitude,\n        \"longitude\": longitude\n      },\n      \"created\": {\n        \"user\": st.user,\n        \"date\": moment\n      },\n      \"lastUpdated\": {\n        \"user\": null,\n        \"date\": null\n      },\n      \"space\": st.space // console.log(data);\n\n    };\n    Object(_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"POST\", _conf_conf__WEBPACK_IMPORTED_MODULE_5__[\"paths\"].apiUrl + \"/zones\", JSON.stringify(data), _app__WEBPACK_IMPORTED_MODULE_4__[\"requestZones\"]);\n    Object(_components_removeUIInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  }, false);\n  btnCancel.addEventListener('click', function () {\n    Object(_components_removeUIInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  }, false);\n}\n\n//# sourceURL=webpack:///./src/js/listeners/zonePost.js?");

/***/ }),

/***/ "./src/js/request.js":
/*!***************************!*\
  !*** ./src/js/request.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return request; });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n // AJAX requests\n\nfunction getRequestObject() {\n  var o = null;\n\n  if (window.XMLHttpRequest) {\n    o = new XMLHttpRequest();\n  } else if (window.ActiveXObject) {\n    try {\n      o = new ActiveXObject('Msxml2.XMLHTTP');\n    } catch (e1) {\n      try {\n        o = new ActiveXObject('Microsoft.XMLHTTP');\n      } catch (e2) {}\n    }\n  }\n\n  return o;\n}\n\nfunction request(method, uri, sendData = null, callback = requestCallback) {\n  var o = getRequestObject();\n  var async = callback !== null;\n  var timestamp = new Date();\n  var uniqueURI = uri + (uri.indexOf(\"?\") > 0 ? \"&\" : \"?\") + \"timestamp=\" + timestamp.getTime();\n\n  if (method === 'GET') {\n    if (sendData != null) {\n      uniqueURI += \"&\" + sendData;\n    }\n\n    o.open(method, uniqueURI, async);\n    o.send(null);\n  } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {\n    // o.withCredentials = true;\n    o.open(method, uri, async);\n    o.setRequestHeader('Content-Type', 'application/json');\n    o.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');\n    o.send(sendData);\n  }\n\n  if (async) {\n    o.onreadystatechange = function () {\n      if (o.readyState == 4 && o.status == 200) {\n        callback(o.responseText);\n      } else if (o.readyState == 4 && o.status != 200) {// console.log(\"There was an error during this request for \"+uri)\n      }\n    };\n  }\n\n  if (async) {\n    return;\n  } else {\n    return o.responseText;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/request.js?");

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

/***/ "./src/js/utils/formattedDate.js":
/*!***************************************!*\
  !*** ./src/js/utils/formattedDate.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return formattedDate; });\nfunction formattedDate() {\n  const date = new Date();\n  const year = date.getFullYear();\n  const month = regularMonth(date.getMonth());\n  const day = date.getDate();\n  const hours = twoDigitsHour(date.getHours());\n  const minutes = date.getMinutes();\n  const result = year + \"-\" + month + \"-\" + day + \" \" + hours + \":\" + minutes;\n  return result;\n}\n\nfunction regularMonth(month) {\n  let result = month + 1;\n\n  if (result < 10) {\n    result = \"0\" + result;\n  } else {\n    result = result.toString();\n  }\n\n  return result;\n}\n\nfunction twoDigitsHour(hour) {\n  let result = hour;\n\n  if (result < 10) {\n    result = \"0\" + result;\n  } else {\n    result = result.toString();\n  }\n\n  return result;\n}\n\n//# sourceURL=webpack:///./src/js/utils/formattedDate.js?");

/***/ }),

/***/ "./src/js/utils/getTags.js":
/*!*********************************!*\
  !*** ./src/js/utils/getTags.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getTags; });\nfunction getTags(data) {\n  const tags = data.split(\",\");\n  console.log(tags);\n  return tags;\n}\n\n//# sourceURL=webpack:///./src/js/utils/getTags.js?");

/***/ }),

/***/ "./src/js/utils/loginManager.js":
/*!**************************************!*\
  !*** ./src/js/utils/loginManager.js ***!
  \**************************************/
/*! exports provided: default, loginAlert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return loginManager; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loginAlert\", function() { return loginAlert; });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ \"./src/js/globals.js\");\n\n\nlet st = new _globals__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet resetAfterCaution;\nfunction loginManager() {\n  const form = document.getElementById(\"login-form\");\n  const input = document.getElementById(\"login-input\");\n  input.value = \"\"; //listener\n\n  form.addEventListener(\"submit\", e => {\n    e.preventDefault;\n    st.user = input.value;\n    updateLoginInfo();\n  });\n}\n\nfunction updateLoginInfo() {\n  const login = document.getElementById(\"login\");\n  const info = document.getElementById(\"login-info\");\n\n  if (st.user !== null) {\n    clearTimeout(resetAfterCaution);\n    info.innerHTML = \"Logged as <strong>\" + st.user + \"</strong>\";\n    login.setAttribute(\"class\", \"logged\");\n  } else {\n    info.innerHTML = \"You are currently anonymous. Please enter a name in order to manipulate content.\";\n    login.setAttribute(\"class\", \"not-logged\");\n  }\n}\n\nfunction loginAlert() {\n  console.log('you have to login in order to manipulate informations');\n  const login = document.getElementById(\"login\");\n  const loginClasses = login.getAttribute(\"class\"); // add caution class\n\n  login.setAttribute(\"class\", loginClasses + \" caution\"); // then reset after a few seconds, back to original classes\n\n  resetAfterCaution = setTimeout(function () {\n    login.setAttribute(\"class\", loginClasses);\n  }, 3500);\n}\n\n//# sourceURL=webpack:///./src/js/utils/loginManager.js?");

/***/ }),

/***/ "./src/js/utils/scale.js":
/*!*******************************!*\
  !*** ./src/js/utils/scale.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function scale(num, in_min, in_max, out_min, out_max) {\n  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\nmodule.exports = scale;\n\n//# sourceURL=webpack:///./src/js/utils/scale.js?");

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