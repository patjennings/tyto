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
	// console.log("NO CAAAACHE");
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
	// on update un space
    });
    app.delete('/space/:id', nocache, function(req, res) {
	// on delete un space
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
		response.titleRaw = data.titleRaw;
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
    app.post('/content', nocache, function(req, res) {
	var db = new models.content(); // on crée ce nouvel objet models pour accéder au schéma
	var response = {};

	db.title = req.body.title;
	db.titleRaw = req.body.titleRaw;
	db.content = req.body.content;
	db.location = req.body.location;
	db.created = req.body.created;
	db.lastUpdated = req.body.lastUpdated;
	db.tags = req.body.tags;
	db.space = req.body.space;
	db.relations = req.body.relations;

	db.save(function(err, db){
	    // save() will run insert() command of MongoDB.
	    if(err) {
		response = {"error" : true, "message" : "Error adding data"};
	    } else {
		response = {"error" : false, "message" : "Content added", "data" : db};
	    }
	    res.json(response);
	});
    });
    app.put('/content/:id', nocache, function(req, res) {
	var response = {};
	models.content.findById(req.params.id, function(err,data){
	    if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
	    } else {
		if (req.body.title !== undefined) {
		    data.title = req.body.title;
		}
		if (req.body.titleRaw !== undefined) {
		    data.titleRaw = req.body.titleRaw;
		}
		if (req.body.content !== undefined) {
		    data.content = req.body.content;
		}
		if (req.body.location !== undefined) {
		    data.location = req.body.location;
		}
		if (req.body.created !== undefined) {
		    data.created = req.body.created;
		}
		if (req.body.lastUpdated !== undefined) {
		    data.lastUpdated = req.body.lastUpdated;
		}
		if (req.body.tags !== undefined) {
		    data.tags = req.body.tags;
		}
		if (req.body.space !== undefined) {
		    data.space = req.body.space;
		}
		if (req.body.relations !== undefined) {
		    data.relations = req.body.relations;
		}
		// Save data
		data.save(function(err, data){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "content is updated for "+req.params.id, "data" : data };
                    }
		    res.json(response);
		})
	    }
        });
    });
    app.delete('/content/:id', nocache, function(req, res) {
	var response = {};
	console.log("delete sent");
	models.content.findById(req.params.id, function(err,data){
	    if(err){
		response = {"error" : true,"message" : "Error retrieving data"};
	    } else {
		models.content.deleteOne({ _id : req.params.id}, function(err, obj){
		    if(err){
			response = {"error" : true, "message" : "Error while deleting content"};
		    } else {
			response = {"error" : false, "message" : "content is removed"};
		    }
		});
	    }
	    res.send(response);
        });
    });

    // zones
    app.get('/zones/:id', nocache, function(req, res) {
	//
    });
    app.post('/zones', nocache, function(req, res) {
	var db = new models.zones(); // on crée ce nouvel objet models pour accéder au schéma
	var response = {};

	db.title = req.body.title;
	db.location = req.body.location;
	db.created = req.body.created;
	db.lastUpdated = req.body.lastUpdated;
	db.space = req.body.space;

	db.save(function(err, db){
	    // save() will run insert() command of MongoDB.
	    if(err) {
		response = {"error" : true, "message" : "Error adding data"};
	    } else {
		response = {"error" : false, "message" : "Content added", "data" : db};
	    }
	    res.json(response);
	});
    });
    app.put('/zones/:id', nocache, function(req, res) {
	//
    });
    app.delete('/zones/:id', nocache, function(req, res) {
	//
    });
}
