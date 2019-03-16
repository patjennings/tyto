import * as globals from "./globals";
import appState from "./globals";

var st = new appState();
let linkDisplay = false;
let steps = [
    {
	name: "sky",
	level: 1300000
    },
    {
	name: "bird",
	level: 5000000
    },
    {
	name: "ground",
	level: 26000000
    }
]

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function createArticles(){
    // --------
    // FULL DIV
    // --------
    // d3.selectAll(".articles")
    // 	.data(st.appData)
    // 	.enter()
    // 	.append("div")
    // 	.attr("class", "card")

    // d3.selectAll(".card")	
    // 	.attr("id",function(d) {
    // 	    return d.raw;
    // 	})
    // 	.attr("style", function(d) {
    // 	    var proj = globals.projection([
    // 		d.location.longitude,
    // 		d.location.latitude
    // 	    ])
    
    
    // 	    // return "translate(" + (proj[0]) +"px, "+(proj[1])+ "px)";
    // 	    return "left: "+(proj[0])+"px; top: "+(proj[1])+"px;"
    // 	})
    // 	.append("text")
    // // .attr("font-weight", "700")
    // 	.text(function(d) { return d.title;})
    // d3.selectAll(".card")
    // 	.append("div")
    // 	.attr("class", "content")
    // 	.html(function(d){return getContent(d);})

    // --------
    // SVG
    // --------
    d3.select("svg")
	.append("g")
	.attr("id", "articles")
	.selectAll("g")
	.data(st.appData)
    	.enter()
    	.append("g")
    	.attr("class", "card")
    

    d3.selectAll(".card")	
    	.attr("id",function(d) {
    	    return d.raw;
    	})
    	.attr("transform", function(d) {
    	    var proj = globals.projection([
    		d.location.longitude,
    		d.location.latitude
    	    ])
	    return "translate(" + (proj[0]) +", "+(proj[1])+ ")";
	})

    d3.selectAll(".card")
	.append("circle")
	.attr("cx", 0)
    	.attr("cy", 0)
    	.attr("r", 4)
	.attr("fill", "#000000")


    d3.selectAll(".card")
	.append("svg:foreignObject")
	.attr("width", 256)
	.attr("height", 200)
	.attr("x", 4)
	.attr("y", 4)
	// .attr("style", "font-size: 12px; font-family: lato; font-weight: 400;")
	.append("xhtml:body")
	.append("div")
    	.attr("class", "card-title")
	.text(function(d) { return d.title; })

    d3.selectAll(".card")
	.select("body")
	.attr("id",function(d) {
    	    return "wrapper-"+d.raw;
    	})
	.append("div")
        .attr("class", "card-content")
	.html(function(d){return getContent(d);})
    
    d3.selectAll(".card")
	.select("body")
	.append("div")
        .attr("class", "card-link")
	.html(function(d){return linkDisplay ? "The link" : null;})

    adjustFoHeight();
}

// Permet d'ajuster automatiquement la hauteur du foreignObject en se basant sur le body
function adjustFoHeight(){
    d3.selectAll(".card")
	.select("foreignObject")
	.attr("height", function(d){
	    let bodyHeight = document.getElementById("wrapper-"+d.raw).clientHeight;
	    return bodyHeight;
	})

}

export function updateArticles(newProjection = null){
    // transforme les points au zoom et translate
    d3.selectAll(".card").attr("transform", function(d) {
	var proj = globals.projection([
	    d.location.longitude,
	    d.location.latitude
	])
	return "translate(" + (proj[0]) +", "+(proj[1])+ ")";
    })
    d3.selectAll(".card")
	.select(".card-content")
	.html(function(d){return getContent(d);})
    
    d3.selectAll(".card")
	.select(".card-link")
	.html(function(d){return linkDisplay ? "The link" : null;})

    adjustFoHeight();
}

// return the  content, related to zoom level
function getContent(data){
    if(st.scaleFac < steps[0].level){
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+steps[0].name)
	return null;
    }
    else if(st.scaleFac >= steps[0].level && st.scaleFac < steps[1].level){
	linkDisplay = false;
	d3.selectAll(".card")
	    .attr("class", "card "+steps[1].name)
	return data.content.top;

    }
    else if(st.scaleFac >= steps[1].level && st.scaleFac < steps[2].level){
	linkDisplay = true;
	d3.selectAll(".card")
	    .attr("class", "card "+steps[2].name)
	return data.content.middle;

    }
    else{
	linkDisplay = true;
	d3.selectAll(".card")
	    .attr("class", "card "+steps[2].name)
	return data.content.low;

    }
}
