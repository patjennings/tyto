import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import copyTextToClipboard from './utils/copyTextToClipboard';
import scale from './utils/scale';
import displayPosts from './displayPosts';
import displayZones from './displayZones';
import listeners, {d3Listen} from './listeners';
import request from './request';

let content = null;
let st = new appState();

(function(window){
    app();
})(window);

export default function app(){

    // remove tout si ça existe
    // clean();
    // console.log("Boooootstrap");
    configure();
    
    displayMap(globals.mapDataPath, globals.pathProjection); // Afficher la carte
    displayNav();

    listeners(); // on active les écouteurs
    // console.log(globals.pathProjection);

}

export function reset(){
    configure();
    displayMap(globals.mapDataPath, globals.pathProjection); // Afficher la carte
    displayNav();
}

function clean(){
    
    // on cleane tout pour redessiner l'ensemble
    const svg = document.getElementsByTagName("svg")[0];
    console.log(svg);
    if(svg){
	if(svg.parentNode){
	    svg.parentNode.removeChild(svg);
	    console.log(svg);
	}
    }
}

function configure(){
    
    st.isCreating = false;
    st.isDragging = false;
    
    if(st.scaleFac == null) st.scaleFac = 40000.503614997007;
    if(st.currentPosition == null) st.currentPosition = [0, 0];
    
    let svg = d3.select("svg");
    
    if(svg){
	console.log("déjà le svg");
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

function displayMap(mapData, mapProjection){
    console.log("display the map");
    d3.json(mapData, function(error, json) {
    	if (error) throw error;
	
    	d3.select("svg")
	    .append("g")
    	    .attr("id", "states")
    	    .selectAll("path")
    	    .data(json.features)
    	    .enter().append("path")
    	    .attr("d", mapProjection)
	    .attr("id", function(d,i){ return i})
	    .style("stroke", "#999999")
	    .style("fill", "rgba(255,255,255,0.5)");
	
	requestPosts(); // création des articles
	requestZones(); // création des titres de zones
	
	
    });
}

function displayNav(){
    const wrapper = document.getElementById("root");
    let nav = wrapper.querySelector(".nav");
    
    if(!nav){
	wrapper.insertAdjacentHTML("afterbegin", "<div class='nav'></div>")
	nav = wrapper.querySelector(".nav");

	let output = "<ul>"
	output += "<li id='welt' class='nav-item'>welt</li>"
	output += "<li id='frei' class='nav-item'>frei</li>"
	output += "</ul>"
	
	nav.innerHTML = output;
    }
    // console.log(nav);
}

export function requestPosts(){
    // on télécharge les données
    var postsData = request("GET", "server/list-content.php", "space="+st.space, displayPosts);
    
}

export function requestZones(){
    // on télécharge les données
    var zonesData = request("GET", "dist/spaces/"+st.space+"/zones.json", null, displayZones);
}



