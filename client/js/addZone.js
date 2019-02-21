import * as vars from "./vars";
import appState from "./vars";
import request from './request';
import app from './app';
import addBox from './addBox';

let isCreating = null;
var st = new appState();
// var simplemde;

export default function create(currentPosition){
    var long = currentPosition[1];
    var lat = currentPosition[0];
    st.isCreating = true;

// point où la zone sera créée
    d3.select("svg")
	.append("g")
	.attr("longitude", long)
    	.attr("latitude", lat)
	.attr("class", "creation-spot")
	.attr("transform", function() {
	    var proj = vars.projection([
		lat,
		long
	    ])
	    
	    // La hauteur dynamique du contenant (.inner-card)
	    // var itemHeight = d3.select("svg").selectAll(".card").node().getBoundingClientRect().height
	    
	    return "translate(" + (proj[0]) +", "+(proj[1])+ ")";
	})
    d3.select(".creation-spot").append("circle")
    	.attr("cx", 0)
    	.attr("cy", 0)
    	.attr("r", 4)
    	.attr("fill", "#FFFF00")
    d3.select(".creation-spot").append("circle")
    	.attr("r", 16)
	.attr("fill", "#FFFF00")
	.attr("opacity", 0.2)
    
    // create layer w/ input + save button
    var proj = vars.projection([
	lat,
	long
    ])
    // var content = "";

    var elements = addBox("zone", proj, long, lat);
    
    $(".map").append(elements);
    save();
 
}


function save(){
    var btnValidate = document.getElementById("document-validate");
    var btnCancel = document.getElementById("document-cancel");
    
    btnValidate.addEventListener('click', function() {
	console.log("save zone");

	var titleValue = document.getElementById("content-title").value;
	var longValue = document.getElementById("content-position-long").value;
	var latValue = document.getElementById("content-position-lat").value;
	// var contentValue = simplemde.value();
	// var contentFormatted = "title: "+titleValue+"\nposition: "+latValue+", "+longValue+"\n\n---\n"+contentValue; // le title intégré dans la desc du markdown
	
	request("POST", "includes/SaveZone.php", "title="+titleValue+"&latitude="+latValue+"&longitude="+longValue, app);
    }, false);
    
    btnCancel.addEventListener('click', function() {
	var elem = document.getElementById("input-container");
	elem.parentNode.removeChild(elem);
	st.isCreating = false;
	// console.log(this);
    }, false);
}
