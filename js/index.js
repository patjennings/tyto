var content;
var isCreating = false;
var ctrlPushed = false;

(function(window){
    
    // Data
    function reqListener () {
	console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        // console.log(JSON.parse(this.responseText));
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
	    title: "Plaine de la politique",
	    location: {
                latitude: 36.8675,
                longitude: 25.5300
            }
	},
	{
	    title: "Marais du sexy",
	    location: {
                latitude: 36.8811,
                longitude: 25.5327
            }
	},
	{
	    title: "Baie de l'intime",
	    location: {
                latitude: 36.8545,
                longitude: 25.5336
            }
	},
	{
	    title: "Forêt du nécessaire",
	    location: {
                latitude: 36.8765,
                longitude: 25.5173
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
    	.translate([ -214842.9723933363,336774.3379795616]);

    var currentPosition = [0, 0];

    var path = d3.geo.path()
	.projection(projection); 
    

    var zoom = d3.behavior.zoom()
	.translate(projection.translate())
	.scale(projection.scale())
    // .scaleExtent([480*height, 48000 * height])
	.on("zoom", zoomed);  
    
    var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.on('mousemove', function() {
	    // console.log( d3.mouse(this) ) // log the mouse x,y position
	    // console.log()
	    currentPosition = projection.invert(d3.mouse(this));
	    displayInformations(d3.event.scale)
	})
	.on('click', function() {
	    currentPosition = projection.invert(d3.mouse(this));

	    if(isCreating == false && ctrlPushed == true){ // si on peut créer un doc ET que la touche ctrl est enfoncée
		createDocument(currentPosition);
	    }
	});

    // Ctrl key listener, pour utiliser avec le click lors de la création de documents
    window.addEventListener('keydown', (event) => {
	if(event.ctrlKey) {
	    ctrlPushed = true;
	    console.log("ctrl enfoncé");
	}
    }, false);
    
    window.addEventListener('keyup', (event) => {
	
	ctrlPushed = false;
	console.log("toutes les touches relachées");
	
    }, false);

    var g = svg.append("g")
	.call(zoom);

    g.append("rect")
	.attr("class", "background")
	.attr("width", width)
	.attr("height", height);

    // listener pour copier les coordonnées
    window.addEventListener('keydown', (event) => {
	const nomTouche = event.key;

	console.log("touche pressée !");

	if (nomTouche === 'c') {
	    // Pas d'alerte si seule la touche Control est pressée.
	    copyTextToClipboard(currentPosition[1].toFixed(4)+", "+currentPosition[0].toFixed(4));
	}
	if (nomTouche === 't') {
	    // Pas d'alerte si seule la touche Control est pressée.
	    console.log("create it");
	}
    }, false);

    function displayInformations(zoom){

	// var t = d3.event.translate;
	// var s = d3.event.scale; 
	// projection.translate(t).scale(s);
	
	// console.log(coords);
	infos = document.getElementById("position");
	infos.value = currentPosition[1].toFixed(4)+", "+currentPosition[0].toFixed(4);
	
	// console.log(s);
    }

    function createDocument(currentPosition){
	var long = currentPosition[1];
	var lat = currentPosition[0];
	isCreating = true;

	console.log("ich bin");
	// create layer w/ input + save button
	var proj = projection([
	    lat,
	    long
	])
	var content = "";
	
	var elements = "<div id='input-container' style='transform: translate("+proj[0]+"px, "+proj[1]+"px);'><input id='content-title' placeholder='Titre'></input><textarea id='content-content' rows='6' placeholder='Contenu'>"+content+"</textarea><input id='content-position-long' type='hidden' value='"+long+"'/><input id='content-position-lat' type='hidden' value='"+lat+"'/><div class='btn-container'><button type='submit' value='ok' class='btn highlight' id='document-validate'>Valider</button><button value='cancel' class='btn' id='document-cancel'>Annuler</button></div></div>";
	
	$(".map").append(elements);
	saveDocument();
	
	// save/create file
    }

    function saveDocument(){
	var btnValidate = document.getElementById("document-validate");
	var btnCancel = document.getElementById("document-cancel");
	
	btnValidate.addEventListener('click', function() {
	    console.log("save file");

	    var titleValue = document.getElementById("content-title").value;
	    var longValue = document.getElementById("content-position-long").value;
	    var latValue = document.getElementById("content-position-lat").value;
	    var contentValue = document.getElementById("content-content").value;
	    var contentFormatted = "title: "+titleValue+"\nposition: "+longValue+", "+latValue+"\n\n---\n"+contentValue; // le title intégré dans la desc du markdown
	    
	    request("POST", "includes/saveMarkdownDocument.php", "title="+titleValue+"&content="+contentFormatted, requestCallback);
	}, false);
	
	btnCancel.addEventListener('click', function() {
	    var elem = document.getElementById("input-container");
	    elem.parentNode.removeChild(elem);
	    isCreating = false;
	    // console.log(this);
	}, false);
    }
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


// AJAX requests
function getRequestObject(){
    var o = null;
    if(window.XMLHttpRequest){
        o = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        try{
            o = new ActiveXObject('Msxml2.XMLHTTP');
        }catch(e1){
            try{
                o = new ActiveXObject('Microsoft.XMLHTTP');
            }catch(e2){

            }
        }
    }
    return o;
}

function request(method, uri, sendData, callback){
    var o = getRequestObject();
    var async = (callback!==null);
    var timestamp = new Date();
    var uniqueURI = uri+ (uri.indexOf("?") > 0 ? "&" : "?")+ "timestamp="+ timestamp.getTime();
    
    if(method === 'GET'){
        if(sendData!=null){uniqueURI+="?"+sendData;}
        o.open(method, uniqueURI, async);
        o.send(null);
    }else if(method === 'POST'){
        o.open(method, uniqueURI, async);
        o.setRequestHeader('Content-Type' , 'application/x-www-form-urlencoded');
        o.send(sendData);
    }
    if(async){
        o.onreadystatechange = function (){
            if(o.readyState==4&&o.status==200){
                callback(o.responseText);
                // console.log("Success");

            }else if(o.readyState==4&&o.status!=200){
                // console.log("Error")
            }
        };
    }
    if(async){return ;}
    else{return o.responseText;}
}

function requestCallback(text){
    // on relance app(), et on recharge tout
    app();
}

