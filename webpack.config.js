const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('./config');

let dirPath = "dist";

if(process.env.NODE_ENV === 'production') {
    dirPath = "build-production/dist"
}
if(process.env.NODE_ENV === 'staging') {
    dirPath = "build-staging/dist"
}
if(process.env.NODE_ENV === 'dev') {
    dirPath = "dist"
}

module.exports = {
    entry: ['./src/js/app.js', './src/sass/main.scss'],
    watch: process.env.NODE_ENV === 'dev' ? true : false,
    mode: process.env.NODE_ENV === 'dev' ? 'development':'production',
    externals: {
	'Config': JSON.stringify(config)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
		test: /\.scss$/,
		use: [
		    // fallback to style-loader in development
                    // process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
		    MiniCssExtractPlugin.loader,
		    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
		]
            },
	    {
		test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
		use: [{
                    loader: 'file-loader',
                    options: {
			name: '[name]?name=[path][name].[ext]&context=/src/assets/fonts',
			outputPath: 'assets/fonts/'
                    }
		}]
            }
	]
    },
    plugins: [
	new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
	})
    ],
    output: {
	path: path.resolve(__dirname, dirPath),
	publicPath: "/",
	filename: "bundle.js"
    }
};
