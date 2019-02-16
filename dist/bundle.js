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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app/init.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app/create.js":
/*!**************************!*\
  !*** ./js/app/create.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return create; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n\nlet isCreating = null;\nfunction create(currentPosition) {\n  var long = currentPosition[1];\n  var lat = currentPosition[0];\n  isCreating = true; // create layer w/ input + save button\n\n  var proj = projection([lat, long]);\n  var content = \"\";\n  var elements = \"<div id='input-container' style='transform: translate(\" + proj[0] + \"px, \" + proj[1] + \"px);'><input id='content-title' placeholder='Titre'></input><textarea id='content-content' rows='6' placeholder='Contenu'>\" + content + \"</textarea><input id='content-position-long' type='hidden' value='\" + long + \"'/><input id='content-position-lat' type='hidden' value='\" + lat + \"'/><div class='btn-container'><button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button><button value='cancel' class='btn' id='document-cancel'>Annuler</button></div></div>\";\n  $(\".map\").append(elements);\n  save(); // save/create file\n}\n\nfunction save() {\n  var btnValidate = document.getElementById(\"document-validate\");\n  var btnCancel = document.getElementById(\"document-cancel\");\n  btnValidate.addEventListener('click', function () {\n    console.log(\"save file\");\n    var titleValue = document.getElementById(\"content-title\").value;\n    var longValue = document.getElementById(\"content-position-long\").value;\n    var latValue = document.getElementById(\"content-position-lat\").value;\n    var contentValue = document.getElementById(\"content-content\").value;\n    var contentFormatted = \"title: \" + titleValue + \"\\nposition: \" + longValue + \", \" + latValue + \"\\n\\n---\\n\" + contentValue; // le title intégré dans la desc du markdown\n\n    request(\"POST\", \"includes/saveMarkdownDocument.php\", \"title=\" + titleValue + \"&content=\" + contentFormatted, requestCallback);\n  }, false);\n  btnCancel.addEventListener('click', function () {\n    var elem = document.getElementById(\"input-container\");\n    elem.parentNode.removeChild(elem);\n    isCreating = false; // console.log(this);\n  }, false);\n}\n\n//# sourceURL=webpack:///./js/app/create.js?");

/***/ }),

/***/ "./js/app/createArticles.js":
/*!**********************************!*\
  !*** ./js/app/createArticles.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createArticles; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw */ \"./js/app/draw.js\");\n\n /////////////////////////\n// Ajouter les articles\n//////////////////////////\n\nfunction createArticles(content) {\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"g\").attr(\"id\", \"articles\").selectAll(\"rect\").data(content).enter().append(\"g\").attr(\"class\", \"card\").append(\"rect\").attr(\"width\", 96).attr(\"height\", 128).attr(\"fill\", \"#FFFFFF\").attr(\"opacity\", \"0\");\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".card\").attr(\"transform\", function (d) {\n    var proj = _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]); // La hauteur dynamique du contenant (.inner-card)\n\n    var rectHeight = _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".card\").node().getBoundingClientRect().height;\n    return \"translate(\" + (proj[0] - 340 / 2) + \", \" + (proj[1] - rectHeight / 2) + \")\";\n  }).append(\"svg:foreignObject\").attr(\"width\", 340).attr(\"height\", 800).append(\"xhtml:body\").attr(\"class\", \"inner-card\").html(function (d) {\n    return \"<div class='title'><p>\" + d.title + \"</p>\";\n  }).append(\"div\").attr(\"class\", \"content\");\n  Object(_draw__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n}\n\n//# sourceURL=webpack:///./js/app/createArticles.js?");

/***/ }),

