import * as globals from "../globals";
import appState from "../globals";
// import mapScale from '../utils/mapScale';
import addArticle from '../addArticle';
import addZone from '../addZone';
import {updateArticles} from '../displayArticles';
import {updateZones} from '../displayZones';
import formattedDate from '../utils/formattedDate'
// import {paths} from '../conf/conf';
import Config from "Config";
import request from '../request';
import {requestPosts} from '../app';
import UIArticle from '../components/UIArticle';
// import {ctrlPushed, altPushed} from './actions'

// let ctrlPushed = false;
// let altPushed = false;
var st = new appState();
var selectedNode = null;
// let activeNode = null;

export default function mapActions(){
    d3.select("body").select("svg")
	.on('mousemove', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));
	    // console.log(activeNode.__data__._id);
	})
	.on('click', function() {
	    st.currentPosition = globals.projection.invert(d3.mouse(this));
	    if(st.isCtrlKeyPushed == true && st.isAltKeyPushed == false && st.isCreating == false){ 
		addArticle(st.currentPosition);
	    }
	    if(st.isCtrlKeyPushed == true && st.isAltKeyPushed == true && st.isCreating == false){
		addZone(st.currentPosition);
	    }
	    st.isCtrlKeyPushed = false;
	    st.isAltKeyPushed = false;
	    return;
	});

    // on déclare le zoom
    var zoom = d3.behavior.zoom()
	.translate(globals.projection.translate())
	.scale(globals.projection.scale())
	.on("zoom", mapScale);

    // puis on l'appelle
    d3.select("svg").call(zoom);

    // drag/drop des articles
    d3.select("#articles").selectAll(".card").select(".grip").call(dragListener);

    // relation entre les articles
    d3.select("#articles").selectAll(".card").select(".linker").call(linkListener);

    // ----------------
    // CLICK ON CARDS/ARTICLES
    // ----------------
    d3.selectAll(".card").select(".content")
	.on("click", d => {
	    UIArticle(d);	    
	})
	.on("mouseover", d => {
	    const item = d3.event.currentTarget.parentNode;
	    d3.select(item).classed("hover", true);
	    // activeNode = item;

	})
	.on("mouseout", d => {
	    const item = d3.event.currentTarget.parentNode;
	    d3.select(item).classed("hover", false);
	})

}
const dragListener = d3.behavior.drag()
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

	updateArticlePosition(d);
	
    });

let startLong, startLat;
const linkListener =  d3.behavior.drag()
      .on("dragstart", function(d) {
	  var card = d3.select(this.parentNode);
	  startLong = globals.projection(st.currentPosition)[0]
	  startLat = globals.projection(st.currentPosition)[1]
	  card.select(".linker")
	      .attr("r", 48)
	      .attr("opacity", "0.25")
	  card.classed("card isLinked", true)
          d3.event.sourceEvent.stopPropagation();
      })
      .on("drag", function(d) {
	  // remove previous line
	  d3.select("#link")
	      .remove()
	  
	  // draw line (current)
	  d3.select("svg")
	      .append('line')
	      .attr("id", "link")
	      .style("stroke", "#6666ff")
	      .style("stroke-width", 2)
	      .attr("x1", startLong)
	      .attr("y1", startLat)
	      .attr("x2", globals.projection(st.currentPosition)[0])
	      .attr("y2", globals.projection(st.currentPosition)[1]); 
    })
    .on("dragend", function(d) {
	d3.select("#link")
	    .remove()
    });

function updateArticlePosition(d){
    const moment = formattedDate();
    
    const data = {
	"location": {
	    "latitude": st.currentPosition[1],
	    "longitude": st.currentPosition[0]
	},
	"lastUpdated": {
	    "user": st.user,
	    "date": moment
	}
    }
    request("PUT",  Config.app.apiUrl+"/content/"+d._id, JSON.stringify(data), requestPosts);
}

function mapScale(){
    var t = d3.event.translate;
    var s = d3.event.scale; 
    globals.projection.translate(t).scale(s);

    st.scaleFac = s; // on actualise le facteur d'échelle
    
    // transforme les pays
    d3.select("svg").selectAll("path").attr("d", globals.pathProjection);
    
    updateArticles();
    updateZones();

    d3.select("svg").selectAll(".creation-spot").attr("transform", function() {
	return "translate(" + globals.projection([
	    d3.select(this).attr("latitude"),
	    d3.select(this).attr("longitude")
	]) + ")";
    })
    
}
