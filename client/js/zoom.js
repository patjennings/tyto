import * as globals from "./globals";
import appState from "./globals";
import scale from './utils/scale';
import draw from './draw';
import {updateArticles} from './createArticles';
import {updateZones} from './createZones';

var st = new appState();

/////////////////////////////////////////////////////
// Fonction qui gère l'affichage lors des zooms
/////////////////////////////////////////////////////

export default function zoomed() {

    var t = d3.event.translate;
    var s = d3.event.scale; 
    globals.projection.translate(t).scale(s);

    // transforme les pays
    d3.select("svg").selectAll("path").attr("d", globals.path);
    
    updateArticles();
    updateZones();

    d3.select("svg").selectAll(".creation-spot").attr("transform", function() {
	return "translate(" + globals.projection([
	    d3.select(this).attr("latitude"),
	    d3.select(this).attr("longitude")
	]) + ")";
    })
    
    st.scaleFac = s;
    draw(st.scaleFac);

}
