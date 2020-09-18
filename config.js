const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
	port: 3000,
	url: "http://localhost:3000",
	apiUrl: "http://localhost:3000/api",
	mapsDir: "maps"
    },
    db: {
	host: 'localhost',
	port: 27017,
	name: 'tyto'
    }
};

const production = {
    app: {
	port: 8752,
	url : "https://tyto.thomasguesnon.net",
	apiUrl: "https://tyto.thomasguesnon.net/api",
	mapsDir: "maps"
    },
    db: {
	host: 'localhost',
	port: 27017,
	name: 'tyto'
    }
};

const staging = {
    app: {
	port: null,
	url : null,
	apiUrl: null,
	mapsDir: null
    },
    db: {
	host: 'localhost',
	port: 27017,
	name: null
    }
};

const config = {
    dev,
    production,
    staging
};

module.exports = config[env];