/***/ "./js/app/createPoints.js":
/*!********************************!*\
  !*** ./js/app/createPoints.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createPoints; });\n/////////////////////////\n// Ajouter les points\n/////////////////////////\nfunction createPoints() {\n  vars.g.append(\"g\").attr(\"id\", \"points\").selectAll(\"text\").data(vars.content).enter().append(\"circle\").attr(\"class\", \"point\").attr(\"r\", 5).style(\"stroke\", \"#333333\").style(\"fill\", \"#FFFFFF\");\n  vars.g.selectAll(\".point\").attr(\"transform\", function (d) {\n    return \"translate(\" + projection([d.location.longitude, d.location.latitude]) + \")\";\n  });\n}\n\n//# sourceURL=webpack:///./js/app/createPoints.js?");

/***/ }),

/***/ "./js/app/createZones.js":
/*!*******************************!*\
  !*** ./js/app/createZones.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createZones; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n /////////////////////////\n// Ajouter les zones\n/////////////////////////\n\nfunction createZones(content) {\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"g\").attr(\"id\", \"zones\").selectAll(\"text\").data(_vars__WEBPACK_IMPORTED_MODULE_0__[\"zones\"]).enter().append(\"g\").attr(\"class\", \"zone\").append(\"text\").attr(\"font-family\", \"Liberation Mono\").attr(\"font-size\", \"16px\").attr(\"text-anchor\", \"middle\").text(function (d) {\n    return d.title;\n  });\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  });\n} ///////\n\n//# sourceURL=webpack:///./js/app/createZones.js?");

/***/ }),

/***/ "./js/app/draw.js":
/*!************************!*\
  !*** ./js/app/draw.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return draw; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./js/app/utils.js\");\n\n ///////////////////////////////////////////\n// affiche le contenu relatif au niveau de zooms\n//////////////////////////////////////////////////\n\nfunction draw() {\n  // adapter l'opacité au niveau de zoom\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"style\", \"opacity:\" + Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_vars__WEBPACK_IMPORTED_MODULE_0__[\"scaleFac\"], 1070, 10000, 0.15, 1) + \";\");\n\n  if (_vars__WEBPACK_IMPORTED_MODULE_0__[\"scaleFac\"] < 1300000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card sky\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p></p>\";\n    });\n  } else if (_vars__WEBPACK_IMPORTED_MODULE_0__[\"scaleFac\"] >= 1300000 && _vars__WEBPACK_IMPORTED_MODULE_0__[\"scaleFac\"] < 5000000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card top\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p>\" + d.content.top + \"</p><a href='article.php?path=\" + d.path + \"'>Full article</a>\";\n    });\n  } else if (_vars__WEBPACK_IMPORTED_MODULE_0__[\"scaleFac\"] >= 5000000 && _vars__WEBPACK_IMPORTED_MODULE_0__[\"scaleFac\"] < 26000000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card middle\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p>\" + d.content.middle + \"</p><a href='article.php?path=\" + d.path + \"'>Full article</a>\";\n    });\n  } else if (_vars__WEBPACK_IMPORTED_MODULE_0__[\"scaleFac\"] >= 26000000) {\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").attr(\"class\", \"inner-card low\");\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".content\").html(function (d) {\n      return \"<p>\" + d.content.low + \"</p><a href='article.php?path=\" + d.path + \"'>Full article</a>\";\n    });\n  }\n\n  var elem = _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\");\n}\n\n//# sourceURL=webpack:///./js/app/draw.js?");

/***/ }),

