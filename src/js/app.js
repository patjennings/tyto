import * as globals from "./globals";
import appState from "./globals";
import addArticle from "./addArticle";
import copyTextToClipboard from './utils/copyTextToClipboard';
import scale from './utils/scale';
import displayArticles from './displayArticles';
import displayZones from './displayZones';
// import listeners, {d3Listen} from './listeners';
import actions from './listeners/actions';
import mapActions from './listeners/mapActions';
import request from './request';
import loginManager from './utils/loginManager';
import {paths} from './conf/conf';



/// test
import {getRawTitle} from './actions/articlePost';
let content = null;
let st = new appState();

(function(window){
    app();
})(window);

export default async function app(){
    // console.log("start app");
    // remove tout si ça existe
    // getRawTitle();
    
    configure();

    const username = document.getElementById("userId").value;
    // console.log(user);

    st.user = username;
    getSpaces();
}
async function getSpaces(){
    let getSpaces = await request("GET", paths.apiUrl+"/spaces", null, function(data){
	const dataParse = JSON.parse(data)
	st.spacesData = dataParse.message;
	setActiveSpace(0);
	displayNav(); // afficher la nav
    })
}
export function setActiveSpace(index) {
    st.spaceIndex = index; // set l'index du space dans l'objet des spaces
    // set default space + map
    st.space = st.spacesData[index]._id;
    st.mapData = paths.mapsDir+"/"+st.spacesData[index].map

    // une fois le space renseigné, on charge :
    // - la map
    // - la nav
    // - on lance les listeners
    displayMap(st.mapData, globals.pathProjection); // Afficher la carte

    // listeners(); // on active les écouteurs
    
}


export function reset(){
    configure();
    displayMap(st.mapData, globals.pathProjection); // Afficher la carte
    displayNav();
}

// function clean(){
//     // on cleane tout pour redessiner l'ensemble
//     const svg = document.getElementsByTagName("svg")[0];

//     if(svg){
// 	if(svg.parentNode){
// 	    svg.parentNode.removeChild(svg);
// 	}
//     }
// }

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

function displayMap(mapdata, mapProjection){
    // console.log(mapdata);
    d3.json(mapdata, function(error, json) {
    	if (error) throw error;
    	d3.select("svg")
	    .append("g")
    	    .attr("id", "states")
    	    .selectAll("path")
    	    .data(json.features)
    	    .enter()
	    .append("path")
    	    .attr("d", mapProjection)
	    .attr("id", function(d,i){ return i})
	    .style("fill", "#555555");
	requestPosts(); // création des articles
	requestZones(); // création des titres de zones
    });
}

async function displayNav(){
    const wrapper = document.getElementById("root");
    let nav = wrapper.querySelector(".nav");
    
    if(!nav){
	let requestNav = await request("GET", paths.apiUrl+"/spaces", null, function(data){
	    // console.log(data);
	    wrapper.insertAdjacentHTML("afterbegin", "<div class='nav'></div>")
	    nav = wrapper.querySelector(".nav");
	    let navList = JSON.parse(data); // on parse le json pour avoir un tableau
	    let output = "<ul>";
	    output += "<h2>Spaces</h2>";
	    navList.message.forEach(n => {
		output += "<li id='space-"+n._id+"' class='nav-item'>"+n.title+"</li>"
	    });
	    output += "</ul>"
	    nav.innerHTML = output;

	    actions(); // on relance les écouteurs
	});
    }
}

export function requestPosts(){
    // on télécharge les données
    var postsData = request("GET", paths.apiUrl+"/"+st.space+"/content", null, displayArticles);
}

export function requestZones(){
    // console.log("request les zones");
    // on télécharge les données
    var zonesData = request("GET", paths.apiUrl+"/"+st.space+"/zones", null, displayZones);
}



