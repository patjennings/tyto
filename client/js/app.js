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
    var appData = request("GET", "includes/list-content.php", null, writeAppData); // on télécharge les données
    // app();
})(window);

export function writeAppData(data){
    // on relance app(), et on recharge tout
    var st = new appState();
    st.appData = JSON.parse(data);
    app();
}

export default function app(){

    var st = new appState();
    st.isCreating = false;
    st.scaleFac = 40000.503614997007;
    st.currentPosition = [0, 0];

    console.log(st.appData);
    
    vars.g.append("rect")
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
	
    	vars.g.append("g")
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
    	createArticles(); // création des articles
    	createZones(); // création des titres de zones
	listeners();
	// createPoints(); // affiche les points et permet de vérifier le centrage des cartes.
    });

    

    
}





