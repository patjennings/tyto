import scaleMap from "./scaleMap";
import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import addZone from "./addZone";
import request from "./request";
import displayPosts from "./displayPosts"
import app, {requestPosts, reset} from "./app";
import {loginAlert} from './utils/loginManager'

let ctrlPushed = false;
let altPushed = false;
var st = new appState();
var selectedNode = null;

export function d3Listen(){
    // console.log("les listeners d3 démarrent");
    d3.select("body").select("svg")
	.on('mousemove', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));
	})
	.on('click', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));

	    if(ctrlPushed == true && altPushed == false && st.isCreating == false){ // si on peut créer un doc ET que la touche ctrl est enfoncée
		// si trop bas ou trop à droite, transformation

		if(st.user !== null){
		    addPost(st.currentPosition);
		} else {
		    loginAlert();
		}
	    }
	    if(ctrlPushed == true && altPushed == true && st.isCreating == false){
		if(st.user !== null){
		    addZone(st.currentPosition);
		} else {
		    loginAlert();
		}
	    }
	    return;
	});

    // on déclare le zoom
    var zoom = d3.behavior.zoom()
	.translate(globals.projection.translate())
	.scale(globals.projection.scale())
	.on("zoom", scaleMap);

    // puis on l'appelle
    d3.select("svg").call(zoom);
    d3.select("#articles").selectAll(".card").select(".grip").call(dragListener);
}

export default function listeners(){
    console.log("les listeners démarrent");
    
    // Ctrl key listener, pour utiliser avec le click lors de la création de documents
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    ctrlPushed = true;
	    console.log(ctrlPushed);
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
    }, false);

    
    // ----------
    // NAVIGATION
    // ----------
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(i => {
    	i.addEventListener('click', (event) => {
    	    let elem = event.target
    	    let newSpace = event.target.attributes[0].value;
    	    st.space = newSpace;
    	    reset();
    	}, false)
    })

    

    // // ----------------
    // // CLICK ON ITEMS
    // // ----------------
    // d3.selectAll(".card").select(".content")
    // 	.on("mouseover", d => {
    // 	    console.log(d.content.low);
    // 	})
}


export function ArticleListeners(){
    
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
	console.log("edit "+titleRaw);
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

	
	
	// et là, on modifie la position dans le fichier lié à l'item draggé/droppé

	if(st.user !== null){
	    request("POST", "server/utils/UpdateMarkdownDocument.php", "titleraw="+titleRaw+"&newlongitude="+st.currentPosition[0]+"&newlatitude="+st.currentPosition[1]+"&space="+st.space+"&user="+st.user, requestPosts);

	    } else {
		loginAlert();
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
