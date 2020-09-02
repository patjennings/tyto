const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let dirPath = "dist";

process.env.NODE_ENV === 'production' ? dirPath = "build/dist" : dirPath = "dist";
console.log("this is dirPath : "+dirPath);
// const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
    entry: ['./src/js/app.js', './src/sass/main.scss'],
    watch: process.env.NODE_ENV === 'production' ? false : true,
    mode: process.env.NODE_ENV === 'production' ? 'production':'development',
    externals: {
	'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? require('./config.prod.json') : require('./config.dev.json'))
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
