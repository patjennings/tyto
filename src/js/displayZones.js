import * as globals from "./globals";
import appState from "./globals";
/////////////////////////
// Ajouter les zones
/////////////////////////

var st = new appState();

export default function displayZones(data){

    const dataParse = JSON.parse(data)
    st.zonesData = dataParse.message; // on récupère les données des zones

    // console.log("appel zones");
    
    d3.select("svg")
	.append("g")
	.attr("id", "zones")
	.selectAll("text")
	.data(st.zonesData)
	.enter().append("g")
	.attr("class", "zone")
	.append("text")
	.attr("letter-spacing", 4)
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
