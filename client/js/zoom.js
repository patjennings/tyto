import * as vars from "./vars";
import appState from "./vars";
import scale from './utils';
import draw from './draw';

var st = new appState();

/////////////////////////////////////////////////////
// Fonction qui gère l'affichage lors des zooms
/////////////////////////////////////////////////////

export default function zoomed() {

    // console.log("zoom");

    var t = d3.event.translate;
    var s = d3.event.scale; 
    vars.projection.translate(t).scale(s);

    // transforme les pays
    d3.select("svg").selectAll("path").attr("d", vars.path);
    
    // transforme les points au zoom et translate
    d3.select("svg").selectAll(".card").attr("transform", function(d) {
	var proj = vars.projection([
	    d.location.longitude,
	    d.location.latitude
	])
	// La hauteur dynamique du contenant (.inner-card)
 
	var rectHeight = d3.select("svg").selectAll(".card").node().getBoundingClientRect().height
	// console.log("translate(" + (proj[0]-(vars.cardsWidth/2)) +", "+(proj[1]-(rectHeight/2))+ ")");
	return "translate(" + (proj[0]-(vars.cardsWidth/2)) +", "+(proj[1]-(rectHeight/2))+ ")";
 // ON S'OCCUPE de ça APRÈS !!!!!!!!!!!!
    })
    d3.select("svg").selectAll(".zone").attr("transform", function(d) {
	return "translate(" + vars.projection([
	    d.location.longitude,
	    d.location.latitude
	]) + ")";
    })
	.selectAll("text")
	.attr("font-size", scale(s, 50000, 1536308, 12, 24)+"px");

    // d3.select("svg").selectAll(".point").attr("transform", function(d) {
    // 	return "translate(" + vars.projection([
    // 	    d.location.longitude,
    // 	    d.location.latitude
    // 	]) + ")";
    // })

    st.scaleFac = s;
    console.log(st.scaleFac);
    
    draw(st.scaleFac);
}
