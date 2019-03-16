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
	name: "top",
	level: 5000000
    },
    {
	name: "middle",
	level: 26000000
    }
]

/////////////////////////
// Ajouter les articles
//////////////////////////

export default function createArticles(){

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
    d3.selectAll(".card")
	.append("div")
	.attr("class", "content")
	.html(function(d){return getContent(d);})
    

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
    d3.selectAll(".card")
	.select(".content")
	.html(function(d){return getContent(d);})
    
}

// get content, related to zoom level
function getContent(data){
    if(st.scaleFac < steps[0].level){
	linkDisplay = false;
	return null;
    }
    else if(st.scaleFac >= steps[0].level && st.scaleFac < steps[1].level){
	linkDisplay = false;
	return data.content.top;

    }
    else if(st.scaleFac >= steps[1].level && st.scaleFac < steps[2].level){
	linkDisplay = true;
	return data.content.middle;

    }
    else{
	linkDisplay = true;
	return data.content.low;

    }
}


// console.time("draWContentBox");
// function drawContentBox(level, displayContentText){
//     console.log(level);
    
//     d3.select("svg").selectAll(".card")
// 	.attr("class", "card "+level)
// 	.selectAll("text").remove()

//     // titre
//     d3.select("svg").selectAll(".card")
// 	.append("text")
// 	.attr("font-family", "lato")
// 	.attr("font-size", "13px")
// 	.attr("fill", "#000")
// 	.attr("dx", "8")
// 	.attr("y", "16")
// 	.attr("font-weight", "700")
// 	.text(function(d) { return d.title; })

//     // lien

//     d3.select("svg").selectAll(".card")
// 	.append("svg:foreignObject")
// 	.attr("width", 48)
// 	.attr("height", 20)
// 	.attr("x", 8)
// 	.attr("y", 20)
// 	.attr("style", "font-size: 12px; font-family: lato; font-weight: 400;")
// 	// .append("xhtml:body")
//  	// .attr("class", "link")
// 	.html(function(d) { return "<div class='link'><a href='article.php?path="+d.path+"'>go></p>"; })
// 	.append("div")
// 	// .attr("class", "content")

//     // d3.select("svg").selectAll(".card")
//     // 	.append("text")
//     // 	.attr("class", "link")
//     // 	.text("go >")
//     // 	.attr("href", function(d) { return d.path; })
//     // 	.attr("font-family", "lato")
//     // 	.attr("font-size", "13px")
//     // 	.attr("fill", "#00F")
//     // 	.attr("x", "8")
//     // 	.attr("dy", "34px")

//     // contenu
//     if(level !== "sky"){
// 	d3.select("svg").selectAll(".card")
// 	    .append("text")
// 	    .text(function(d) {
// 		if(level == "top"){
// 		    return d.content.top;
// 		}
// 		else if(level == "middle"){
// 		    return d.content.middle;
// 		}
// 		else if(level == "low"){
// 		    return d.content.low;
// 		}
		
// 	    })
// 	    .attr("font-family", "lato")
// 	    .attr("font-size", "13px")
// 	    .attr("fill", "#000")
// 	    .attr("x", "8")
// 	    .attr("dy", "32px")
// 	    .call(textWrap, globals.cardsWidth)

	
//     }
// }
// console.timeEnd("draWContentBox");
