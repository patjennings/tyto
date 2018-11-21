(function(window){

    var content = [
        {
            name: "Banks in the service of the NRA",
	    content: {
		top: "Cuomo is using strained argument... further regulation of guns",
		middle: "New York Governor Cuomo is using strained arguments... I also support further regulation of guns... I would also support a campaign calling on an insurance company to refuse to work with the NRA to sell insurance to other parties",
		low: " New York Governor Cuomo is using strained arguments to pressure banks to stop serving the NRA. This reminds me of how US marijuana businesses find it impossible to get bank accounts. I support petition campaigns calling on companies to break their special deals with the NRA. These campaigns follow a legitimate pathway. I also support further regulation of guns, including prohibition of high-velocity rifles (often called \"assault weapons\") and large magazines. I would also support a campaign calling on an insurance company to refuse to work with the NRA to sell insurance to other parties. (It sounds like that's what the insurance company is doing.) However, the state should not pressure banks or insurance companies to refuse to provide lawful services to the NRA, or to any other lawful organization, based on what it stands for. "
	    },
            location: {
                latitude: 30.975441,
                longitude: -90
            }
        },
	{
	    name: "Pablo Servigne : ' Il faut élaborer une politique de l’effondrement '",
	    content: {
		top: "l’étude de l’effondrement... La perspective de l’effondrement du monde peut être un puissant stimulant à l’action... l’autre loi de la jungle",
		middle: "La perspective de l’effondrement du monde peut être un puissant stimulant à l’action. Et permettre de tourner la page du capitalisme et de la société thermo-industrielle, qui ravagent le monde. Il reste à définir les modes d’action... Chercheur indépendant, essayiste, son domaine d’étude est principalement ce qu’il appelle la ' collapsologie ', l’étude de l’effondrement",
		low: " La perspective de l’effondrement du monde peut être un puissant stimulant à l’action. Et permettre de tourner la page du capitalisme et de la société thermo-industrielle, qui ravagent le monde. Il reste à définir les modes d’action. C’est ce qu’explique Pablo Servigne dans cet entretien. Malgré la barbe, Pablo Servigne ne fait pas ses 40 ans. Depuis le succès de son ouvrage Comment tout peut s’effondrer, paru en 2015 au Seuil et coécrit avec Raphaël Stevens, les demandes de conférences pleuvent, la notoriété croît. Chercheur indépendant, essayiste, son domaine d’étude est principalement ce qu’il appelle la ' collapsologie ', l’étude de l’effondrement. Il s’est aussi attaché à contrer l’idéologie compétitive ambiante dans L’Entraide, l’autre loi de la jungle, coécrit avec Gauthier Chapelle et publié en 2017 aux éditions Les Liens qui libèrent. Ses deux compagnons de route et lui viennent de publier la suite du livre sur l’effondrement. Dans Une autre fin du monde est possible, ils mêlent travaux issus des sciences ' dures ', philosophie et spiritualité pour trouver une posture d’action face à l’effondrement annoncé. "
	    },
            location: {
		latitude: 29.975441,
		longitude: -88
            }
	}
    ];

    var scaleFac = 1070;
    
    var width = screen.availWidth,
	height = screen.availHeight;

    var projection = d3.geo.albersUsa()
	.scale(scaleFac)
	.translate([width / 2, height / 2]);

    var path = d3.geo.path()
	.projection(projection);

    var zoom = d3.behavior.zoom()
	.translate(projection.translate())
	.scale(projection.scale())
    // .scaleExtent([height, 8 * height])
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

    
    // svg.selectAll("body")

    // Ajouter la carte
    d3.json("assets/us.json", function(error, us) {
	if (error) throw error;

	g.append("g")
	    .attr("id", "states")
	    .selectAll("path")
	    .data(topojson.feature(us, us.objects.states).features)
	    .enter().append("path")
	    .attr("d", path)
	// .on("click", clicked);

	g.append("path")
	    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
	    .attr("id", "state-borders")
	    .attr("d", path);

	createPlaces(); // On lance la fonction une fois que la carte est chargée et affichée
    });

    // function createPlaces(){
    // 	// Ajouter les places
    // 	g.append("g")
    // 	    .attr("id", "places")
    // 	    .selectAll("rect")
    // 	    .data(content)
    // 	    .enter().append("g")
    // 	    .attr("class", "card")
    // 	    .append("rect")
    // 	    .attr("width", 96)
    // 	    .attr("height", 128)
    // 	    .attr("fill", "#FFFFFF")
    // 	    .attr("stroke", "#000000");
    
    // 	// .classed("zoomable", true)
    // 	g.selectAll(".card")
    // 	    .attr("transform", function(d) {
    // 		return "translate(" + projection([
    // 		    d.location.longitude,
    // 		    d.location.latitude
    // 		]) + ")";
    // 	    })
    // 	    .append("text")
    // 	    .attr("width", 96)
    // 	    .attr("class", "title")
    // 	    .append("textspan")
    // 	    .text(function(d) { return d.name; });
    // }

    function createPlaces(){
	// Ajouter les places
	g.append("g")
	    .attr("id", "places")
	    .selectAll("rect")
	    .data(content)
	    .enter().append("g")
	    .attr("class", "card")
	    .append("rect")
	    .attr("width", 96)
	    .attr("height", 128)
	    .attr("fill", "#FFFFFF")
	    .attr("opacity", "0")
	// .attr("stroke", "#000000");
	
	// .classed("zoomable", true)
	g.selectAll(".card")
	    .attr("transform", function(d) {
		return "translate(" + projection([
		    d.location.longitude,
		    d.location.latitude
		]) + ")";
	    })
	    .append("svg:foreignObject")
	// .attr("x", 0)
	// .attr("y", 0)
	    .attr("width", 340)
	    .attr("height", 800)
	    .append("xhtml:body")
 	    .attr("class", "inner-card")
	    .html(function(d) { return "<div class='title'><p>"+d.name+"</p>"; })
	    .append("div")
	    .attr("class", "content")

	drawContent();

	// console.log(scaleFac);
    }
    

    // function clicked(d) {
    // 	var centroid = path.centroid(d),
    // 	    translate = projection.translate();

    // 	projection.translate([
    // 	    translate[0] - centroid[0] + width / 2,
    // 	    translate[1] - centroid[1] + height / 2
    // 	]);

    // 	zoom.translate(projection.translate());

    // 	g.selectAll("path").transition()
    // 	    .duration(700)
    // 	    .attr("d", path);
    // }

    function zoomed() {

	var t = d3.event.translate;
	var s = d3.event.scale; 
	projection.translate(t).scale(s);

	// transforme les pays
	g.selectAll("path").attr("d", path);

	// transforme les points au zoom et translate
	g.selectAll(".card").attr("transform", function(d) {
	    return "translate(" + projection([
		d.location.longitude,
		d.location.latitude
	    ]) + ")";
	})
	
	console.log(s);
	scaleFac = s;
	
	drawContent();
    }

    // affiche le contenu relatif au niveau de zoom
    function drawContent(){
	if(scaleFac < 1000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card sky")
	    g.selectAll(".content")
		.html(function(d) { return "<p></p>"; });
	}
	else if(scaleFac >= 1000 && scaleFac < 8000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card top")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.top+"</p><a href='article.php?title="+d.name+"&content="+d.content.low+"'>Full article</a>"; });
	}
	else if(scaleFac >= 8000 && scaleFac < 60000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card middle")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.middle+"</p><a href='article.php?title="+d.name+"&content="+d.content.low+"'>Full article</a>"; });
	}
	else if(scaleFac >= 60000){
	    g.selectAll(".inner-card")
		.attr("class", "inner-card low")
	    g.selectAll(".content")
		.html(function(d) { return "<p>"+d.content.low+"</p><a href='article.php?title="+d.name+"&content="+d.content.low+"'>Full article</a>"; });
	}

    }
    
})(window);
