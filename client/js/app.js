import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import zoom from "./zoom";
import copyTextToClipboard from './utils/copyTextToClipboard';
import scale from './utils/scale';
import displayPosts from './displayPosts';
import displayZones from './displayZones';
import listeners from './listeners';
import request from './request';

let content = null;

let st = new appState();

(function(window){
    // qd c'est prêt, on commence
    app();
})(window);

export default function app(){
    configure();
    displayMap(); // Afficher la carte
}

function configure(){
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
}

function displayMap(){
    d3.json(globals.mapPath, function(error, json) {
    	if (error) throw error;
	
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
	
	requestPosts(); // création des articles
	requestZones(); // création des titres de zones
	listeners(); // on active les écouteurs
    });
}

function requestPosts(){
    // on télécharge les données
    var postsData = request("GET", "list-content.php", null, displayPosts);
}

function requestZones(){
    // on télécharge les données
    var zonesData = request("GET", "dist/zones.json", null, displayZones);
}



