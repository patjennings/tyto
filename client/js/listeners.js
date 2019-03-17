import scaleMap from "./scaleMap";
import * as globals from "./globals";
import appState from "./globals";
import addPost from "./addPost";
import addZone from "./addZone";
import request from "./request";
import displayPosts from "./displayPosts"
import app, {requestPosts} from "./app";

let ctrlPushed = false;
let altPushed = false;
var st = new appState();
var selectedNode = null;

export default function listeners(){
    
    // Ctrl key listener, pour utiliser avec le click lors de la création de documents
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    ctrlPushed = true;
	    // console.log(ctrlPushed);
	}
	if(event.altKey) {
	    altPushed = true;
	    // console.log(altPushed);
	}
	if(event.keyCode == 27) {
	    // console.log("esc called");
	    removeUIinput();    
	}
    }, false);

    window.addEventListener('keyup', (event) => {
	ctrlPushed = false;
	altPushed = false;
	// console.log(ctrlPushed);
    }, false);

    d3.select("body").select("svg")
	.on('mousemove', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));
	})
	.on('click', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));

	    if(ctrlPushed == true && altPushed == false && st.isCreating == false){ // si on peut créer un doc ET que la touche ctrl est enfoncée
		// si trop bas ou trop à droite, transformation
		addPost(st.currentPosition);
	    }
	    if(ctrlPushed == true && altPushed == true && st.isCreating == false){
		addZone(st.currentPosition);
	    }
	    return;
	});

    // on déclare le zoom
    var zoom = d3.behavior.zoom()
	.translate(globals.projection.translate())
	.scale(globals.projection.scale())
	// .wheelDelta(wheelDelta)
	.on("zoom", scaleMap);

    // puis on l'appelle
    d3.select("svg").call(zoom);
    d3.select("#articles").selectAll(".card").call(dragListener);
}


var dragListener = d3.behavior.drag()
    .on("dragstart", function(d) {
	st.draggingNode = true;
        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
    })
    .on("drag", function(d) {
	var card = d3.select(this);
	card.attr("transform", function(d) {
	    return "translate(" + globals.projection(st.currentPosition) + ")";
	    
	})
	console.log("Start dragging element")
    })
    .on("dragend", function(d) {
	var card = d3.select(this);
	var titleRaw = card.attr("id");
	console.log("Stop dragging element");

	// et là, on modifie la position dans le fichier lié à l'item draggé/droppé
	request("POST", "includes/UpdateMarkdownDocument.php", "titleraw="+titleRaw+"&newlongitude="+st.currentPosition[0]+"&newlatitude="+st.currentPosition[1], requestPosts);

    });

function endDrag() {
    selectedNode = null;
    if (st.draggingNode !== null) {
        st.draggingNode = null;
    }
}

function wheelDelta() {
    return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 1500;
}

export function removeUIinput(){
    // console.log("stop la création");
    var box = document.getElementById("input-container");
    box.parentNode.removeChild(box);
    d3.select("svg").selectAll(".creation-spot").remove();
    st.isCreating = false;
    return;
}
