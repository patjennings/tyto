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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app/index.js");
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return create; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n\nconsole.log(_vars__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction create(currentPosition){\n    var long = currentPosition[1];\n    var lat = currentPosition[0];\n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"isCreating\"] = true;\n\n    // create layer w/ input + save button\n    var proj = projection([\n\tlat,\n\tlong\n    ])\n    var content = \"\";\n    \n    var elements = \"<div id='input-container' style='transform: translate(\"+proj[0]+\"px, \"+proj[1]+\"px);'><input id='content-title' placeholder='Titre'></input><textarea id='content-content' rows='6' placeholder='Contenu'>\"+content+\"</textarea><input id='content-position-long' type='hidden' value='\"+long+\"'/><input id='content-position-lat' type='hidden' value='\"+lat+\"'/><div class='btn-container'><button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button><button value='cancel' class='btn' id='document-cancel'>Annuler</button></div></div>\";\n    \n    $(\".map\").append(elements);\n    save();\n    \n    // save/create file\n}\n\n\nfunction save(){\n    var btnValidate = document.getElementById(\"document-validate\");\n    var btnCancel = document.getElementById(\"document-cancel\");\n    \n    btnValidate.addEventListener('click', function() {\n\tconsole.log(\"save file\");\n\n\tvar titleValue = document.getElementById(\"content-title\").value;\n\tvar longValue = document.getElementById(\"content-position-long\").value;\n\tvar latValue = document.getElementById(\"content-position-lat\").value;\n\tvar contentValue = document.getElementById(\"content-content\").value;\n\tvar contentFormatted = \"title: \"+titleValue+\"\\nposition: \"+longValue+\", \"+latValue+\"\\n\\n---\\n\"+contentValue; // le title intégré dans la desc du markdown\n\t\n\trequest(\"POST\", \"includes/saveMarkdownDocument.php\", \"title=\"+titleValue+\"&content=\"+contentFormatted, requestCallback);\n    }, false);\n    \n    btnCancel.addEventListener('click', function() {\n\tvar elem = document.getElementById(\"input-container\");\n\telem.parentNode.removeChild(elem);\n\t_vars__WEBPACK_IMPORTED_MODULE_0__[\"isCreating\"] = false;\n\t// console.log(this);\n    }, false);\n}\n\n\n//# sourceURL=webpack:///./js/app/create.js?");

/***/ }),

