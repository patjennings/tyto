import * as vars from "./vars";
import scale from './utils';
///////////////////////////////////////////
// affiche le contenu relatif au niveau de zooms
//////////////////////////////////////////////////

export default function draw(){

    // adapter l'opacité au niveau de zoom
    vars.g.selectAll(".inner-card")
	.attr("style", "opacity:"+scale(vars.scaleFac, 1070, 10000, 0.15, 1)+";")
    
    if(vars.scaleFac < 1300000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card sky")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p></p>"; });
    }
    else if(vars.scaleFac >= 1300000 && vars.scaleFac < 5000000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card top")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p>"+d.content.top+"</p><a href='article.php?path="+d.path+"'>Full article</a>"; });
    }
    else if(vars.scaleFac >= 5000000 && vars.scaleFac < 26000000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card middle")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p>"+d.content.middle+"</p><a href='article.php?path="+d.path+"'>Full article</a>"; });
    }
    else if(vars.scaleFac >= 26000000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card low")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p>"+d.content.low+"</p><a href='article.php?path="+d.path+"'>Full article</a>"; });
    }


    var elem = vars.g.selectAll(".inner-card");

}