/***/ "./js/app/init.js":
/*!************************!*\
  !*** ./js/app/init.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create */ \"./js/app/create.js\");\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zoom */ \"./js/app/zoom.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./js/app/utils.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./draw */ \"./js/app/draw.js\");\n/* harmony import */ var _createArticles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createArticles */ \"./js/app/createArticles.js\");\n/* harmony import */ var _createZones__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createZones */ \"./js/app/createZones.js\");\n/* harmony import */ var _createPoints__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createPoints */ \"./js/app/createPoints.js\");\n\n\n\n\n\n\n\n\n // vars.isCreating = false;\n\nlet content = null;\n\n(function (window) {\n  // Data\n  function reqListener() {// console.log(this.responseText);\n  }\n\n  var oReq = new XMLHttpRequest(); //New request object\n\n  oReq.onload = function () {\n    // console.log(JSON.parse(this.responseText));\n    content = JSON.parse(this.responseText);\n    app(content); // reqListener();\n  };\n\n  oReq.open(\"get\", \"list-content.php\", true);\n  oReq.send(); // reqListener();\n})(window);\n\nfunction app(content) {\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"rect\").attr(\"class\", \"background\").attr(\"width\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"width\"]).attr(\"height\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"height\"]); // function displayInformations(zoom){\n  // \tinfos = document.getElementById(\"position\");\n  // \tinfos.value = vars.currentPosition[1].toFixed(4)+\", \"+vars.currentPosition[0].toFixed(4);\n  // }\n  //////////////////////\n  // Afficher la carte\n  ////////////////////////\n\n  d3.json(_vars__WEBPACK_IMPORTED_MODULE_0__[\"mapPath\"], function (error, json) {\n    if (error) throw error; // console.log(json.features[1].geometry.type);\n\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].append(\"g\").attr(\"id\", \"states\").selectAll(\"path\").data(json.features).enter().append(\"path\").attr(\"d\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"path\"]).attr(\"id\", function (d, i) {\n      return i;\n    }).style(\"stroke\", \"#999999\").style(\"fill\", \"rgba(255,255,255,0.5)\"); // .on(\"click\", clicked);\n    // On lance les fonctions une fois que la carte est chargée et affichée\n\n    Object(_createArticles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(content); // création des articles\n\n    Object(_createZones__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(content); // création des titres de zones\n    // createPoints(); // affiche les points et permet de vérifier le centrage des cartes.\n  });\n}\n\nfunction requestCallback(text) {\n  // on relance app(), et on recharge tout\n  app();\n}\n\n//# sourceURL=webpack:///./js/app/init.js?");

/***/ }),

/***/ "./js/app/utils.js":
/*!*************************!*\
  !*** ./js/app/utils.js ***!
  \*************************/
/*! exports provided: copyTextToClipboard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"copyTextToClipboard\", function() { return copyTextToClipboard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return scale; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n\n\nfunction fallbackCopyTextToClipboard(text) {\n  var textArea = document.createElement(\"textarea\");\n  textArea.value = text;\n  document.body.appendChild(textArea);\n  textArea.focus();\n  textArea.select();\n\n  try {\n    var successful = document.execCommand('copy');\n    var msg = successful ? 'successful' : 'unsuccessful';\n    console.log('Fallback: Copying text command was ' + msg);\n  } catch (err) {\n    console.error('Fallback: Oops, unable to copy', err);\n  }\n\n  document.body.removeChild(textArea);\n}\n\nfunction copyTextToClipboard(text) {\n  if (!navigator.clipboard) {\n    fallbackCopyTextToClipboard(text);\n    return;\n  }\n\n  navigator.clipboard.writeText(text).then(function () {\n    console.log('Async: Copying to clipboard was successful!');\n  }, function (err) {\n    console.error('Async: Could not copy text: ', err);\n  });\n} // this is the map() function from processing\n\nfunction scale(num, in_min, in_max, out_min, out_max) {\n  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\n//# sourceURL=webpack:///./js/app/utils.js?");

/***/ }),

/***/ "./js/app/vars.js":
/*!************************!*\
  !*** ./js/app/vars.js ***!
  \************************/
