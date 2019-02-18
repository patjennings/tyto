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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return create; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./client/js/request.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./client/js/app.js\");\n\n\n\n\nlet isCreating = null;\nvar st = new _vars__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar simplemde;\nfunction create(currentPosition) {\n  var long = currentPosition[1];\n  var lat = currentPosition[0];\n  st.isCreating = true; // create layer w/ input + save button\n\n  var proj = _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([lat, long]);\n  var content = \"\";\n  var elements = \"<div id='input-container' style='transform: translate(\" + proj[0] + \"px, \" + proj[1] + \"px);'><input id='content-title' placeholder='Titre'></input><textarea id='content-content' rows='6' placeholder='Contenu'>\" + content + \"</textarea><input id='content-position-long' type='hidden' value='\" + long + \"'/><input id='content-position-lat' type='hidden' value='\" + lat + \"'/><div class='btn-container'><button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button><button value='cancel' class='btn' id='document-cancel'>Annuler</button></div></div>\";\n  $(\".map\").append(elements);\n  startMarkdownEditor();\n  save(); // save/create file\n}\n\nfunction save() {\n  var btnValidate = document.getElementById(\"document-validate\");\n  var btnCancel = document.getElementById(\"document-cancel\");\n  btnValidate.addEventListener('click', function () {\n    console.log(\"save file\");\n    var titleValue = document.getElementById(\"content-title\").value;\n    var longValue = document.getElementById(\"content-position-long\").value;\n    var latValue = document.getElementById(\"content-position-lat\").value;\n    var contentValue = simplemde.value();\n    var contentFormatted = \"title: \" + titleValue + \"\\nposition: \" + longValue + \", \" + latValue + \"\\n\\n---\\n\" + contentValue; // le title intégré dans la desc du markdown\n\n    Object(_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"POST\", \"includes/SaveMarkdownDocument.php\", \"title=\" + titleValue + \"&content=\" + contentFormatted, _app__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n  }, false);\n  btnCancel.addEventListener('click', function () {\n    var elem = document.getElementById(\"input-container\");\n    elem.parentNode.removeChild(elem);\n    st.isCreating = false; // console.log(this);\n  }, false);\n}\n\nfunction startMarkdownEditor() {\n  // var editor = new Editor({\n  // \telement: document.getElementById(\"content-content\")\n  // });\n  // editor.render();\n  simplemde = new SimpleMDE({\n    element: document.getElementById(\"content-content\")\n  });\n}\n\n//# sourceURL=webpack:///./client/js/addContent.js?");

/***/ }),

/***/ "./client/js/app.js":
/*!**************************!*\
  !*** ./client/js/app.js ***!
  \**************************/
/*! exports provided: writeAppData, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeAppData\", function() { return writeAppData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return app; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n/* harmony import */ var _addContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addContent */ \"./client/js/addContent.js\");\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zoom */ \"./client/js/zoom.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./client/js/utils.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./draw */ \"./client/js/draw.js\");\n/* harmony import */ var _createArticles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createArticles */ \"./client/js/createArticles.js\");\n/* harmony import */ var _createZones__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createZones */ \"./client/js/createZones.js\");\n/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listeners */ \"./client/js/listeners.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./request */ \"./client/js/request.js\");\n\n\n\n\n\n\n\n\n\n\n\nlet content = null;\n\n(function (window) {\n  var appData = Object(_request__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(\"GET\", \"list-content.php\", null, writeAppData); // on télécharge les données\n  // app();\n})(window);\n\nfunction writeAppData(data) {\n  // on relance app(), et on recharge tout\n  var st = new _vars__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  st.appData = JSON.parse(data);\n  app();\n}\nfunction app() {\n  console.log();\n  var st = new _vars__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  st.isCreating = false;\n  st.isDragging = false;\n  st.scaleFac = 40000.503614997007;\n  st.currentPosition = [0, 0];\n  console.log(st.appData);\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"rect\").attr(\"class\", \"background\").attr(\"width\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"width\"]).attr(\"height\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"height\"]); // function displayInformations(zoom){\n  // \tinfos = document.getElementById(\"position\");\n  // \tinfos.value = vars.currentPosition[1].toFixed(4)+\", \"+vars.currentPosition[0].toFixed(4);\n  // }\n  //////////////////////\n  // Afficher la carte\n  ////////////////////////\n\n  d3.json(_vars__WEBPACK_IMPORTED_MODULE_0__[\"mapPath\"], function (error, json) {\n    // if (error) throw error;\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"g\").attr(\"id\", \"states\").selectAll(\"path\").data(json.features).enter().append(\"path\").attr(\"d\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"path\"]).attr(\"id\", function (d, i) {\n      return i;\n    }).style(\"stroke\", \"#999999\").style(\"fill\", \"rgba(255,255,255,0.5)\"); // .on(\"click\", clicked);\n    // On lance les fonctions une fois que la carte est chargée et affichée\n\n    Object(_createArticles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(); // création des articles\n\n    Object(_createZones__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(); // création des titres de zones\n\n    Object(_listeners__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(); // createPoints(); // affiche les points et permet de vérifier le centrage des cartes.\n  });\n}\n\n//# sourceURL=webpack:///./client/js/app.js?");

