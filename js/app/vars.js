export var isCreating = null;
export var ctrlPushed = null;

import zoomed from "./zoom";

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

export var scaleFac = 40000.503614997007;

const scale = (num, in_min, in_max, out_min, out_max) => { // this is the map() function from processing
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export var width = screen.availWidth;
export var height = screen.availHeight;

export var projection = d3.geo.mercator()
    .scale(485035.40798408084)
    .translate([ -214842.9723933363,336774.3379795616]);

export var currentPosition = [0, 0];

export var path = d3.geo.path()
    .projection(projection); 


export var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scale(projection.scale())
    .on("zoom", zoomed);

export var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on('mousemove', function() {
	currentPosition = projection.invert(d3.mouse(this));
	displayInformations(d3.event.scale)
    })
    .on('click', function() {
	currentPosition = projection.invert(d3.mouse(this));

	if(vars.isCreating == false && vars.ctrlPushed == true){ // si on peut créer un doc ET que la touche ctrl est enfoncée
	    console.log("créer l'article");
	    create(currentPosition);
	}
    });

export var g = svg.append("g")
    .call(zoom);

export var content;
