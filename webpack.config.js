const path = require('path');

module.exports = {
    entry: './client/js/app.js',
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
           
        ]
    }
};