/***/ }),

/***/ "./client/js/createArticles.js":
/*!*************************************!*\
  !*** ./client/js/createArticles.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createArticles; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw */ \"./client/js/draw.js\");\n\n\n /////////////////////////\n// Ajouter les articles\n//////////////////////////\n\nfunction createArticles() {\n  var st = new _vars__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"g\").attr(\"id\", \"articles\").selectAll(\"rect\").data(st.appData).enter().append(\"g\").attr(\"class\", \"card\").append(\"rect\").attr(\"width\", 96).attr(\"height\", 128).attr(\"fill\", \"#FFFFFF\").attr(\"opacity\", \"0\");\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".card\").attr(\"transform\", function (d) {\n    var proj = _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]); // La hauteur dynamique du contenant (.inner-card)\n\n    var rectHeight = _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".card\").node().getBoundingClientRect().height;\n    return \"translate(\" + (proj[0] - 340 / 2) + \", \" + (proj[1] - rectHeight / 2) + \")\";\n  }).append(\"svg:foreignObject\").attr(\"width\", 340).attr(\"height\", 800).append(\"xhtml:body\").attr(\"class\", \"inner-card\").html(function (d) {\n    return \"<div class='title'><h3>\" + d.title + \"</h3>\";\n  }).append(\"div\").attr(\"class\", \"content\");\n  Object(_draw__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n}\n\n//# sourceURL=webpack:///./client/js/createArticles.js?");

/***/ }),

/***/ "./client/js/createZones.js":
/*!**********************************!*\
  !*** ./client/js/createZones.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createZones; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n /////////////////////////\n// Ajouter les zones\n/////////////////////////\n\nfunction createZones() {\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"g\").attr(\"id\", \"zones\").selectAll(\"text\").data(_vars__WEBPACK_IMPORTED_MODULE_0__[\"zones\"]).enter().append(\"g\").attr(\"class\", \"zone\").append(\"text\").attr(\"font-family\", \"lato\").attr(\"font-size\", \"16px\").attr(\"text-anchor\", \"middle\").text(function (d) {\n    return d.title;\n  });\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  });\n} ///////\n\n//# sourceURL=webpack:///./client/js/createZones.js?");

/***/ }),

/***/ "./client/js/draw.js":
/*!***************************!*\
  !*** ./client/js/draw.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return draw; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./client/js/utils.js\");\n\n\n ///////////////////////////////////////////\n// affiche le contenu relatif au niveau de zooms\n//////////////////////////////////////////////////\n\nlet pFile = \"article.php\"; // le fichier php qui affiche les articles\n\nvar st = new _vars__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction draw(s) {\n  // s is for scale\n  console.log(s); // adapter l'opacité au niveau de zoom\n\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"style\", \"opacity:\" + Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(s, 1070, 10000, 0.15, 1) + \";\");\n\n  if (s < 1300000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card sky\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p></p>\";\n    });\n  } else if (s >= 1300000 && s < 5000000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card top\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p>\" + d.content.top + \"</p><a href='\" + pFile + \"?path=\" + d.path + \"'>Full article</a>\";\n    });\n  } else if (s >= 5000000 && s < 26000000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card middle\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p>\" + d.content.middle + \"</p><a href='\" + pFile + \"?path=\" + d.path + \"'>Full article</a>\";\n    });\n  } else if (s >= 26000000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card low\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p>\" + d.content.low + \"</p><a href='\" + pFile + \"?path=\" + d.path + \"'>Full article</a>\";\n    });\n  }\n\n  var elem = _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\");\n}\n\n//# sourceURL=webpack:///./client/js/draw.js?");

/***/ }),

