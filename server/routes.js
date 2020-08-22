var models =       require("./mongo"); // le modèle mongodb
var path =         require("path");
var express =      require("express");
var crypto =       require("crypto");
var cookieParser = require("cookie-parser");
var emailjs =   require("emailjs/email");

var ct = require('./modules/country-list');
var am = require('./modules/account-manager');
var em = require('./modules/email-dispatcher');

module.exports = function(app) {

    // folders
    app.use("/styles", express.static(path.resolve(".") + '/dist/css')); 
    app.use("/dist", express.static(path.resolve(".") + '/dist'));
    app.use("/assets", express.static(path.resolve(".") + '/dist/assets'));
    
    function nocache(req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
    }
    /*
      login & logout
    */

    app.get('/', function(req, res){
    	console.log("GET /");
    	// console.debug(req.cookies.login+" ///// "+res);
    	// check if the user has an auto login key saved in a cookie //
    	if (req.cookies.login == undefined){
    	    res.render('login', { title: 'Bijour - Please Login To Your Account' });
    	}
    	else{
    	    // attempt automatic login //
    	    am.validateLoginKey(req.cookies.login, req.ip, function(e, o){
    		if (o){
    		    am.autoLogin(o.user, o.pass, function(o){
    			req.session.user = o;
			// console.log(o);
    			res.redirect('/app');
    		    });
    		}
    		else{
    		    res.render('login', { title: 'Bijour - Please Login To Your Account' });
    		}
    	    });
    	}
    });
    
    app.post('/', function(req, res){
    	console.log("POST / (this is login ?)");
    	am.manualLogin(req.body['user'], req.body['pass'], function(e, o){
    	    console.log(req.session);
    	    if (!o){
    		res.status(400).send(e);
    	    }
    	    else{
    		req.session.user = o;
    		console.log(req.session);
    		if (req.body['remember-me'] == 'false'){
    		    res.status(200).send(o);
    		}
    		else{
    		    am.generateLoginKey(o.user, req.ip, function(key){
    			res.cookie('login', key, { maxAge: 900000 });
    			res.status(200).send(o);
    		    });
    		}
    	    }
    	});
    });

    app.get("/app", nocache, function(req, res) {
	console.log(req.session.user);
    	res.render('app', {title: "Tyto", udata: req.session.user});
    });

    app.post('/logout', function(req, res){
    	res.clearCookie('login');
    	req.session.destroy(function(e){ res.status(200).send('ok'); });
    })
    
    /*
      control panel
    */
    
    app.get('/account', function(req, res) {
    	if (req.session.user == null){
    	    res.redirect('/');
    	}
    	else{
    	    res.render('account', {
    		title : 'Control Panel',
    		countries : ct,
    		udata : req.session.user
    	    });
    	}
    });
    
    app.post('/account', function(req, res){
    	if (req.session.user == null){
    	    res.redirect('/');
    	}
    	else{
    	    am.updateAccount({
    		id		: req.session.user._id,
    		name	: req.body['name'],
    		email	: req.body['email'],
    		pass	: req.body['pass'],
    		country	: req.body['country']
    	    }, function(e, o){
    		if (e){
    		    res.status(400).send('error-updating-account');
    		}
    		else{
    		    req.session.user = o.value;
    		    res.status(200).send('ok');
    		}
    	    });
    	}
    });

    /*
      new accounts
    */

    app.get('/signup', function(req, res) {
    	res.render('signup', {  title: 'Signup', countries : ct });
    });
    
    app.post('/signup', function(req, res){
    	am.addNewAccount({
    	    name 	: req.body['name'],
    	    email 	: req.body['email'],
    	    user 	: req.body['user'],
    	    pass	: req.body['pass'],
    	    country : req.body['country']
    	}, function(e){
    	    if (e){
    		res.status(400).send(e);
    	    }
    	    else{
    		res.status(200).send('ok');
    	    }
    	});
    });

    /*
      password reset
    */

    app.post('/lost-password', function(req, res){
    	let email = req.body['email'];
    	am.generatePasswordKey(email, req.ip, function(e, account){
    	    if (e){
    		res.status(400).send(e);
    	    }
    	    else{
    		em.dispatchResetPasswordLink(account, function(e, m){
    		    // TODO this callback takes a moment to return, add a loader to give user feedback //
    		    if (!e){
    			res.status(200).send('ok');
    		    }
    		    else{
    			for (k in e) console.log('ERROR : ', k, e[k]);
    			res.status(400).send('unable to dispatch password reset');
    		    }
    		});
    	    }
    	});
    });

    app.get('/reset-password', function(req, res) {
    	am.validatePasswordKey(req.query['key'], req.ip, function(e, o){
    	    if (e || o == null){
    		res.redirect('/');
    	    }
    	    else{
    		req.session.passKey = req.query['key'];
    		res.render('reset', { title : 'Reset Password' });
    	    }
    	})
    });
    
    app.post('/reset-password', function(req, res) {
    	let newPass = req.body['pass'];
    	let passKey = req.session.passKey;
    	// destory the session immediately after retrieving the stored passkey //
    	req.session.destroy();
    	am.updatePassword(passKey, newPass, function(e, o){
    	    if (o){
    		res.status(200).send('ok');
    	    }
    	    else{
    		res.status(400).send('unable to update password');
    	    }
    	})
    });
    
    /*
      view, delete & reset accounts
    */
    
    app.get('/print', function(req, res) {
    	am.getAllRecords( function(e, accounts){
    	    res.render('print', { title : 'Account List', accts : accounts });
    	})
    });
    
    app.post('/delete', function(req, res){
    	am.deleteAccount(req.session.user._id, function(e, obj){
    	    if (!e){
    		res.clearCookie('login');
    		req.session.destroy(function(e){ res.status(200).send('ok'); });
    	    }
    	    else{
    		res.status(400).send('record not found');
    	    }
    	});
    });
    
    app.get('/reset', function(req, res) {
    	am.deleteAllAccounts(function(){
    	    res.redirect('/print');
    	});
    });
    
    /////////
    /* API */
    /////////
        // users. Pas de put ou de delete, on gère ça directement dans la base
    // app.get('/users', nocache, function(req, res) {
    // 	var response = {};
    // 	response = {"message" : "Trouver les users"};
    // 	res.json(response);
    // });
    // app.get('/user/:id', nocache, function(req, res) {
    // 	var response = {};
    // 	response = {"message" : "Trouver le user "+req.params.id};
    // 	res.json(response);
    // });
    // app.post('/user/:id', nocache, function(req, res) {
    // 	var response = {};
    // 	response = {"message" : "Updater le user "+req.params.id};
    // 	res.json(response);
    // });

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
    app.get('/richeditor', nocache, function(req, res) {
    	const response = "<html><head><link href='dist/css/main.css' rel='stylesheet'/></head><body id='richeditor'></body></html>";
	res.send(response);
    });

    
    app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });
};
