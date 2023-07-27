/* eslint-disable no-undef */
const path = require("path");
const WebpackUserscript = require('webpack-userscript');
const TerserPlugin = require("terser-webpack-plugin");
var PACKAGE = require('./package.json');
const my_project_name = "Addostream";

module.exports = {
    //mode: "production",
    //mode: "development",
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, "./src/index.js"),
    output: {
    //path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname),
        filename: my_project_name+".js"
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    }
                ],
            },
        ],
    },
    optimization: {
        minimize: process.env.NODE_ENV === "production" ? true : false,
        minimizer: [new TerserPlugin({
            extractComments: false,
            terserOptions: {
                format: {
                    comments: false,
                }
            }
        })]
    },
    plugins: [
        new WebpackUserscript({
            headers: path.join(__dirname, "./src/headers.json"),
            pretty: false
        })
    ]
};