/***/ "./client/js/listeners.js":
/*!********************************!*\
  !*** ./client/js/listeners.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return listeners; });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./client/js/zoom.js\");\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n/* harmony import */ var _addContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addContent */ \"./client/js/addContent.js\");\n\n\n\n\nlet ctrlPushed = false;\nvar st = new _vars__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar selectedNode = null;\nfunction listeners() {\n  // Ctrl key listener, pour utiliser avec le click lors de la création de documents\n  window.addEventListener('keydown', event => {\n    if (event.ctrlKey) {\n      ctrlPushed = true;\n    }\n  }, false);\n  window.addEventListener('keyup', event => {\n    ctrlPushed = false;\n  }, false);\n  d3.select(\"body\").select(\"svg\").on('mousemove', function () {\n    st.currentPosition = _vars__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].invert(d3.mouse(this)); // console.log(st.currentPosition);\n    // console.log(\">>>>>> \"+ctrlPushed);\n  }).on('click', function () {\n    st.currentPosition = _vars__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].invert(d3.mouse(this));\n\n    if (ctrlPushed == true && st.isCreating == false) {\n      // si on peut créer un doc ET que la touche ctrl est enfoncée\n      Object(_addContent__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(st.currentPosition);\n    }\n  }); // on déclare le zoom\n\n  var zoom = d3.behavior.zoom().translate(_vars__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].translate()).scale(_vars__WEBPACK_IMPORTED_MODULE_1__[\"projection\"].scale()).on(\"zoom\", _zoom__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); // puis on l'appelle\n\n  _vars__WEBPACK_IMPORTED_MODULE_1__[\"g\"].call(zoom);\n  _vars__WEBPACK_IMPORTED_MODULE_1__[\"g\"].selectAll(\".card\").call(dragListener);\n}\nvar dragListener = d3.behavior.drag().on(\"dragstart\", function (d) {\n  st.draggingNode = true;\n  d3.event.sourceEvent.stopPropagation(); // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');\n}).on(\"drag\", function (d) {\n  console.log(d);\n}).on(\"dragend\", function (d) {\n  console.log(\"end drag\");\n});\n\nfunction endDrag() {\n  selectedNode = null;\n\n  if (st.draggingNode !== null) {\n    st.draggingNode = null;\n  }\n}\n\n//# sourceURL=webpack:///./client/js/listeners.js?");

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

/***/ "./client/js/utils.js":
/*!****************************!*\
  !*** ./client/js/utils.js ***!
  \****************************/
/*! exports provided: copyTextToClipboard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"copyTextToClipboard\", function() { return copyTextToClipboard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scale; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n\n\nfunction fallbackCopyTextToClipboard(text) {\n  var textArea = document.createElement(\"textarea\");\n  textArea.value = text;\n  document.body.appendChild(textArea);\n  textArea.focus();\n  textArea.select();\n\n  try {\n    var successful = document.execCommand('copy');\n    var msg = successful ? 'successful' : 'unsuccessful';\n    console.log('Fallback: Copying text command was ' + msg);\n  } catch (err) {\n    console.error('Fallback: Oops, unable to copy', err);\n  }\n\n  document.body.removeChild(textArea);\n}\n\nfunction copyTextToClipboard(text) {\n  if (!navigator.clipboard) {\n    fallbackCopyTextToClipboard(text);\n    return;\n  }\n\n  navigator.clipboard.writeText(text).then(function () {\n    console.log('Async: Copying to clipboard was successful!');\n  }, function (err) {\n    console.error('Async: Could not copy text: ', err);\n  });\n} // this is the map() function from processing\n\nfunction scale(num, in_min, in_max, out_min, out_max) {\n  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\n//# sourceURL=webpack:///./client/js/utils.js?");

/***/ }),

/***/ "./client/js/vars.js":
/*!***************************!*\
  !*** ./client/js/vars.js ***!
  \***************************/
