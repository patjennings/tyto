/////////////////////////
// Ajouter les points
/////////////////////////

export default function createPoints(){
    
    vars.g.append("g")
	.attr("id", "points")
	.selectAll("text")
	.data(vars.content)
	.enter().append("circle")
	.attr("class", "point")
	.attr("r", 5)
	.style("stroke", "#333333")
	.style("fill", "#FFFFFF");

    vars.g.selectAll(".point")
	.attr("transform", function(d) {
	    return "translate(" + projection([
		d.location.longitude,
		d.location.latitude
	    ]) + ")";
	})	
}
