import * as vars from "./vars";
import appState from "./vars";
import addContent from "./addContent";
import zoom from "./zoom";
import copyTextToClipboard from './utils';
import scale from './utils';
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
	    .attr("width", vars.width)
	    .attr("height", vars.height)
    }
    
    d3.select("svg")
	.append("g")
	.append("rect")
	.attr("class", "background")
	.attr("width", vars.width)
	.attr("height", vars.height);
    

    // function displayInformations(zoom){

    // 	infos = document.getElementById("position");
    // 	infos.value = vars.currentPosition[1].toFixed(4)+", "+vars.currentPosition[0].toFixed(4);

    // }

    //////////////////////
    // Afficher la carte
    ////////////////////////

    d3.json(vars.mapPath, function(error, json) {
    	// if (error) throw error;
	
    	d3.select("svg")
	    .append("g")
    	    .attr("id", "states")
    	    .selectAll("path")
    	    .data(json.features)
    	    .enter().append("path")
    	    .attr("d", vars.path)
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




