import * as globals from "../globals";

export default function UISpotCreation(color, latitude, longitude){
    // point où la zone sera créée
    d3.select("svg")
	.append("g")
	.attr("longitude", longitude)
    	.attr("latitude", latitude)
	.attr("class", "creation-spot")
	.attr("transform", function() {
	    var proj = globals.projection([
		latitude,
		longitude
	    ])
	    return "translate(" + (proj[0]) +", "+(proj[1])+ ")";
	})
    d3.select(".creation-spot").append("circle")
    	.attr("cx", 0)
    	.attr("cy", 0)
    	.attr("r", 4)
    	.attr("fill", color)
    d3.select(".creation-spot").append("circle")
    	.attr("r", 24)
	.attr("fill", color)
	.attr("opacity", 0.2)
}
