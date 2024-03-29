// import mapScale from "./utils/mapScale";
// import {paths} from "./conf/conf";
import Config from "Config";

// toutes ces variables sont modifiées dans init.js, via l'objet appState()
let user = null;
let space = null;
let spaceIndex = null; // default, le premier space dans la bdd
let isCreating = null; // on est en train de créer un article // false
let isStyling = null;
let isDragging = null; // false
let selectedArticle = null; // l'id de l'article sélectionné
let scaleFac = null; // doit être modifié //40000.503614997007
let currentPosition = null;      // doit être modifié //[0, 0]
let spacesData = null; // doit être modifié avec le nouveau contenu chargé du json
let mapData = null;
let postsData = null;      
let zonesData = null;
let firstStart = true;
let rootDir = Config.app.url;
let isCtrlKeyPushed = false;
let isAltKeyPushed = false;
let steps = [
    {
	name: "galaxy",
	level: 0
    },
    {
	name: "sky",
	level: 13
    },
    {
	name: "bird",
	level: 50
    },
    {
	name: "ground",
	level: 260
    }
];


// const postsDir = rootDir+"dist/content/";

// export var mapDataPath = "dist/assets/maps/map-1.geojson";

var st = new appState();
export var width = screen.availWidth;
export var height = screen.availHeight;
export var projection = d3.geo.mercator().scale(485035).translate([ -215431, 336666]);
export var pathProjection = d3.geo.path().projection(projection);
export var cardsWidth = 340;


// cette fonction contient modifie les états de l'application, avec des getters et des setters
// pour pouvoir vivre tout au long du déroulement
// s'applique sur les trois variables déclarées au dessus
export default function appState() {    
    Object.defineProperty(this, 'space', {
	get: function() {
	    return space;
	},
	set: function(value) {
	    space = value;
	}
    });
    Object.defineProperty(this, 'spaceIndex', {
	get: function() {
	    return spaceIndex;
	},
	set: function(value) {
	    spaceIndex = value;
	}
    });
    Object.defineProperty(this, 'user', {
	get: function() {
	    return user;
	},
	set: function(value) {
	    if(value == ""){
		value = null;
	    }
	    user = value;
	}
    });
    Object.defineProperty(this, 'isCreating', {
	get: function() {
	    return isCreating;
	},
	set: function(value) {
	    isCreating = value;
	}
    });
    Object.defineProperty(this, 'isStyling', {
	get: function() {
	    return isStyling;
	},
	set: function(value) {
	    isStyling = value;
	}
    });
    Object.defineProperty(this, 'isDragging', {
	get: function() {
	    return isDragging;
	},
	set: function(value) {
	    isDragging = value;
	}
    });
    Object.defineProperty(this, 'selectedArticle', {
	get: function() {
	    return selectedArticle;
	},
	set: function(value) {
	    selectedArticle = value;
	}
    });
    Object.defineProperty(this, 'scaleFac', {
	get: function() {
	    return scaleFac;
	},
	set: function(value) {
	    scaleFac = value;
	}
    });
    Object.defineProperty(this, 'currentPosition', {
	get: function() {
	    return currentPosition;
	},
	set: function(value) {
	    currentPosition = value;
	}
    });
    Object.defineProperty(this, 'spacesData', {
	get: function() {
	    return spacesData;
	},
	set: function(value) {
	    spacesData = value;
	}
    });
    Object.defineProperty(this, 'mapData', {
	get: function() {
	    return mapData;
	},
	set: function(value) {
	    mapData = value;
	}
    });
    Object.defineProperty(this, 'postsData', {
	get: function() {
	    return postsData;
	},
	set: function(value) {
	    postsData = value;
	}
    });
    Object.defineProperty(this, 'zonesData', {
	get: function() {
	    return zonesData;
	},
	set: function(value) {
	    zonesData = value;
	}
    });
    Object.defineProperty(this, 'firstStart', {
	get: function() {
	    return firstStart;
	},
	set: function(value) {
	    firstStart = value;
	}
    });
    Object.defineProperty(this, 'rootDir', {
	get: function() {
	    return rootDir;
	},
	set: function(value) {
	    rootDir = value;
	}
    });
    Object.defineProperty(this, 'postsDir', {
	get: function() {
	    return postsDir;
	},
	set: function(value) {
	    postsDir = value;
	}
    });
    Object.defineProperty(this, 'steps', {
	get: function() {
	    return steps;
	},
	set: function(value) {
	    steps = value;
	}
    });
    Object.defineProperty(this, 'isCtrlKeyPushed', {
	get: function() {
	    return isCtrlKeyPushed;
	},
	set: function(value) {
	    isCtrlKeyPushed = value;
	}
    });
    Object.defineProperty(this, 'isAltKeyPushed', {
	get: function() {
	    return isAltKeyPushed;
	},
	set: function(value) {
	    isAltKeyPushed = value;
	}
    });
}
