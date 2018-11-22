(function(window){

    var mapPath = "assets/schinoussa.geojson";
    var zones = [
	{
	    name: "C'est politique !",
	    location: {
                latitude: 36.8474,
                longitude: 25.5190
            }
	},
	{
	    name: "Sexy",
	    location: {
                latitude: 36.8831,
                longitude: 25.5264
            }
	}
    ];
    
    var content = [
        {
	    id: 0,
	    name: "Banks in the service of the NRA",
	    content: {
		top: "Cuomo is using strained argument... further regulation of guns",
		middle: "New York Governor Cuomo is using strained arguments... I also support further regulation of guns... I would also support a campaign calling on an insurance company to refuse to work with the NRA to sell insurance to other parties",
		low: " New York Governor Cuomo is using strained arguments to pressure banks to stop serving the NRA. This reminds me of how US marijuana businesses find it impossible to get bank accounts. I support petition campaigns calling on companies to break their special deals with the NRA. These campaigns follow a legitimate pathway. I also support further regulation of guns, including prohibition of high-velocity rifles (often called \"assault weapons\") and large magazines. I would also support a campaign calling on an insurance company to refuse to work with the NRA to sell insurance to other parties. (It sounds like that's what the insurance company is doing.) However, the state should not pressure banks or insurance companies to refuse to provide lawful services to the NRA, or to any other lawful organization, based on what it stands for. "
	    },
            location: {
                latitude: 36.8714,
                longitude: 25.5099
            },
	    relations: [
		{id:0},
		{id:2},
		{id:5}
	    ]
        },
	{
	    id: 1,
	    name: "Pablo Servigne : ' Il faut élaborer une politique de l’effondrement '",
	    content: {
		top: "l’étude de l’effondrement... La perspective de l’effondrement du monde peut être un puissant stimulant à l’action... l’autre loi de la jungle",
		middle: "La perspective de l’effondrement du monde peut être un puissant stimulant à l’action. Et permettre de tourner la page du capitalisme et de la société thermo-industrielle, qui ravagent le monde. Il reste à définir les modes d’action... Chercheur indépendant, essayiste, son domaine d’étude est principalement ce qu’il appelle la ' collapsologie ', l’étude de l’effondrement",
		low: " La perspective de l’effondrement du monde peut être un puissant stimulant à l’action. Et permettre de tourner la page du capitalisme et de la société thermo-industrielle, qui ravagent le monde. Il reste à définir les modes d’action. C’est ce qu’explique Pablo Servigne dans cet entretien. Malgré la barbe, Pablo Servigne ne fait pas ses 40 ans. Depuis le succès de son ouvrage Comment tout peut s’effondrer, paru en 2015 au Seuil et coécrit avec Raphaël Stevens, les demandes de conférences pleuvent, la notoriété croît. Chercheur indépendant, essayiste, son domaine d’étude est principalement ce qu’il appelle la ' collapsologie ', l’étude de l’effondrement. Il s’est aussi attaché à contrer l’idéologie compétitive ambiante dans L’Entraide, l’autre loi de la jungle, coécrit avec Gauthier Chapelle et publié en 2017 aux éditions Les Liens qui libèrent. Ses deux compagnons de route et lui viennent de publier la suite du livre sur l’effondrement. Dans Une autre fin du monde est possible, ils mêlent travaux issus des sciences ' dures ', philosophie et spiritualité pour trouver une posture d’action face à l’effondrement annoncé. "
	    },
            location: {
		latitude: 36.8609,
		longitude: 25.5374
            },
	    relations: [
		{id:6},
	    ]
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
	.scaleExtent([512*height, 48000 * height])
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
    
    // d3.json(mapPath, function(error, json) {
    // 	if (error) throw error;

    // 	g.append("g")
    // 	    .attr("id", "states")
    // 	    .selectAll("path")
    // 	    .data(topojson.feature(json, json.objects.states).features)
    // 	    .enter().append("path")
    // 	    .attr("d", path)
    // 	// .on("click", clicked);

    // // 	// g.append("path")
    // // 	//     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    // // 	//     .attr("id", "state-borders")
    // // 	//     .attr("d", path);
    

    // 	// On lance les fonctions une fois que la carte est chargée et affichée
    // 	createArticles(); // création des articles
    // 	createZones(); // création des titres de zones
    // });

    // d3.json(mapPath, function(error, json) {
    // 	if (error) throw error;

    // 	g.append("g")
    // 	    .attr("id", "states")
    // 	    .selectAll("path")
    // 	    .data(json.features)
    // 	    .enter().append("path")
    // 	    .attr("d", path)
    // 	    .style("stroke", "steelblue")
    // 	    .style("fill", "none");
    // 	// .on("click", clicked);

    // 	// var toto = data(json.bbox).enter();
    // 	// console.log(toto);

    // 	// On lance les fonctions une fois que la carte est chargée et affichée
    // 	createArticles(); // création des articles
    // 	createZones(); // création des titres de zones
    // });


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
    });
    // var thepath = g.selectAll("#states");
    
    // // Compute the bounds of a feature of interest, then derive scale & translate.
    // var b = path.bounds(thepath),
    // 	s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    // 	t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    // // Update the projection to use computed scale & translate.
    // projection
    // 	.scale(scaleFac)
    // 	.translate(positionInit);
    //Load in GeoJSON data

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
		return "translate(" + projection([
		    d.location.longitude,
		    d.location.latitude
		]) + ")";
	    })
	    .append("svg:foreignObject")
	    .attr("width", 340)
	    .attr("height", 800)
	    .append("xhtml:body")
 	    .attr("class", "inner-card")
	    .html(function(d) { return "<div class='title'><p>"+d.name+"</p>"; })
	    .append("div")
	    .attr("class", "content")

	drawContent();
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
	    .text(function(d){ return d.name})

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
		.html(function(d) { return "<p>"+d.content.top+"</p><a href='article.php?title="+d.name+"&content="+d.content.low+"'>Full article</a>"; });
	}
	else if(scaleFac >= 5000000 && scaleFac < 26000000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card middle")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.middle+"</p><a href='article.php?title="+d.name+"&content="+d.content.low+"'>Full article</a>"; });
	}
	else if(scaleFac >= 26000000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card low")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.low+"</p><a href='article.php?title="+d.name+"&content="+d.content.low+"'>Full article</a>"; });
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
	    .attr("font-size", scale(s, 50000, 1536308, 12, 24)+"px")

	scaleFac = s;
	
	drawContent();

	// console.log(s+" / "+t);
    }

    
})(window);
