const path = require('path');

module.exports = {
    entry: './js/app/init.js',
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
