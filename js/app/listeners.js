import zoomed from "./zoom";
import * as vars from "./vars";
import appState from "./vars";
import create from "./create";

let ctrlPushed = false;

var st = new appState();

export default function listeners(){
    
    // Ctrl key listener, pour utiliser avec le click lors de la création de documents
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    ctrlPushed = true;
	    
	}

	
    }, false);

    
    //
    window.addEventListener('keyup', (event) => {
	ctrlPushed = false;
	
    }, false);

    d3.select("body").select("svg")
	.on('mousemove', function() {
	    st.currentPosition = vars.projection.invert(d3.mouse(this));
	    console.log(st.currentPosition);
	    console.log(">>>>>> "+ctrlPushed);
	})
	.on('click', function() {
	    st.currentPosition = vars.projection.invert(d3.mouse(this));

	    if(ctrlPushed == true){ // si on peut créer un doc ET que la touche ctrl est enfoncée
	    create(st.currentPosition);
	}
	});

    // on déclare le zoom
    var zoom = d3.behavior.zoom()
	.translate(vars.projection.translate())
	.scale(vars.projection.scale())
	.on("zoom", zoomed);

    // puis on l'appelle
     vars.g.call(zoom);
}

