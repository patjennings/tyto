var content;

(function(window){

    
    
    // Data
    function reqListener () {
      console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        console.log(JSON.parse(this.responseText));
	content = JSON.parse(this.responseText);

	app();
	
	// reqListener();
    };
    oReq.open("get", "list-content.php", true);

    oReq.send();
    // reqListener();
    
    

    
})(window);

function app(){
    var mapPath = "assets/schinoussa.geojson";
    var zones = [
	{
	    title: "C'est politique !",
	    location: {
                latitude: 36.8474,
                longitude: 25.5190
            }
	},
	{
	    title: "Sexy",
	    location: {
                latitude: 36.8831,
                longitude: 25.5264
            }
	}
    ];

    var scaleFac = 40000.503614997007;

    const scale = (num, in_min, in_max, out_min, out_max) => { // this is the map() function from processing
	return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    
    var width = screen.availWidth,
	height = screen.availHeight;

    var projection = d3.geo.mercator()
	.scale(485035.40798408084)
    	.translate([ -215452.9723933363,336604.3379795616]);
    // 485035.40798408084 /
    //

    var path = d3.geo.path()
	.projection(projection); 


    var zoom = d3.behavior.zoom()
	.translate(projection.translate())
	.scale(projection.scale())
	// .scaleExtent([480*height, 48000 * height])
	.on("zoom", zoomed);  
    
    var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

    var g = svg.append("g")
	.call(zoom);

    g.append("rect")
	.attr("class", "background")
	.attr("width", width)
	.attr("height", height);

    
    //////////////////////
    // Afficher la carte
    ////////////////////////

    d3.json(mapPath, function(error, json) {
    	if (error) throw error;

	// console.log(json.features[1].geometry.type);
	
    	g.append("g")
    	    .attr("id", "states")
    	    .selectAll("path")
    	    .data(json.features)
    	    .enter().append("path")
    	    .attr("d", path)
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
	    .data(content)
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

		// console.log(rectHeight);
	    
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
	    .data(content)
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
	    .data(zones)
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
		.html(function(d) { return "<p>"+d.content.top+"</p><a href='article.php'>Full article</a>"; });
	}
	else if(scaleFac >= 5000000 && scaleFac < 26000000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card middle")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.middle+"</p><a href='article.php'>Full article</a>"; });
	}
	else if(scaleFac >= 26000000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card low")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.low+"</p><a href='article.php'>Full article</a>"; });
	}


	var elem = g.selectAll(".inner-card");
	// console.log(elem.node().getBoundingClientRect());
	// console.log(selection.node().getBbox())

    }

    /////////////////////////////////////////////////////
    // Fonction qui gère l'affichage lors des zooms
    /////////////////////////////////////////////////////
    
    function zoomed() {

	var t = d3.event.translate;
	var s = d3.event.scale; 
	projection.translate(t).scale(s);

	// transforme les pays
	g.selectAll("path").attr("d", path);

	// var elem = g.selectAll(".card").text("toto");

	// console.log(d);
	
	// transforme les points au zoom et translate
	g.selectAll(".card").attr("transform", function(d) {
	    var proj = projection([
		d.location.longitude,
		d.location.latitude
	    ])
	    var rectHeight = g.selectAll(".inner-card").node().getBoundingClientRect().height // La hauteur dynamique du contenant (.inner-card)

	    console.log(rectHeight);
	    
	    return "translate(" + (proj[0]-(340/2)) +", "+(proj[1]-(rectHeight/2))+ ")";
	})
	g.selectAll(".zone").attr("transform", function(d) {
	    return "translate(" + projection([
		d.location.longitude,
		d.location.latitude
	    ]) + ")";
	})
	    .selectAll("text")
	    .attr("font-size", scale(s, 50000, 1536308, 12, 24)+"px");

	g.selectAll(".point").attr("transform", function(d) {
	    return "translate(" + projection([
		d.location.longitude,
		d.location.latitude
	    ]) + ")";
	})

	scaleFac = s;
	
	drawContent();

	// console.log(s+" / "+t);
    }
}
