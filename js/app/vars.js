import zoomed from "./zoom";

// cette fonction contient modifie les états de l'application, avec des getters et des setters
// pour pouvoir vivre tout au long du déroulement     

export default function appState() {
    var isCreating = null; // on est en train de créer un article // false
    var scaleFac = null; // doit être modifié //40000.503614997007
    var currentPosition = null;      // doit être modifié //[0, 0]
    
    // var archive = [];

    Object.defineProperty(this, 'isCreating', {
	get: function() {
	    return isCreating;
	},
	set: function(value) {
	    isCreating = value;
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
  // this.getArchive = function() { return archive; };
}

var st = new appState();

export var mapPath = "assets/schinoussa.geojson";
export var zones = [
    {
	title: "Plaine de la politique",
	location: {
            latitude: 36.8675,
            longitude: 25.5300
        }
    },
    {
	title: "Marais du sexy",
	location: {
            latitude: 36.8811,
            longitude: 25.5327
        }
    },
    {
	title: "Baie de l'intime",
	location: {
            latitude: 36.8545,
            longitude: 25.5336
        }
    },
    {
	title: "Forêt du nécessaire",
	location: {
            latitude: 36.8765,
            longitude: 25.5173
        }
    }
];

export var width = screen.availWidth;
export var height = screen.availHeight;

export var projection = d3.geo.mercator()
    .scale(485035.40798408084)
    .translate([ -214842.9723933363,336774.3379795616]);

export var path = d3.geo.path()
    .projection(projection);

// export var zoom = d3.behavior.zoom()
//     .translate(projection.translate())
//     .scale(projection.scale())
//     .on("zoom", zoomed);


/*
export var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on('mousemove', function() {
	st.currentPosition = projection.invert(d3.mouse(this));
	// displayInformations(d3.event.scale)
    })
    .on('click', function() {
	st.currentPosition = projection.invert(d3.mouse(this));
	create(st.currentPosition);
	
	if(vars.isCreating == false && vars.ctrlPushed == true){ // si on peut créer un doc ET que la touche ctrl est enfoncée
	    console.log("créer l'article");
	    create(currentPosition);
	}
    });
*/

export var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

export var g = svg.append("g");

// export var content = "";
