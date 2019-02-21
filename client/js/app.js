import * as globals from "./globals";
import appState from "./globals";
import addContent from "./addContent";
import zoom from "./zoom";
import copyTextToClipboard from './utils/copyTextToClipboard';
import scale from './utils/scale';
import draw from './draw';
import createArticles from './createArticles';
import createZones from './createZones';
import listeners from './listeners';
import request from './request';

let content = null;

(function(window){
    // qd c'est prêt, on commence
    app();
})(window);

export default function app(){
    requestAppData();
}

function requestAppData(){
    // on télécharge les données
    var appData = request("GET", "list-content.php", null, writeAppData);
}

export function writeAppData(data){
    // on relance app(), et on recharge tout
    var st = new appState();
    st.appData = JSON.parse(data);
    var zonesData = request("GET", "dist/zones.json", null, writeZonesData); 
}

export function writeZonesData(data){
    // on relance app(), et on recharge tout
    var st = new appState();
    st.zonesData = JSON.parse(data);
    
    launcher();
}

function launcher(){
    var st = new appState();
    st.isCreating = false;
    st.isDragging = false;
    if(st.scaleFac == null) st.scaleFac = 40000.503614997007;
    if(st.currentPosition == null) st.currentPosition = [0, 0];
    
    let svg = d3.select("svg");
    
    if(svg){
	d3.select("svg").remove(); // on réinitialise tout
	d3.select("body")
	    .append("svg")
	    .attr("width", globals.width)
	    .attr("height", globals.height)
    }
    
    d3.select("svg")
	.append("g")
	.append("rect")
	.attr("class", "background")
	.attr("width", globals.width)
	.attr("height", globals.height);
    
    // console.log(st.zonesData);
    // function displayInformations(zoom){

    // 	infos = document.getElementById("position");
    // 	infos.value = globals.currentPosition[1].toFixed(4)+", "+globals.currentPosition[0].toFixed(4);

    // }

    //////////////////////
    // Afficher la carte
    ////////////////////////

    d3.json(globals.mapPath, function(error, json) {
    	// if (error) throw error;
	
    	d3.select("svg")
	    .append("g")
    	    .attr("id", "states")
    	    .selectAll("path")
    	    .data(json.features)
    	    .enter().append("path")
    	    .attr("d", globals.path)
	    .attr("id", function(d,i){ return i})
	    .style("stroke", "#999999")
	    .style("fill", "rgba(255,255,255,0.5)");
    	// .on("click", clicked);

    	// On lance les fonctions une fois que la carte est chargée et affichée
	// if(st.firstStart == true){ // si c'est le premier démarrage
	createArticles(); // création des articles
    	createZones(); // création des titres de zones
	listeners();
	// }
    	
	// st.firstStart = false;
	// createPoints(); // affiche les points et permet de vérifier le centrage des cartes.
    });
    
}




