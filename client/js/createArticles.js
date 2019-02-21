import * as globals from "./globals";
import appState from "./globals";
import draw from './draw';

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function createArticles(){

    var st = new appState();
    
    d3.select("svg")
	.append("g")
	.attr("id", "articles")
	.selectAll("g")
	.data(st.appData)
	.enter()
	.append("g")
	.attr("class", "card")
    
    d3.selectAll(".card")
	.append("circle")
	.attr("cx", 0)
    	.attr("cy", 0)
    	.attr("r", 4)
	.attr("fill", "#000000")


    // w/o foreignobject
    d3.select("svg")
	.selectAll(".card")
	
	.attr("id",function(d) {
	    return d.raw;
	})
	    
	.attr("transform", function(d) {
	    var proj = globals.projection([
		d.location.longitude,
		d.location.latitude
	    ])
	    
	    // La hauteur dynamique du contenant (.inner-card)
	    // var itemHeight = d3.select("svg").selectAll(".card").node().getBoundingClientRect().height
	    
	    return "translate(" + (proj[0]) +", "+(proj[1])+ ")";
	})
	.append("text")
	// .attr("font-weight", "700")
	.text(function(d) { return d.title;})
	

    // console.log(">>>>>>> "+st.scaleFac);
    draw();
}

