const path = require("path");
const webpack = require("webpack");
const srcDir = path.resolve(__dirname, "./src");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "./public"),
		filename: "bundle.js"
	},
	devtool: "eval-cheap-module-source-map",
	devServer: {
		contentBase: path.resolve(__dirname, "./public"),
		compress: false,
		port: 9000,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				include: srcDir,
				use: {
					loader: "babel-loader",
					options: {
						sourceMaps: true,
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	}
};