import * as vars from "./vars";
import appState from "./vars";
import scale from './utils';

///////////////////////////////////////////
// affiche le contenu relatif au niveau de zooms
//////////////////////////////////////////////////

let pFile = "article.php"; // le fichier php qui affiche les articles
var st = new appState();

export default function draw(s){

    // s is for scale
    console.log(s);
    
    // adapter l'opacité au niveau de zoom
    vars.g.selectAll(".inner-card")
	.attr("style", "opacity:"+scale(s, 1070, 10000, 0.15, 1)+";")
    
    if(s < 1300000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card sky")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p></p>"; });
    }
    else if(s >= 1300000 && s < 5000000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card top")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p>"+d.content.top+"</p><a href='"+pFile+"?path="+d.path+"'>Full article</a>"; });
    }
    else if(s >= 5000000 && s < 26000000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card middle")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p>"+d.content.middle+"</p><a href='"+pFile+"?path="+d.path+"'>Full article</a>"; });
    }
    else if(s >= 26000000){
	vars.g.selectAll(".inner-card")
	    .attr("class", "inner-card low")
	vars.g.selectAll(".content")
	    .html(function(d) { return "<p>"+d.content.low+"</p><a href='"+pFile+"?path="+d.path+"'>Full article</a>"; });
    }


    var elem = vars.g.selectAll(".inner-card");

}