/***/ "./js/app/index.js":
/*!*************************!*\
  !*** ./js/app/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create */ \"./js/app/create.js\");\n/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zoom.js */ \"./js/app/zoom.js\");\nvar content;\n// var isCreating = false;\n// var ctrlPushed = false;\n\n\n\n\n\n_vars__WEBPACK_IMPORTED_MODULE_0__[\"isCreating\"] = false;\n_vars__WEBPACK_IMPORTED_MODULE_0__[\"ctrlPushed\"] = false;\n\nconsole.log(_vars__WEBPACK_IMPORTED_MODULE_0__);\n\n(function(window){\n    \n    // Data\n    function reqListener () {\n\tconsole.log(this.responseText);\n    }\n\n    var oReq = new XMLHttpRequest(); //New request object\n    oReq.onload = function() {\n        // console.log(JSON.parse(this.responseText));\n\tcontent = JSON.parse(this.responseText);\n\n\tapp();\n\t\n\t// reqListener();\n    };\n    oReq.open(\"get\", \"list-content.php\", true);\n\n    oReq.send();\n    // reqListener();\n\n    \n})(window);\n\nfunction app(){\n  \n    \n    var svg = d3.select(\"body\").append(\"svg\")\n\t.attr(\"width\", width)\n\t.attr(\"height\", height)\n\t.on('mousemove', function() {\n\t    // console.log( d3.mouse(this) ) // log the mouse x,y position\n\t    // console.log()\n\t    currentPosition = projection.invert(d3.mouse(this));\n\t    displayInformations(d3.event.scale)\n\t})\n\t.on('click', function() {\n\t    currentPosition = projection.invert(d3.mouse(this));\n\n\t    if(_vars__WEBPACK_IMPORTED_MODULE_0__[\"isCreating\"] == false && _vars__WEBPACK_IMPORTED_MODULE_0__[\"ctrlPushed\"] == true){ // si on peut créer un doc ET que la touche ctrl est enfoncée\n\t\tconsole.log(\"créer l'article\");\n\t\tObject(_create__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(currentPosition);\n\t    }\n\t});\n\n    // Ctrl key listener, pour utiliser avec le click lors de la création de documents\n    window.addEventListener('keydown', (event) => {\n\tif(event.ctrlKey) {\n\t    _vars__WEBPACK_IMPORTED_MODULE_0__[\"ctrlPushed\"] = true;\n\t    console.log(\"ctrl enfoncé\");\n\t}\n    }, false);\n    \n    window.addEventListener('keyup', (event) => {\n\t\n\t_vars__WEBPACK_IMPORTED_MODULE_0__[\"ctrlPushed\"] = false;\n\tconsole.log(\"toutes les touches relachées\");\n\t\n    }, false);\n\n    var g = svg.append(\"g\")\n\t.call(_zoom_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n    g.append(\"rect\")\n\t.attr(\"class\", \"background\")\n\t.attr(\"width\", width)\n\t.attr(\"height\", height);\n\n    // listener pour copier les coordonnées\n    window.addEventListener('keydown', (event) => {\n\tconst nomTouche = event.key;\n\n\tconsole.log(\"touche pressée !\");\n\n\tif (nomTouche === 'c') {\n\t    // Pas d'alerte si seule la touche Control est pressée.\n\t    copyTextToClipboard(currentPosition[1].toFixed(4)+\", \"+currentPosition[0].toFixed(4));\n\t}\n\tif (nomTouche === 't') {\n\t    // Pas d'alerte si seule la touche Control est pressée.\n\t    console.log(\"create it\");\n\t}\n    }, false);\n\n    function displayInformations(zoom){\n\n\tinfos = document.getElementById(\"position\");\n\tinfos.value = currentPosition[1].toFixed(4)+\", \"+currentPosition[0].toFixed(4);\n\n    }\n\n    // createDocument();\n    // saveDocument();\n\n    //////////////////////\n    // Afficher la carte\n    ////////////////////////\n\n    d3.json(mapPath, function(error, json) {\n    \tif (error) throw error;\n\n\t// console.log(json.features[1].geometry.type);\n\t\n    \tg.append(\"g\")\n    \t    .attr(\"id\", \"states\")\n    \t    .selectAll(\"path\")\n    \t    .data(json.features)\n    \t    .enter().append(\"path\")\n    \t    .attr(\"d\", path)\n\t    .attr(\"id\", function(d,i){ return i})\n\t    .style(\"stroke\", \"#999999\")\n\t    .style(\"fill\", \"rgba(255,255,255,0.5)\");\n    \t// .on(\"click\", clicked);\n\n    \t// On lance les fonctions une fois que la carte est chargée et affichée\n    \tcreateArticles(); // création des articles\n    \tcreateZones(); // création des titres de zones\n\t// createPoints(); // affiche les points et permet de vérifier le centrage des cartes.\n    });\n\n    /////////////////////////\n    // Ajouter les articles\n    //////////////////////////\n    \n    function createArticles(){\n\t\n\tg.append(\"g\")\n\t    .attr(\"id\", \"articles\")\n\t    .selectAll(\"rect\")\n\t    .data(content)\n\t    .enter().append(\"g\")\n\t    .attr(\"class\", \"card\")\n\t    .append(\"rect\")\n\t    .attr(\"width\", 96)\n\t    .attr(\"height\", 128)\n\t    .attr(\"fill\", \"#FFFFFF\")\n\t    .attr(\"opacity\", \"0\")\n\t\n\tg.selectAll(\".card\")\n\t    .attr(\"transform\", function(d) {\n\t\tvar proj = projection([\n\t\t    d.location.longitude,\n\t\t    d.location.latitude\n\t\t])\n\t\t\n\t\t// La hauteur dynamique du contenant (.inner-card)\n\t\tvar rectHeight = g.selectAll(\".card\").node().getBoundingClientRect().height\n\n\t\t// console.log(rectHeight);\n\t\t\n\t\treturn \"translate(\" + (proj[0]-(340/2)) +\", \"+(proj[1]-(rectHeight/2))+ \")\";\n\t    })\n\t    .append(\"svg:foreignObject\")\n\t    .attr(\"width\", 340)\n\t    .attr(\"height\", 800)\n\t    .append(\"xhtml:body\")\n \t    .attr(\"class\", \"inner-card\")\n\t    .html(function(d) { return \"<div class='title'><p>\"+d.title+\"</p>\"; })\n\t    .append(\"div\")\n\t    .attr(\"class\", \"content\")\n\n\tdrawContent();\n    }\n\n    /////////////////////////\n    // Ajouter les points\n    /////////////////////////\n    \n    function createPoints(){\n\t\n\t\n\tg.append(\"g\")\n\t    .attr(\"id\", \"points\")\n\t    .selectAll(\"text\")\n\t    .data(content)\n\t    .enter().append(\"circle\")\n\t    .attr(\"class\", \"point\")\n\t    .attr(\"r\", 5)\n\t    .style(\"stroke\", \"#333333\")\n\t    .style(\"fill\", \"#FFFFFF\");\n\n\tg.selectAll(\".point\")\n\t    .attr(\"transform\", function(d) {\n\t\treturn \"translate(\" + projection([\n\t\t    d.location.longitude,\n\t\t    d.location.latitude\n\t\t]) + \")\";\n\t    })\t\n    }\n\n    \n    /////////////////////////\n    // Ajouter les zones\n    /////////////////////////\n    \n    function createZones(){\n\t\n\t\n\tg.append(\"g\")\n\t    .attr(\"id\", \"zones\")\n\t    .selectAll(\"text\")\n\t    .data(zones)\n\t    .enter().append(\"g\")\n\t    .attr(\"class\", \"zone\")\n\t    .append(\"text\")\n\t    .attr(\"font-family\", \"Liberation Mono\")\n\t    .attr(\"font-size\", \"16px\")\n\t    .attr(\"text-anchor\", \"middle\")\n\t    .text(function(d){ return d.title})\n\n\tg.selectAll(\".zone\")\n\t    .attr(\"transform\", function(d) {\n\t\treturn \"translate(\" + projection([\n\t\t    d.location.longitude,\n\t\t    d.location.latitude\n\t\t]) + \")\";\n\t    })\t\n    }\n\n    //////////////////////////////////////////////////\n    // affiche le contenu relatif au niveau de zooms\n    //////////////////////////////////////////////////\n    \n    function drawContent(){\n\n\t// adapter l'opacité au niveau de zoom\n\tg.selectAll(\".inner-card\")\n\t    .attr(\"style\", \"opacity:\"+scale(scaleFac, 1070, 10000, 0.15, 1)+\";\")\n\t\n\tif(scaleFac < 1300000){\n\t    g.selectAll(\".inner-card\")\n\t\t.attr(\"class\", \"inner-card sky\")\n\t    g.selectAll(\".content\")\n\t\t.html(function(d) { return \"<p></p>\"; });\n\t}\n\telse if(scaleFac >= 1300000 && scaleFac < 5000000){\n\t    g.selectAll(\".inner-card\")\n\t\t.attr(\"class\", \"inner-card top\")\n\t    g.selectAll(\".content\")\n\t\t.html(function(d) { return \"<p>\"+d.content.top+\"</p><a href='article.php?path=\"+d.path+\"'>Full article</a>\"; });\n\t}\n\telse if(scaleFac >= 5000000 && scaleFac < 26000000){\n\t    g.selectAll(\".inner-card\")\n\t\t.attr(\"class\", \"inner-card middle\")\n\t    g.selectAll(\".content\")\n\t\t.html(function(d) { return \"<p>\"+d.content.middle+\"</p><a href='article.php?path=\"+d.path+\"'>Full article</a>\"; });\n\t}\n\telse if(scaleFac >= 26000000){\n\t    g.selectAll(\".inner-card\")\n\t\t.attr(\"class\", \"inner-card low\")\n\t    g.selectAll(\".content\")\n\t\t.html(function(d) { return \"<p>\"+d.content.low+\"</p><a href='article.php?path=\"+d.path+\"'>Full article</a>\"; });\n\t}\n\n\n\tvar elem = g.selectAll(\".inner-card\");\n\t// console.log(elem.node().getBoundingClientRect());\n\t// console.log(selection.node().getBbox())\n\n    }\n\n    function fallbackCopyTextToClipboard(text) {\n\tvar textArea = document.createElement(\"textarea\");\n\ttextArea.value = text;\n\tdocument.body.appendChild(textArea);\n\ttextArea.focus();\n\ttextArea.select();\n\n\ttry {\n\t    var successful = document.execCommand('copy');\n\t    var msg = successful ? 'successful' : 'unsuccessful';\n\t    console.log('Fallback: Copying text command was ' + msg);\n\t} catch (err) {\n\t    console.error('Fallback: Oops, unable to copy', err);\n\t}\n\n\tdocument.body.removeChild(textArea);\n    }\n\n    function copyTextToClipboard(text) {\n\tif (!navigator.clipboard) {\n\t    fallbackCopyTextToClipboard(text);\n\t    return;\n\t}\n\tnavigator.clipboard.writeText(text).then(function() {\n\t    console.log('Async: Copying to clipboard was successful!');\n\t}, function(err) {\n\t    console.error('Async: Could not copy text: ', err);\n\t});\n    }\n}\n\n\n// AJAX requests\nfunction getRequestObject(){\n    var o = null;\n    if(window.XMLHttpRequest){\n        o = new XMLHttpRequest();\n    }else if(window.ActiveXObject){\n        try{\n            o = new ActiveXObject('Msxml2.XMLHTTP');\n        }catch(e1){\n            try{\n                o = new ActiveXObject('Microsoft.XMLHTTP');\n            }catch(e2){\n\n            }\n        }\n    }\n    return o;\n}\n\nfunction request(method, uri, sendData, callback){\n    var o = getRequestObject();\n    var async = (callback!==null);\n    var timestamp = new Date();\n    var uniqueURI = uri+ (uri.indexOf(\"?\") > 0 ? \"&\" : \"?\")+ \"timestamp=\"+ timestamp.getTime();\n    \n    if(method === 'GET'){\n        if(sendData!=null){uniqueURI+=\"?\"+sendData;}\n        o.open(method, uniqueURI, async);\n        o.send(null);\n    }else if(method === 'POST'){\n        o.open(method, uniqueURI, async);\n        o.setRequestHeader('Content-Type' , 'application/x-www-form-urlencoded');\n        o.send(sendData);\n    }\n    if(async){\n        o.onreadystatechange = function (){\n            if(o.readyState==4&&o.status==200){\n                callback(o.responseText);\n                // console.log(\"Success\");\n\n            }else if(o.readyState==4&&o.status!=200){\n                // console.log(\"Error\")\n            }\n        };\n    }\n    if(async){return ;}\n    else{return o.responseText;}\n}\n\nfunction requestCallback(text){\n    // on relance app(), et on recharge tout\n    app();\n}\n\n\n\n//# sourceURL=webpack:///./js/app/index.js?");

