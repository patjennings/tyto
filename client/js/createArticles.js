import * as globals from "./globals";
import appState from "./globals";
import draw from './draw';

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function createArticles(){

    var st = new appState();
    
    // d3.select("#articles")
    // .append("div")
    // .attr("class", "articles")
    d3.selectAll(".articles")
	.data(st.appData)
	.enter()
	.append("div")
	.attr("class", "card")

    d3.selectAll(".card")	
	.attr("id",function(d) {
	    return d.raw;
	})
	.attr("style", function(d) {
	    var proj = globals.projection([
		d.location.longitude,
		d.location.latitude
	    ])
	    
	    
	    // return "translate(" + (proj[0]) +"px, "+(proj[1])+ "px)";
	    return "left: "+(proj[0])+"px; top: "+(proj[1])+"px;"
	})
	.append("text")
    // .attr("font-weight", "700")
	.text(function(d) { return d.title;})
    

}

export function updateArticles(newProjection = null){
    // transforme les points au zoom et translate
    d3.selectAll(".card").attr("style", function(d) {
	var proj = globals.projection([
	    d.location.longitude,
	    d.location.latitude
	])
	return "left: "+(proj[0])+"px; top: "+(proj[1])+"px;"
    })
    
}

