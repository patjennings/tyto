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
	.text(function(d) { return d.title; })

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
	    .attr("dy", "14px")
	    .call(textWrap, vars.cardsWidth)
    }
}
