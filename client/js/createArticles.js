import * as vars from "./vars";
import appState from "./vars";
import draw from './draw';

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function createArticles(){

    var st = new appState();
    
    vars.g.append("g")
	.attr("id", "articles")
	.selectAll("rect")
	.data(st.appData)
	.enter().append("g")
	.attr("class", "card")
	.append("rect")
	.attr("width", 96)
	.attr("height", 128)
	.attr("fill", "#FFFFFF")
	.attr("opacity", "0")
    
    vars.g.selectAll(".card")
	.attr("transform", function(d) {
	    var proj = vars.projection([
		d.location.longitude,
		d.location.latitude
	    ])
	    
	    // La hauteur dynamique du contenant (.inner-card)
	    var rectHeight = vars.g.selectAll(".card").node().getBoundingClientRect().height
	    
	    return "translate(" + (proj[0]-(340/2)) +", "+(proj[1]-(rectHeight/2))+ ")";
	})
	.append("svg:foreignObject")
	.attr("width", 340)
	.attr("height", 800)
	.append("xhtml:body")
 	.attr("class", "inner-card")
	.html(function(d) { return "<div class='title'><h3>"+d.title+"</h3>"; })
	.append("div")
	.attr("class", "content")

    draw();
}