/***/ }),

/***/ "./js/app/vars.js":
/*!************************!*\
  !*** ./js/app/vars.js ***!
  \************************/
/*! exports provided: isCreating, ctrlPushed, mapPath, zones, scaleFac, width, height, projection, currentPosition, path, zoom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isCreating\", function() { return isCreating; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ctrlPushed\", function() { return ctrlPushed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapPath\", function() { return mapPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"zones\", function() { return zones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scaleFac\", function() { return scaleFac; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"width\", function() { return width; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"height\", function() { return height; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projection\", function() { return projection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"currentPosition\", function() { return currentPosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"path\", function() { return path; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"zoom\", function() { return zoom; });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./js/app/zoom.js\");\nvar isCreating = null;\nvar ctrlPushed = null;\n\n\n\nvar mapPath = \"assets/schinoussa.geojson\";\nvar zones = [\n    {\n\ttitle: \"Plaine de la politique\",\n\tlocation: {\n            latitude: 36.8675,\n            longitude: 25.5300\n        }\n    },\n    {\n\ttitle: \"Marais du sexy\",\n\tlocation: {\n            latitude: 36.8811,\n            longitude: 25.5327\n        }\n    },\n    {\n\ttitle: \"Baie de l'intime\",\n\tlocation: {\n            latitude: 36.8545,\n            longitude: 25.5336\n        }\n    },\n    {\n\ttitle: \"Forêt du nécessaire\",\n\tlocation: {\n            latitude: 36.8765,\n            longitude: 25.5173\n        }\n    }\n];\n\nvar scaleFac = 40000.503614997007;\n\nconst scale = (num, in_min, in_max, out_min, out_max) => { // this is the map() function from processing\n    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\nvar width = screen.availWidth,\nheight = screen.availHeight;\n\nvar projection = d3.geo.mercator()\n    .scale(485035.40798408084)\n    .translate([ -214842.9723933363,336774.3379795616]);\n\nvar currentPosition = [0, 0];\n\nvar path = d3.geo.path()\n    .projection(projection); \n\n\nvar zoom = d3.behavior.zoom()\n    .translate(projection.translate())\n    .scale(projection.scale())\n    .on(\"zoom\", _zoom__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack:///./js/app/vars.js?");

/***/ }),

