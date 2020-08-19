import mapScale from "./utils/mapScale";
import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import addZone from "./addZone";
import request from "./request";
import displayPosts from "./displayPosts"
import app, {requestPosts, reset, setActiveSpace} from "./app";
import {loginAlert} from './utils/loginManager';
import UIArticle from "./components/UIArticle";
import logs from './utils/logs';

let ctrlPushed = false;
let altPushed = false;
var st = new appState();
var selectedNode = null;

export function d3Listen(){
    d3.select("body").select("svg")
	.on('mousemove', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));
	})
	.on('click', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));
	    if(ctrlPushed == true && altPushed == false && st.isCreating == false){ 
		addPost(st.currentPosition);
	    }
	    if(ctrlPushed == true && altPushed == true && st.isCreating == false){
		addZone(st.currentPosition);
	    }
	    ctrlPushed = false;
	    altPushed = false;
	    return;
	});

    // on déclare le zoom
    var zoom = d3.behavior.zoom()
	.translate(globals.projection.translate())
	.scale(globals.projection.scale())
	.on("zoom", mapScale);

    // puis on l'appelle
    d3.select("svg").call(zoom);
    d3.select("#articles").selectAll(".card").select(".grip").call(dragListener);
}

export default function listeners(){
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    ctrlPushed = true;
	}
	if(event.altKey) {
	    altPushed = true;
	}
	if(event.keyCode == 27) { // ESC key
	    removeUIinput();    
	}
    }, false);

    window.addEventListener('keyup', (event) => {
	ctrlPushed = false;
	altPushed = false;
	logs("ctrl ou alt relevé")
    }, false);

    
    // ----------
    // NAVIGATION
    // ----------
    const navItems = document.querySelectorAll(".nav-item");

    for(let i=0; i<navItems.length; i++){
    	navItems[i].addEventListener('click', (event) => {
    	    setActiveSpace(i);
    	    reset();
    	}, false)
    }
}


export function ArticleListeners(data){
    
    // REMOVE ARTICLE
    // ----------------
    const articleOverlay = document.querySelector(".overlay");
    const activeArticle = document.querySelector(".article");
    const deleteArticle = document.getElementById("delete");
    const editArticle = document.getElementById("edit");
    
    articleOverlay.addEventListener("click", e => {
	articleOverlay.setAttribute("class", "overlay hiding")
	activeArticle.setAttribute("class", "article hiding")
	
	// et on supprime après avoir laissé l'anim jouer
	window.setTimeout(d => {
	    activeArticle.parentNode.removeChild(activeArticle);
	    articleOverlay.parentNode.removeChild(articleOverlay);
	}, 500)	
    })

    deleteArticle.addEventListener("click", e => {
	const titleRaw = activeArticle.getAttribute("id");
	
	// hiding
	articleOverlay.setAttribute("class", "overlay hiding")
	activeArticle.setAttribute("class", "article hiding")
	d3.select("#articles").select("#"+titleRaw).classed("deleting", true);
	
	// et on supprime après avoir laissé l'anim jouer
	window.setTimeout(d => {
	    activeArticle.parentNode.removeChild(activeArticle);
	    articleOverlay.parentNode.removeChild(articleOverlay);
	    request("POST", "server/utils/DeleteMarkdownDocument.php", "title="+titleRaw+"&space="+st.space, requestPosts);
	}, 650);
    })

    editArticle.addEventListener("click", e => {
	const titleRaw = activeArticle.getAttribute("id");
	UIArticle(data, true);
    })
}
// ------
// UTILS
// ------
var dragListener = d3.behavior.drag()
    .on("dragstart", function(d) {
	// lance un intervalle, puis met launch sur ok
	var card = d3.select(this.parentNode);
	st.draggingNode = true;
	card.select(".grip")
	    .attr("r", 48)
	    .attr("opacity", "0.25")
	
	card.classed("card isDragged", true)

        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
    })
    .on("drag", function(d) {
	var card = d3.select(this.parentNode);
	card.attr("transform", function(d) {
	    return "translate(" + globals.projection(st.currentPosition) + ")";
	})
    })
    .on("dragend", function(d) {
	var card = d3.select(this.parentNode);
	var titleRaw = card.attr("id");
	if(st.user !== null){
	    request("POST", "server/utils/UpdateMarkdownDocument.php", "titleraw="+titleRaw+"&newlongitude="+st.currentPosition[0]+"&newlatitude="+st.currentPosition[1]+"&space="+st.space+"&user="+st.user, requestPosts);
	} else {
	    requestPosts();
	}
    });

function endDrag() {
    selectedNode = null;
    if (st.draggingNode !== null) {
        st.draggingNode = null;
    }
}

export function removeUIinput(){
    // console.log("stop la création");
    var box = document.getElementById("input-container");
    box.parentNode.removeChild(box);
    d3.select("svg").selectAll(".creation-spot").remove();
    st.isCreating = false;
    return;
}