/*! exports provided: default, mapPath, zones, width, height, projection, path, svg, g */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return appState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapPath\", function() { return mapPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"zones\", function() { return zones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"width\", function() { return width; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"height\", function() { return height; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projection\", function() { return projection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"path\", function() { return path; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"svg\", function() { return svg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"g\", function() { return g; });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./client/js/zoom.js\");\n // toutes ces variables sont modifiées dans init.js, via l'objet appState()\n\nlet isCreating = null; // on est en train de créer un article // false\n\nlet isDragging = null; // false\n\nlet scaleFac = null; // doit être modifié //40000.503614997007\n\nlet currentPosition = null; // doit être modifié //[0, 0]\n\nlet appData = null; // doit être modifié avec le nouveau contenu chargé du json\n// cette fonction contient modifie les états de l'application, avec des getters et des setters\n// pour pouvoir vivre tout au long du déroulement\n// s'applique sur les trois variables déclarées au dessus\n\nfunction appState() {\n  // var archive = [];\n  Object.defineProperty(this, 'isCreating', {\n    get: function () {\n      return isCreating;\n    },\n    set: function (value) {\n      isCreating = value;\n    }\n  });\n  Object.defineProperty(this, 'isDragging', {\n    get: function () {\n      return isDragging;\n    },\n    set: function (value) {\n      isDragging = value;\n    }\n  });\n  Object.defineProperty(this, 'scaleFac', {\n    get: function () {\n      return scaleFac;\n    },\n    set: function (value) {\n      scaleFac = value;\n    }\n  });\n  Object.defineProperty(this, 'currentPosition', {\n    get: function () {\n      return currentPosition;\n    },\n    set: function (value) {\n      currentPosition = value;\n    }\n  });\n  Object.defineProperty(this, 'appData', {\n    get: function () {\n      return appData;\n    },\n    set: function (value) {\n      appData = value;\n    }\n  }); // this.getArchive = function() { return archive; };\n}\nvar st = new appState();\nvar mapPath = \"dist/assets/schinoussa.geojson\";\nvar zones = [{\n  title: \"Plaine de la politique\",\n  location: {\n    latitude: 36.8675,\n    longitude: 25.5300\n  }\n}, {\n  title: \"Marais du sexy\",\n  location: {\n    latitude: 36.8811,\n    longitude: 25.5327\n  }\n}, {\n  title: \"Baie de l'intime\",\n  location: {\n    latitude: 36.8545,\n    longitude: 25.5336\n  }\n}, {\n  title: \"Forêt du nécessaire\",\n  location: {\n    latitude: 36.8765,\n    longitude: 25.5173\n  }\n}];\nvar width = screen.availWidth;\nvar height = screen.availHeight;\nvar projection = d3.geo.mercator().scale(485035.40798408084).translate([-214842.9723933363, 336774.3379795616]);\nvar path = d3.geo.path().projection(projection);\nvar svg = d3.select(\"body\").append(\"svg\").attr(\"width\", width).attr(\"height\", height);\nvar g = svg.append(\"g\"); // export var content = \"\";\n\n//# sourceURL=webpack:///./client/js/vars.js?");

/***/ }),

/***/ "./client/js/zoom.js":
/*!***************************!*\
  !*** ./client/js/zoom.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return zoomed; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./client/js/vars.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./client/js/utils.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draw */ \"./client/js/draw.js\");\n\n\n\n\nvar st = new _vars__WEBPACK_IMPORTED_MODULE_0__[\"default\"](); /////////////////////////////////////////////////////\n// Fonction qui gère l'affichage lors des zooms\n/////////////////////////////////////////////////////\n\nfunction zoomed() {\n  // console.log(\"zoom\");\n  var t = d3.event.translate;\n  var s = d3.event.scale;\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].translate(t).scale(s); // transforme les pays\n\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\"path\").attr(\"d\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"path\"]); // transforme les points au zoom et translate\n\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".card\").attr(\"transform\", function (d) {\n    var proj = _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]); // La hauteur dynamique du contenant (.inner-card)\n\n    var rectHeight = _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").node().getBoundingClientRect().height;\n    return \"translate(\" + (proj[0] - 340 / 2) + \", \" + (proj[1] - rectHeight / 2) + \")\";\n  });\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  }).selectAll(\"text\").attr(\"font-size\", Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(s, 50000, 1536308, 12, 24) + \"px\"); // vars.g.selectAll(\".point\").attr(\"transform\", function(d) {\n  // \treturn \"translate(\" + vars.projection([\n  // \t    d.location.longitude,\n  // \t    d.location.latitude\n  // \t]) + \")\";\n  // })\n\n  st.scaleFac = s;\n  console.log(st.scaleFac);\n  Object(_draw__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(s);\n}\n\n//# sourceURL=webpack:///./client/js/zoom.js?");

/***/ })

/******/ });