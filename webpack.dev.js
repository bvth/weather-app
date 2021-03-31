const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname,"./public"),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.resolve(__dirname,"./public"),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
        ]
    }
};