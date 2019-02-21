import * as vars from "./vars";
import appState from "./vars";
import scale from './utils';
import textWrap from './textWrap';

///////////////////////////////////////////
// affiche le contenu relatif au niveau de zooms
//////////////////////////////////////////////////

let pFile = "article.php"; // le fichier php qui affiche les articles
var st = new appState();

export default function draw(){

    // s is for scale
    console.log(st.scaleFac);
    
    // adapter l'opacité au niveau de zoom
    // d3.select("svg").selectAll(".card")
	// .attr("style", "opacity:"+scale(s, 1070, 10000, 0.15, 1)+";")
    
    if(st.scaleFac < 1300000){
	drawContentBox("sky");
    }
    else if(st.scaleFac >= 1300000 && st.scaleFac < 5000000){
	drawContentBox("top"); 
    }
    else if(st.scaleFac >= 5000000 && st.scaleFac < 26000000){
	drawContentBox("middle");
    }
   /* else if(st.scaleFac >= 26000000){
	drawContentBox("low");
    }*/
}


function drawContentBox(level, displayContentText){
    console.log(level);
    
    d3.select("svg").selectAll(".card")
	.attr("class", "card "+level)
	.selectAll("text").remove()

    // titre
    d3.select("svg").selectAll(".card")
	.append("text")
	.attr("font-family", "lato")
	.attr("font-size", "13px")
	.attr("fill", "#000")
	.attr("dx", "8")
	.attr("y", "16")
	.attr("font-weight", "700")
	.text(function(d) { return d.title; })

    // lien

    d3.select("svg").selectAll(".card")
	.append("svg:foreignObject")
	.attr("width", 48)
	.attr("height", 20)
	.attr("x", 8)
	.attr("y", 20)
	.attr("style", "font-size: 12px; font-family: lato; font-weight: 400;")
	// .append("xhtml:body")
 	// .attr("class", "link")
	.html(function(d) { return "<div class='link'><a href='article.php?path="+d.path+"'>go></p>"; })
	.append("div")
	// .attr("class", "content")

    // d3.select("svg").selectAll(".card")
    // 	.append("text")
    // 	.attr("class", "link")
    // 	.text("go >")
    // 	.attr("href", function(d) { return d.path; })
    // 	.attr("font-family", "lato")
    // 	.attr("font-size", "13px")
    // 	.attr("fill", "#00F")
    // 	.attr("x", "8")
    // 	.attr("dy", "34px")

    // contenu
    if(level !== "sky"){
	d3.select("svg").selectAll(".card")
	    .append("text")
	    .text(function(d) {
		if(level == "top"){
		    return d.content.top;
		}
		else if(level == "middle"){
		    return d.content.middle;
		}
		else if(level == "low"){
		    return d.content.low;
		}
		
	    })
	    .attr("font-family", "lato")
	    .attr("font-size", "13px")
	    .attr("fill", "#000")
	    .attr("x", "8")
	    .attr("dy", "32px")
	    .call(textWrap, vars.cardsWidth)

	
    }
}
