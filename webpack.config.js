/* eslint-disable no-undef */
const path = require("path");
const WebpackUserscript = require("webpack-userscript");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
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
    optimization: {
    //minimize: true,
    //splitChunks: {},
    //concatenateModules: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ]
    },
    plugins: [
        new WebpackUserscript({
            headers: path.join(__dirname, "./src/headers.json"),
            pretty: false
        }),
        new CompressionPlugin({
            algorithm: "gzip",
        })
    ]
};