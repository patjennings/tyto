import * as vars from "./vars";
import create from "./create";
import zoom from "./zoom";
import copyTextToClipboard from './utils';
import scale from './utils';
import draw from './draw';
import createArticles from './createArticles';
import createZones from './createZones';
import createPoints from './createPoints';

// vars.isCreating = false;

let content = null;

(function(window){
    
    // Data
    function reqListener () {
	// console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        // console.log(JSON.parse(this.responseText));
	content = JSON.parse(this.responseText);

	app(content);
	
	// reqListener();
    };
    oReq.open("get", "list-content.php", true);

    oReq.send();
    // reqListener();

    
})(window);

function app(content){
    
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
    	if (error) throw error;

	// console.log(json.features[1].geometry.type);
	
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
    	createArticles(content); // création des articles
    	createZones(content); // création des titres de zones
	// createPoints(); // affiche les points et permet de vérifier le centrage des cartes.
    });

    

    
}



function requestCallback(text){
    // on relance app(), et on recharge tout
    app();
}

