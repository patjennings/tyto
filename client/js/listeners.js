import zoomed from "./zoom";
import * as vars from "./vars";
import appState from "./vars";
import addContent from "./addContent";

let ctrlPushed = false;

var st = new appState();

var selectedNode = null;

export default function listeners(){
    
    // Ctrl key listener, pour utiliser avec le click lors de la création de documents
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    ctrlPushed = true;	    
	}	
    }, false);

    window.addEventListener('keyup', (event) => {
	ctrlPushed = false;	
    }, false);

    d3.select("body").select("svg")
	.on('mousemove', function() {
	    st.currentPosition = vars.projection.invert(d3.mouse(this));
	    // console.log(st.currentPosition);
	    // console.log(">>>>>> "+ctrlPushed);
	})
	.on('click', function() {
	    st.currentPosition = vars.projection.invert(d3.mouse(this));

	    if(ctrlPushed == true && st.isCreating == false){ // si on peut créer un doc ET que la touche ctrl est enfoncée
		addContent(st.currentPosition);
	    }
	});

    // on déclare le zoom
    var zoom = d3.behavior.zoom()
	.translate(vars.projection.translate())
	.scale(vars.projection.scale())
	.on("zoom", zoomed);

    // puis on l'appelle
    vars.g.call(zoom);

    vars.g.selectAll(".card").call(dragListener);
}


var dragListener = d3.behavior.drag()
    .on("dragstart", function(d) {
	st.draggingNode = true;
        d3.event.sourceEvent.stopPropagation();
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
    })
    .on("drag", function(d) {
	console.log(d);
    })
    .on("dragend", function(d) {
	console.log("end drag");
    });

function endDrag() {
    selectedNode = null;
    if (st.draggingNode !== null) {
        st.draggingNode = null;
    }
}
