import * as globals from "./globals";
import appState from "./globals";
import scale from './utils/scale';
import {updatePosts} from './displayPosts';
import {updateZones} from './displayZones';

var st = new appState();

/////////////////////////////////////////////////////
// Fonction qui gère l'affichage lors des zooms
/////////////////////////////////////////////////////

export default function scaleMap() {
    var t = d3.event.translate;
    var s = d3.event.scale; 
    globals.projection.translate(t).scale(s);

    st.scaleFac = s; // on actualise le facteur d'échelle
    
    // transforme les pays
    d3.select("svg").selectAll("path").attr("d", globals.path);
    
    updatePosts();
    updateZones();

    d3.select("svg").selectAll(".creation-spot").attr("transform", function() {
	return "translate(" + globals.projection([
	    d3.select(this).attr("latitude"),
	    d3.select(this).attr("longitude")
	]) + ")";
    })
    
    
}
