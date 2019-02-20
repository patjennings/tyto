import * as vars from "./vars";
import appState from "./vars";
import draw from './draw';

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function createArticles(){

    var st = new appState();
    
    d3.select("svg")
	.append("g")
	.attr("id", "articles")
	.selectAll("rect")
	.data(st.appData)
	.enter()
	.append("g")
	.attr("class", "card")
	.append("rect")
	// .attr("class", "inner-card")
	.attr("width", vars.cardsWidth)
    	.attr("height", 100)
	.attr("fill", "#FC0")
	.attr("opacity", "0.1")


    // w/o foreignobject
    d3.select("svg")
	.selectAll(".card")
	
	.attr("id",function(d) {
	    return d.raw;
	})
	    
	.attr("transform", function(d) {
	    var proj = vars.projection([
		d.location.longitude,
		d.location.latitude
	    ])
	    
	    // La hauteur dynamique du contenant (.inner-card)
	    var rectHeight = d3.select("svg").selectAll(".card").node().getBoundingClientRect().height
	    
	    return "translate(" + (proj[0]-(vars.cardsWidth/2)) +", "+(proj[1]-(rectHeight/2))+ ")";
	})
	.append("text").style("font-size", "12px").style("color", "#000")
	.text(function(d) { return d.title;})
	

    console.log(">>>>>>> "+st.scaleFac);
    draw();
}

