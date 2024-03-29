// var http = require('http');
var express =    require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoOp =    require("./mongo"); // le modèle mongodb
var cors = require("cors"); // cors permet de setup les headers pour effectuer des appels cross-domain
let API_PORT;
var app = express();
const config = require("../config");
// const whitleListDomain = ['http://localhost:3000', 'http://localhost', 'https://tyto.thomasguesnon.net'];

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//     origin: function(origin, callback){
// 	// allow requests with no origin 
// 	// (like mobile apps or curl requests)
// 	if(!origin) return callback(null, true);
// 	if(whitleListDomain.indexOf(origin) === -1){
// 	    var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
// 	    return callback(new Error(msg), false);
// 	}
// 	return callback(null, true);
//     }
// }));
app.use(cors());

var sess = {
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}

process.env.DB_URL = process.env.DB_URL || 'mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.name;
process.env.DB_HOST = process.env.DB_HOST || config.db.host;
process.env.DB_PORT = process.env.DB_PORT || config.db.port;
process.env.DB_NAME = process.env.DB_NAME || config.db.name;

app.use(session(sess))

var routes = require("./routes.js")(app);

var server = app.listen(config.app.port, function () {
    console.log("Listening on port %s...", server.address().port);
});
