import zoomed from "./zoom";
import * as vars from "./vars";
import appState from "./vars";
import addContent from "./addContent";
import addZone from "./addZone";
import request from "./request";
import app from "./app";

let ctrlPushed = false;
let altPushed = false;

var st = new appState();

var selectedNode = null;

export default function listeners(){
    
    // Ctrl key listener, pour utiliser avec le click lors de la création de documents
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    ctrlPushed = true;
	    console.log(ctrlPushed);
	}
	if(event.altKey) {
	    altPushed = true;
	    console.log(altPushed);
	}
	if(event.keyCode == 27) {
	    console.log("esc called");
	    removeAddBox();    
	}
    }, false);

    window.addEventListener('keyup', (event) => {
	ctrlPushed = false;
	altPushed = false;
	console.log(ctrlPushed);
    }, false);

    // clicke sur les liens vers les articles
    // d3.select("svg")
    // d3.selectAll(".link")
    // 	.on('click', function() {
    // 	    console.log(d3.select(this).attr("href"))
    // 	    var url = "article.php?path=";
    //         url += d3.select(this).attr("href");
    //         $(location).attr('href', url);
    //         window.location = url;  
    // 	});
    

    d3.select("body").select("svg")
	.on('mousemove', function() {
	    st.currentPosition = vars.projection.invert(d3.mouse(this));
	    // console.log("position géographique :"+st.currentPosition);
	    // console.log("position écran :"+vars.projection(st.currentPosition));
	    // console.log("=======");
	    // console.log(">>>>>> "+ctrlPushed);
	})
	.on('click', function() {
	    st.currentPosition = vars.projection.invert(d3.mouse(this));

	    if(ctrlPushed == true && altPushed == false && st.isCreating == false){ // si on peut créer un doc ET que la touche ctrl est enfoncée
		console.log("here");
		addContent(st.currentPosition);
	    }
	    if(ctrlPushed == true && altPushed == true && st.isCreating == false){
		console.log("here");
		addZone(st.currentPosition);
	    }
	    return;
	});

    // on déclare le zoom
    var zoom = d3.behavior.zoom()
	.translate(vars.projection.translate())
	.scale(vars.projection.scale())
	// .wheelDelta(wheelDelta)
	.on("zoom", zoomed);

    // puis on l'appelle
    d3.select("svg").call(zoom);
    d3.select("svg").selectAll(".card").call(dragListener);
}

function control(){
    console.log("click listener ok");
}


var dragListener = d3.behavior.drag()
    .on("dragstart", function(d) {
	st.draggingNode = true;
        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
    })
    .on("drag", function(d) {
	// console.log(d);
	var card = d3.select(this);
	card.attr("transform", function(d) {
	    return "translate(" + vars.projection(st.currentPosition) + ")";
	    
	})
    })
    .on("dragend", function(d) {
	var card = d3.select(this);
	var titleRaw = card.attr("id");
	// console.log();

	// et là, on modifie la position dans le fichier lié à l'item draggé/droppé
	request("POST", "includes/UpdateMarkdownDocument.php", "titleraw="+titleRaw+"&newlongitude="+st.currentPosition[0]+"&newlatitude="+st.currentPosition[1], app);

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

function removeAddBox(){
    var box = document.getElementById("input-container");
    box.parentNode.removeChild(box);
    st.isCreating = false;
    return;
}