/***/ "./js/app/zoom.js":
/*!************************!*\
  !*** ./js/app/zoom.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return zoomed; });\n/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vars */ \"./js/app/vars.js\");\n\n\n/////////////////////////////////////////////////////\n// Fonction qui gère l'affichage lors des zooms\n/////////////////////////////////////////////////////\n\nfunction zoomed() {\n\n    var t = d3.event.translate;\n    var s = d3.event.scale; \n    _vars__WEBPACK_IMPORTED_MODULE_0__[\"projection\"].translate(t).scale(s);\n\n    // transforme les pays\n    g.selectAll(\"path\").attr(\"d\", path);\n\n    // var elem = g.selectAll(\".card\").text(\"toto\");\n\n    // console.log(d);\n    \n    // transforme les points au zoom et translate\n    g.selectAll(\".card\").attr(\"transform\", function(d) {\n\tvar proj = projection([\n\t    d.location.longitude,\n\t    d.location.latitude\n\t])\n\tvar rectHeight = g.selectAll(\".inner-card\").node().getBoundingClientRect().height // La hauteur dynamique du contenant (.inner-card)\n\n\tconsole.log(rectHeight);\n\t\n\treturn \"translate(\" + (proj[0]-(340/2)) +\", \"+(proj[1]-(rectHeight/2))+ \")\";\n    })\n    g.selectAll(\".zone\").attr(\"transform\", function(d) {\n\treturn \"translate(\" + projection([\n\t    d.location.longitude,\n\t    d.location.latitude\n\t]) + \")\";\n    })\n\t.selectAll(\"text\")\n\t.attr(\"font-size\", scale(s, 50000, 1536308, 12, 24)+\"px\");\n\n    g.selectAll(\".point\").attr(\"transform\", function(d) {\n\treturn \"translate(\" + projection([\n\t    d.location.longitude,\n\t    d.location.latitude\n\t]) + \")\";\n    })\n\n    scaleFac = s;\n    \n    drawContent();\n}\n\n\n//# sourceURL=webpack:///./js/app/zoom.js?");

/***/ })

/******/ });