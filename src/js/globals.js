import scaleMap from "./scaleMap";

// toutes ces variables sont modifiées dans init.js, via l'objet appState()
let space = "frei";
let isCreating = null; // on est en train de créer un article // false
let isDragging = null; // false
let scaleFac = null; // doit être modifié //40000.503614997007
let currentPosition = null;      // doit être modifié //[0, 0]
let postsData = null;      // doit être modifié avec le nouveau contenu chargé du json
let zonesData = null;
let firstStart = true;
const rootDir = "http://localhost/tyto/";
// const rootDir = "http://tyto.thomasguesnon.net/";
const postsDir = rootDir+"dist/content/";

export var mapDataPath = "dist/spaces/"+space+"/map/map.geojson";

const steps = [
    {
	name: "space",
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
	    mapDataPath = "dist/spaces/"+value+"/map/map.geojson";
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
    Object.defineProperty(this, 'isDragging', {
	get: function() {
	    return isDragging;
	},
	set: function(value) {
	    isDragging = value;
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
}

var st = new appState();



export var width = screen.availWidth;
export var height = screen.availHeight;

export var projection = d3.geo.mercator()
    .scale(485035)
    .translate([ -215431, 336666]);

export var pathProjection = d3.geo.path()
    .projection(projection);

export var cardsWidth = 340;
