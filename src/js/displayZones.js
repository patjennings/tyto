import * as globals from "./globals";
import appState from "./globals";
/////////////////////////
// Ajouter les zones
/////////////////////////

var st = new appState();

export default function displayZones(data){

    st.zonesData = JSON.parse(data); // on récupère les données des zones
    
    d3.select("svg")
	.append("g")
	.attr("id", "zones")
	.selectAll("text")
	.data(st.zonesData)
	.enter().append("g")
	.attr("class", "zone")
	.append("text")
	.attr("font-family", "lato")
	.attr("font-size", "16px")
	.attr("text-anchor", "middle")
	.attr("fill", "#ffffff")
	.text(function(d){ return d.title})

    d3.select("svg")
	.selectAll(".zone")
	.attr("transform", function(d) {
	    return "translate(" + globals.projection([
		d.location.longitude,
		d.location.latitude
	    ]) + ")";
	})	
}

export function updateZones(newProjection = null){
    d3.select("svg").selectAll(".zone").attr("transform", function(d) {
	return "translate(" + globals.projection([
	    d.location.longitude,
	    d.location.latitude
	]) + ")";
    })
}

///////
