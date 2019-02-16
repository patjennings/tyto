import * as vars from "./vars";
import draw from './draw';

/////////////////////////////////////////////////////
// Fonction qui gère l'affichage lors des zooms
/////////////////////////////////////////////////////

export default function zoomed() {

    var t = d3.event.translate;
    var s = d3.event.scale; 
    vars.projection.translate(t).scale(s);

    // transforme les pays
    vars.g.selectAll("path").attr("d", vars.path);

    // var elem = g.selectAll(".card").text("toto");

    // console.log(d);
    
    // transforme les points au zoom et translate
    vars.g.selectAll(".card").attr("transform", function(d) {
	var proj = vars.projection([
	    d.location.longitude,
	    d.location.latitude
	])
	var rectHeight = vars.g.selectAll(".inner-card").node().getBoundingClientRect().height // La hauteur dynamique du contenant (.inner-card)

	console.log(rectHeight);
	
	return "translate(" + (proj[0]-(340/2)) +", "+(proj[1]-(rectHeight/2))+ ")";
    })
    vars.g.selectAll(".zone").attr("transform", function(d) {
	return "translate(" + vars.projection([
	    d.location.longitude,
	    d.location.latitude
	]) + ")";
    })
	.selectAll("text")
	.attr("font-size", scale(s, 50000, 1536308, 12, 24)+"px");

    // vars.g.selectAll(".point").attr("transform", function(d) {
    // 	return "translate(" + vars.projection([
    // 	    d.location.longitude,
    // 	    d.location.latitude
    // 	]) + ")";
    // })

    scaleFac = s;
    
    draw();
}