/*! exports provided: isCreating, scaleFac, currentPosition, mapPath, zones, width, height, projection, path, zoom, svg, g */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isCreating\", function() { return isCreating; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scaleFac\", function() { return scaleFac; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"currentPosition\", function() { return currentPosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapPath\", function() { return mapPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"zones\", function() { return zones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"width\", function() { return width; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"height\", function() { return height; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projection\", function() { return projection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"path\", function() { return path; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"zoom\", function() { return zoom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"svg\", function() { return svg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"g\", function() { return g; });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./js/app/zoom.js\");\nlet isCreating = null; // doit être modifié\n\nlet scaleFac = 40000.503614997007; // doit être modifié\n\nlet currentPosition = [0, 0]; // doit être modifié\n\n\nvar mapPath = \"assets/schinoussa.geojson\";\nvar zones = [{\n  title: \"Plaine de la politique\",\n  location: {\n    latitude: 36.8675,\n    longitude: 25.5300\n  }\n}, {\n  title: \"Marais du sexy\",\n  location: {\n    latitude: 36.8811,\n    longitude: 25.5327\n  }\n}, {\n  title: \"Baie de l'intime\",\n  location: {\n    latitude: 36.8545,\n    longitude: 25.5336\n  }\n}, {\n  title: \"Forêt du nécessaire\",\n  location: {\n    latitude: 36.8765,\n    longitude: 25.5173\n  }\n}];\nvar width = screen.availWidth;\nvar height = screen.availHeight;\nvar projection = d3.geo.mercator().scale(485035.40798408084).translate([-214842.9723933363, 336774.3379795616]);\nvar path = d3.geo.path().projection(projection);\nvar zoom = d3.behavior.zoom().translate(projection.translate()).scale(projection.scale()).on(\"zoom\", _zoom__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar svg = d3.select(\"body\").append(\"svg\").attr(\"width\", width).attr(\"height\", height).on('mousemove', function () {\n  currentPosition = projection.invert(d3.mouse(this)); // displayInformations(d3.event.scale)\n}).on('click', function () {\n  currentPosition = projection.invert(d3.mouse(this));\n  create(currentPosition);\n  /*\n  if(vars.isCreating == false && vars.ctrlPushed == true){ // si on peut créer un doc ET que la touche ctrl est enfoncée\n      console.log(\"créer l'article\");\n      create(currentPosition);\n  }*/\n});\nvar g = svg.append(\"g\").call(zoom); // export var content = \"\";\n\n//# sourceURL=webpack:///./js/app/vars.js?");

/***/ }),

/***/ "./js/app/zoom.js":
/*!************************!*\
  !*** ./js/app/zoom.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return zoomed; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw */ \"./js/app/draw.js\");\n\n /////////////////////////////////////////////////////\n// Fonction qui gère l'affichage lors des zooms\n/////////////////////////////////////////////////////\n\nfunction zoomed() {\n  var t = d3.event.translate;\n  var s = d3.event.scale;\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].translate(t).scale(s); // transforme les pays\n\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\"path\").attr(\"d\", _vars__WEBPACK_IMPORTED_MODULE_0__[\"path\"]); // var elem = g.selectAll(\".card\").text(\"toto\");\n  // console.log(d);\n  // transforme les points au zoom et translate\n\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".card\").attr(\"transform\", function (d) {\n    var proj = _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]);\n    var rectHeight = _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".inner-card\").node().getBoundingClientRect().height; // La hauteur dynamique du contenant (.inner-card)\n\n    console.log(rectHeight);\n    return \"translate(\" + (proj[0] - 340 / 2) + \", \" + (proj[1] - rectHeight / 2) + \")\";\n  });\n  _vars__WEBPACK_IMPORTED_MODULE_0__[\"g\"].selectAll(\".zone\").attr(\"transform\", function (d) {\n    return \"translate(\" + _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"]([d.location.longitude, d.location.latitude]) + \")\";\n  }).selectAll(\"text\").attr(\"font-size\", scale(s, 50000, 1536308, 12, 24) + \"px\"); // vars.g.selectAll(\".point\").attr(\"transform\", function(d) {\n  // \treturn \"translate(\" + vars.projection([\n  // \t    d.location.longitude,\n  // \t    d.location.latitude\n  // \t]) + \")\";\n  // })\n\n  scaleFac = s;\n  Object(_draw__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n}\n\n//# sourceURL=webpack:///./js/app/zoom.js?");

/***/ })

/******/ });