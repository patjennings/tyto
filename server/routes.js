var models =       require("./mongo"); // le modèle mongodb
var path =         require("path");
var express =      require("express");
var crypto =       require("crypto");
var cookieParser = require("cookie-parser");
var emailjs =   require("emailjs/email");

var validatePassword = require("./utils/validation").validatePassword;
var saltAndHash =      require("./utils/validation").saltAndHash;

// une focntion pour traiter/retourner la date

// fontion pour découper le markdown aux différents niveaux et retourner les niveaux
var sliceMarkdown = require("./utils/markdownProcessing").sliceMarkdown;

var generateKey = require("./utils/validation").generateKey;

// const APP_ROOT = "http://pisteurdetemps.thomasguesnon.net";

module.exports = function(app){

    // folders
    app.use("/styles", express.static(path.resolve(".") + '/dist/css')); 
    app.use("/dist", express.static(path.resolve(".") + '/dist'));
    app.use("/assets", express.static(path.resolve(".") + '/dist/assets')); 

    function nocache(req, res, next) {
	console.log("NO CAAAACHE");
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
    }

    app.get("/", nocache, function(req, res) {
	res.render('app', {title: "Tyto"});
    });

    // users. Pas de put ou de delete, on gère ça directement dans la base
    app.get('/users', nocache, function(req, res) {
	var response = {};
	response = {"message" : "Trouver les users"};
	res.json(response);
    });
    app.get('/user/:id', nocache, function(req, res) {
	var response = {};
	response = {"message" : "Trouver le user "+req.params.id};
	res.json(response);
    });
    app.post('/user/:id', nocache, function(req, res) {
	var response = {};
	response = {"message" : "Updater le user "+req.params.id};
	res.json(response);
    });

    // spaces et accès aux contenus par les spaces (que du get)
    app.get('/spaces', nocache, function(req, res) {
	var response = {};
	models.spaces.find({},function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = {"error" : false, "message" : data };
	    }
	    res.json(response);
	});
    });
    app.get('/:spaceid/content', nocache, function(req, res) {
	var response = {};
	models.content.find({ space : req.params.spaceid },function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = {"error" : false, "message" : data };
	    }
	    res.json(response);
	});
    });
    app.get('/:spaceid/export', nocache, function(req, res) {
	// on crée un dossier sur le serveur, avec un nom généré
	// on prend tous les contenus du space renseigné
	// on crée les fichiers markdown
	// on crée une archive, on les y colle 
	// on télécharge l'archive sur l'ordi du client
    });
    app.get('/:spaceid/zones', nocache, function(req, res) {
	var response = {};
	models.zones.find({ space : req.params.spaceid },function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = {"error" : false, "message" : data };
	    }
	    res.json(response);
	});
    });

    // spaces, gestion
    app.get('/space/:id', nocache, function(req, res) {
	var response = {};
	models.spaces.find({ _id : req.params.id },function(err,data){
	    if(err) {
		response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		response = {"error" : false, "message" : data };
	    }
	    res.json(response);
	});
    });
    app.post('/space/:id', nocache, function(req, res) {
	// on crée un nouveau space si le nom n'existe pas déjà
    });
    app.put('/space/:id', nocache, function(req, res) {
	
    });
    app.delete('/space/:id', nocache, function(req, res) {
	
    });

    // content
    app.get('/content/:id', nocache, function(req, res) {
	var response = {};
	models.content.findById(req.params.id, function(err,data){
	    if(err){
		response = {"error" : true, "message" : "Error retrieving data"};
	    } else {
		response._id = data._id;
		response.title = data.title;
		response.created = data.created;
		response.lastUpdated = data.lastUpdated;
		response.content = data.content; // on écrit en markdown
		response.tags = data.tags;
		response.location = data.location;
		response.relations = data.relations;
		response.space = data.space;
	    }
	    res.send(response);
        });
	
    });
    app.post('/content/:id', nocache, function(req, res) {
	// on ajoute un post
	// on met:
	//     - title
	//     -created > user, date
	// - le contenu aux niveaux de zoom // en markdown
	// - les tags
	// - la location lat long
	// - l'id du space
	
	var response = {}
	response = sliceMarkdown("mon contenu");
	res.send(response);
    });
    app.put('/content/:id', nocache, function(req, res) {
	// on update :
	// - le title
	// - lastUpdated > user, date
	// - le nouveau content découpé auuxnivde zoom
	// - les tags
	// - la nouvelle location lat long
    });
    app.delete('/content/:id', nocache, function(req, res) {
	
    });

    // zones
    app.get('/zones/:id', nocache, function(req, res) {
	//
    });
    app.post('/zones/:id', nocache, function(req, res) {
	//
    });
    app.put('/zones/:id', nocache, function(req, res) {
	//
    });
    app.delete('/zones/:id', nocache, function(req, res) {
	//
    });
}
