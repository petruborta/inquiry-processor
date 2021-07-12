const path = require("path");

const config = {
    mode: "development",
    entry: {
        vendor: ["@babel/polyfill", "react"],
        app: ["./src/index.js"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
            },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //         "style-loader",
            //         "css-loader",
            //         "postcss-loader",
            //         "sass-loader",
            //     ],
            // },

            // {
            //     test: /\.css$/,
            //     use: [
            //         "style-loader",
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 importLoaders: 1,
            //                 modules: true,
            //             },
            //         },
            //     ],
            // },

            // {
            //     test: /\.scss$/,
            //     use: [
            //         "style-loader",
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 sourceMap: true,
            //                 importLoaders: 1,
            //                 modules: true,
            //             },
            //         },
            //         { loader: "postcss-loader", options: { sourceMap: true } },
            //         { loader: "sass-loader", options: { sourceMap: true } },
            //     ],
            // },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"],
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].js",
    },
};

module.exports = config;
