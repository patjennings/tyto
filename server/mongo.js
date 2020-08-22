var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/tyto', { useNewUrlParser: true });

// create instance of Schema
var mongoSchema = mongoose.Schema;

// create schemas
var userSchema  = {
    "firstName": String,
    "lastName": String,
    "email" : String,
    "password" : String,
    "passKey" : String,
    "isAdmin" : Boolean,
    "isFirst" : Boolean,
    "date": String,
    "ip": String,
    "cookie": String,
    "key": String
};
var contentSchema = {
    "title": String,
    "titleRaw": String,
    "created": Object,
    "lastUpdated": Object,
    "content": Object,
    "tags": Array,
    "location": Object,
    "relations": Array,
    "space": String
};
var zoneSchema = {
    "title": String,
    "space": String,
    "location": Object,
    "created": Object,
    "lastUpdated": Object
};
var spaceSchema = {
    "title": String
};

// create model if not exists.
// Le premier paramètre est le nom de la collection, le deuxième, le schéma utilisé
var users = mongoose.model('users', userSchema);
var content = mongoose.model('content', contentSchema, 'content'); // On évite que Mongoose nous ajoute un s à la collection, et travaille avec cette version
var zones = mongoose.model('zones', zoneSchema);
var spaces = mongoose.model('spaces', spaceSchema ); 

// then exports models, so it can be used somewhere else
exports.users = users;
exports.content = content;
exports.zones = zones;
exports.spaces = spaces;
