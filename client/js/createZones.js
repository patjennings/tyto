import * as vars from "./vars";
/////////////////////////
// Ajouter les zones
/////////////////////////

export default function createZones(){
    
    d3.select("svg")
	.append("g")
	.attr("id", "zones")
	.selectAll("text")
	.data(vars.zones)
	.enter().append("g")
	.attr("class", "zone")
	.append("text")
	.attr("font-family", "lato")
	.attr("font-size", "16px")
	.attr("text-anchor", "middle")
	.text(function(d){ return d.title})

    d3.select("svg")
	.selectAll(".zone")
	.attr("transform", function(d) {
	    return "translate(" + vars.projection([
		d.location.longitude,
		d.location.latitude
	    ]) + ")";
	})	
}

///////
