import * as vars from "./vars";
import create from "./create";
import zoom from "./zoom";

vars.isCreating = false;
vars.ctrlPushed = false;

(function(window){
    
    // Data
    function reqListener () {
	console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        // console.log(JSON.parse(this.responseText));
	vars.content = JSON.parse(this.responseText);

	app();
	
	// reqListener();
    };
    oReq.open("get", "list-content.php", true);

    oReq.send();
    // reqListener();

    
})(window);

function app(){
    
    vars.g.append("rect")
	.attr("class", "background")
	.attr("width", vars.width)
	.attr("height", vars.height);
    

    function displayInformations(zoom){

	infos = document.getElementById("position");
	infos.value = vars.currentPosition[1].toFixed(4)+", "+vars.currentPosition[0].toFixed(4);

    }

    //////////////////////
    // Afficher la carte
    ////////////////////////

    d3.json(vars.mapPath, function(error, json) {
    	if (error) throw error;

	// console.log(json.features[1].geometry.type);
	
    	g.append("g")
    	    .attr("id", "states")
    	    .selectAll("path")
    	    .data(json.features)
    	    .enter().append("path")
    	    .attr("d", vars.path)
	    .attr("id", function(d,i){ return i})
	    .style("stroke", "#999999")
	    .style("fill", "rgba(255,255,255,0.5)");
    	// .on("click", clicked);

    	// On lance les fonctions une fois que la carte est chargée et affichée
    	createArticles(); // création des articles
    	createZones(); // création des titres de zones
	// createPoints(); // affiche les points et permet de vérifier le centrage des cartes.
    });

    /////////////////////////
    // Ajouter les articles
    //////////////////////////
    
    function createArticles(){
	
	g.append("g")
	    .attr("id", "articles")
	    .selectAll("rect")
	    .data(vars.content)
	    .enter().append("g")
	    .attr("class", "card")
	    .append("rect")
	    .attr("width", 96)
	    .attr("height", 128)
	    .attr("fill", "#FFFFFF")
	    .attr("opacity", "0")
	
	g.selectAll(".card")
	    .attr("transform", function(d) {
		var proj = projection([
		    d.location.longitude,
		    d.location.latitude
		])
		
		// La hauteur dynamique du contenant (.inner-card)
		var rectHeight = g.selectAll(".card").node().getBoundingClientRect().height
		
		return "translate(" + (proj[0]-(340/2)) +", "+(proj[1]-(rectHeight/2))+ ")";
	    })
	    .append("svg:foreignObject")
	    .attr("width", 340)
	    .attr("height", 800)
	    .append("xhtml:body")
 	    .attr("class", "inner-card")
	    .html(function(d) { return "<div class='title'><p>"+d.title+"</p>"; })
	    .append("div")
	    .attr("class", "content")

	drawContent();
    }

    /////////////////////////
    // Ajouter les points
    /////////////////////////
    
    function createPoints(){
	
	
	g.append("g")
	    .attr("id", "points")
	    .selectAll("text")
	    .data(vars.content)
	    .enter().append("circle")
	    .attr("class", "point")
	    .attr("r", 5)
	    .style("stroke", "#333333")
	    .style("fill", "#FFFFFF");

	g.selectAll(".point")
	    .attr("transform", function(d) {
		return "translate(" + projection([
		    d.location.longitude,
		    d.location.latitude
		]) + ")";
	    })	
    }

    
    /////////////////////////
    // Ajouter les zones
    /////////////////////////
    
    function createZones(){
	
	
	g.append("g")
	    .attr("id", "zones")
	    .selectAll("text")
	    .data(vars.zones)
	    .enter().append("g")
	    .attr("class", "zone")
	    .append("text")
	    .attr("font-family", "Liberation Mono")
	    .attr("font-size", "16px")
	    .attr("text-anchor", "middle")
	    .text(function(d){ return d.title})

	g.selectAll(".zone")
	    .attr("transform", function(d) {
		return "translate(" + projection([
		    d.location.longitude,
		    d.location.latitude
		]) + ")";
	    })	
    }

    //////////////////////////////////////////////////
    // affiche le contenu relatif au niveau de zooms
    //////////////////////////////////////////////////
    
    function drawContent(){

	// adapter l'opacité au niveau de zoom
	g.selectAll(".inner-card")
	    .attr("style", "opacity:"+scale(scaleFac, 1070, 10000, 0.15, 1)+";")
	
	if(scaleFac < 1300000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card sky")
	    g.selectAll(".content")
		.html(function(d) { return "<p></p>"; });
	}
	else if(scaleFac >= 1300000 && scaleFac < 5000000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card top")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.top+"</p><a href='article.php?path="+d.path+"'>Full article</a>"; });
	}
	else if(scaleFac >= 5000000 && scaleFac < 26000000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card middle")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.middle+"</p><a href='article.php?path="+d.path+"'>Full article</a>"; });
	}
	else if(scaleFac >= 26000000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card low")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.low+"</p><a href='article.php?path="+d.path+"'>Full article</a>"; });
	}


	var elem = g.selectAll(".inner-card");
	// console.log(elem.node().getBoundingClientRect());
	// console.log(selection.node().getBbox())

    }

    function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
	    var successful = document.execCommand('copy');
	    var msg = successful ? 'successful' : 'unsuccessful';
	    console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
	    console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
    }

    function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
	    fallbackCopyTextToClipboard(text);
	    return;
	}
	navigator.clipboard.writeText(text).then(function() {
	    console.log('Async: Copying to clipboard was successful!');
	}, function(err) {
	    console.error('Async: Could not copy text: ', err);
	});
    }
}



function requestCallback(text){
    // on relance app(), et on recharge tout
    app();
}

